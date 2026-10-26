import { env } from "cloudflare:workers";
import { enquirySchema } from "@/lib/enquiry-validation";
const json = (
  body: unknown,
  status = 200,
  extra: Record<string, string> = {},
) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin)
    return json({ error: "Please submit this form from the website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return json({ error: "Unsupported request format." }, 415);
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return json({ error: "The enquiry is too long." }, 413);
  let raw: unknown;
  try {
    const text = await request.text();
    if (text.length > 12000)
      return json({ error: "The enquiry is too long." }, 413);
    raw = JSON.parse(text);
  } catch {
    return json({ error: "Please check the form and try again." }, 400);
  }
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success)
    return json(
      { error: parsed.error.issues[0]?.message || "Please check the form." },
      400,
    );
  if (!env.DB)
    return json(
      {
        error:
          "The enquiry service is temporarily unavailable. Please try again later.",
      },
      503,
    );
  const data = parsed.data;
  try {
    const existing = await env.DB.prepare(
      "SELECT id FROM enquiries WHERE id = ?",
    )
      .bind(data.id)
      .first();
    if (existing) return json({ ok: true });
    const source = request.headers.get("cf-connecting-ip") || "local-preview";
    const digest = await crypto.subtle.digest(
      "SHA-256",
      new TextEncoder().encode(`kairologic-enquiry:${source}`),
    );
    const actorHash = Array.from(new Uint8Array(digest), (b) =>
      b.toString(16).padStart(2, "0"),
    ).join("");
    const now = Date.now();
    const result = await env.DB.prepare(
      `INSERT INTO enquiries (id,name,email,organisation,message,consent,actor_hash,created_at) SELECT ?,?,?,?,?,?,?,? WHERE (SELECT COUNT(*) FROM enquiries WHERE actor_hash = ? AND created_at > ?) < 5 ON CONFLICT(id) DO NOTHING RETURNING id`,
    )
      .bind(
        data.id,
        data.name,
        data.email,
        data.organisation,
        data.message,
        1,
        actorHash,
        now,
        actorHash,
        now - 600000,
      )
      .first();
    if (!result)
      return json(
        { error: "Too many requests. Please try again in a few minutes." },
        429,
        { "Retry-After": "600" },
      );
    return json({ ok: true }, 201);
  } catch {
    console.error("Enquiry could not be saved.");
    return json(
      { error: "We couldn’t save your enquiry. Please try again." },
      503,
    );
  }
}
