import { enquirySchema } from "@/lib/enquiry-validation";
import { processEnquiry, getEnquiryDiagnostics } from "@/lib/enquiry-service";

const json = (
  body: unknown,
  status = 200,
  extra: Record<string, string> = {},
) =>
  Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store", ...extra },
  });

/**
 * Diagnostic GET endpoint to easily verify in the browser whether
 * environment variables are properly loaded on Vercel.
 */
export async function GET() {
  const diagnostics = getEnquiryDiagnostics();
  return json({
    status: "online",
    time: new Date().toISOString(),
    environmentVariables: {
      recipientEmailConfigured: diagnostics.hasRecipientEmail,
      resendConfigured: diagnostics.hasResend,
      smtpConfigured: diagnostics.hasSmtpUser && diagnostics.hasSmtpPass,
      googleSheetsConfigured: diagnostics.hasGoogleSheets,
    },
    note:
      !diagnostics.hasResend &&
      (!diagnostics.hasSmtpUser || !diagnostics.hasSmtpPass) &&
      !diagnostics.hasGoogleSheets
        ? "Warning: No notification credentials detected in runtime. If you added them in Vercel Project Settings, you must Redeploy your project."
        : "Credentials detected.",
  });
}

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

  // Process mailing and permanent storage (Google Sheets / Email / Console)
  const result = await processEnquiry({
    id: data.id,
    name: data.name,
    email: data.email,
    organisation: data.organisation,
    message: data.message,
    timestamp: new Date().toISOString(),
  });

  return json(
    {
      ok: true,
      delivered: {
        email: result.emailSent,
        sheets: result.sheetsSaved,
      },
      warning:
        result.errors.length > 0
          ? result.errors.join("; ")
          : undefined,
    },
    201,
  );
}
