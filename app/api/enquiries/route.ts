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

  const data = parsed.data;

  // Log enquiry in deployment console (Vercel runtime logs)
  console.log("[Kairologic Enquiry Received]:", {
    id: data.id,
    name: data.name,
    email: data.email,
    organisation: data.organisation,
    message: data.message,
    timestamp: new Date().toISOString(),
  });

  return json({ ok: true }, 201);
}
