import nodemailer from "nodemailer";

export interface EnquiryData {
  id: string;
  name: string;
  email: string;
  organisation?: string;
  message: string;
  timestamp?: string;
}

function buildHtmlTemplate(data: EnquiryData, formattedDate: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Website Enquiry</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #1e293b;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
    <div style="background-color: #090d16; padding: 20px 24px; border-bottom: 2px solid #2563eb;">
      <h2 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600; letter-spacing: -0.02em;">Kairologic Technologies</h2>
      <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 13px;">New Website Contact Form Enquiry</p>
    </div>
    
    <div style="padding: 24px;">
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; width: 120px; font-weight: 500;">From:</td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: 600;">${escapeHtml(data.name)}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Email:</td>
          <td style="padding: 8px 0; color: #2563eb; font-size: 14px;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb; text-decoration: none;">${escapeHtml(data.email)}</a></td>
        </tr>
        ${
          data.organisation
            ? `<tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Organization:</td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${escapeHtml(data.organisation)}</td>
        </tr>`
            : ""
        }
        <tr>
          <td style="padding: 8px 0; color: #64748b; font-size: 14px; font-weight: 500;">Received:</td>
          <td style="padding: 8px 0; color: #0f172a; font-size: 14px;">${formattedDate}</td>
        </tr>
      </table>

      <div style="background-color: #f1f5f9; border-left: 4px solid #2563eb; border-radius: 4px; padding: 16px; margin-bottom: 20px;">
        <div style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #475569; font-weight: 600; margin-bottom: 8px;">Enquiry Message</div>
        <div style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">${escapeHtml(data.message)}</div>
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <a href="mailto:${escapeHtml(data.email)}?subject=Re: Your enquiry to Kairologic Technologies" style="display: inline-block; background-color: #090d16; color: #ffffff; padding: 10px 20px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 500;">Reply to ${escapeHtml(data.name)}</a>
      </div>
    </div>

    <div style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 14px 24px; text-align: center; font-size: 12px; color: #94a3b8;">
      Enquiry ID: ${data.id} &bull; Delivered by Kairologic Notification System
    </div>
  </div>
</body>
</html>
`;
}

function buildPlainText(data: EnquiryData, formattedDate: string): string {
  return `
[New Website Enquiry - Kairologic Technologies]
Date: ${formattedDate}
Name: ${data.name}
Email: ${data.email}
Organization: ${data.organisation || "Not specified"}

Message:
${data.message}

Reply directly to: ${data.email}
ID: ${data.id}
`;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function processEnquiry(data: EnquiryData): Promise<{
  emailSent: boolean;
  sheetsSaved: boolean;
  errors: string[];
}> {
  const timestamp = data.timestamp || new Date().toISOString();
  const formattedDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  }) + " (IST)";

  const emailHtml = buildHtmlTemplate(data, formattedDate);
  const emailText = buildPlainText(data, formattedDate);

  const recipient =
    process.env.ENQUIRY_RECIPIENT_EMAIL ||
    process.env.ENQUIRY_REVIEWER_EMAIL ||
    "ipvishal5@gmail.com";

  let emailSent = false;
  let sheetsSaved = false;
  const errors: string[] = [];

  // 1. Send via Resend if RESEND_API_KEY is configured
  if (process.env.RESEND_API_KEY) {
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL || "Kairologic <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [recipient],
          reply_to: data.email,
          subject: `[Kairologic Enquiry] Message from ${data.name}${data.organisation ? ` (${data.organisation})` : ""}`,
          html: emailHtml,
          text: emailText,
        }),
      });

      if (res.ok) {
        emailSent = true;
        console.log(`[Email Dispatch] Resend delivery succeeded to ${recipient}`);
      } else {
        const errorText = await res.text();
        errors.push(`Resend error: ${errorText}`);
        console.error("[Email Dispatch] Resend delivery failed:", errorText);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`Resend exception: ${message}`);
      console.error("[Email Dispatch] Resend exception:", message);
    }
  }

  // 2. Send via SMTP / Nodemailer (e.g. Gmail App Password) if configured and Resend not used/failed
  if (!emailSent && process.env.SMTP_USER && process.env.SMTP_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT || 465),
        secure: (process.env.SMTP_PORT || "465") === "465",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      await transporter.sendMail({
        from: `"Kairologic Contact" <${process.env.SMTP_USER}>`,
        to: recipient,
        replyTo: data.email,
        subject: `[Kairologic Enquiry] Message from ${data.name}${data.organisation ? ` (${data.organisation})` : ""}`,
        text: emailText,
        html: emailHtml,
      });

      emailSent = true;
      console.log(`[Email Dispatch] SMTP delivery succeeded to ${recipient}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`SMTP exception: ${message}`);
      console.error("[Email Dispatch] SMTP delivery failed:", message);
    }
  }

  // 3. Permanent, Inactivity-Proof Storage via Google Sheets Webhook
  if (process.env.GOOGLE_SHEETS_WEBHOOK_URL) {
    try {
      const response = await fetch(process.env.GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          timestamp,
          formattedDate,
          name: data.name,
          email: data.email,
          organisation: data.organisation || "",
          message: data.message,
        }),
      });

      if (response.ok) {
        sheetsSaved = true;
        console.log("[Storage Dispatch] Google Sheets row saved successfully");
      } else {
        const errorText = await response.text();
        errors.push(`Google Sheets webhook returned ${response.status}: ${errorText}`);
        console.error("[Storage Dispatch] Google Sheets error:", errorText);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`Google Sheets exception: ${message}`);
      console.error("[Storage Dispatch] Google Sheets exception:", message);
    }
  }

  // 4. Always log to console as fail-safe runtime record
  console.log("[Kairologic Enquiry Processed]:", {
    id: data.id,
    name: data.name,
    email: data.email,
    organisation: data.organisation,
    timestamp,
    emailSent,
    sheetsSaved,
  });

  return { emailSent, sheetsSaved, errors };
}
