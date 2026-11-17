import nodemailer from "nodemailer";

export interface EnquiryData {
  id: string;
  name: string;
  email: string;
  organisation?: string;
  message: string;
  timestamp?: string;
}

export interface DiagnosticsStatus {
  hasRecipientEmail: boolean;
  hasResend: boolean;
  hasSmtpUser: boolean;
  hasSmtpPass: boolean;
  hasGoogleSheets: boolean;
}

export function getEnquiryDiagnostics(): DiagnosticsStatus {
  return {
    hasRecipientEmail: Boolean(
      process.env.ENQUIRY_RECIPIENT_EMAIL || process.env.ENQUIRY_REVIEWER_EMAIL
    ),
    hasResend: Boolean(process.env.RESEND_API_KEY?.trim()),
    hasSmtpUser: Boolean(process.env.SMTP_USER?.trim()),
    hasSmtpPass: Boolean(process.env.SMTP_PASS?.trim()),
    hasGoogleSheets: Boolean(process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim()),
  };
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
  const formattedDate =
    new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }) + " (IST)";

  const emailHtml = buildHtmlTemplate(data, formattedDate);
  const emailText = buildPlainText(data, formattedDate);

  const recipient =
    process.env.ENQUIRY_RECIPIENT_EMAIL?.trim() ||
    process.env.ENQUIRY_REVIEWER_EMAIL?.trim() ||
    process.env.SMTP_USER?.trim() ||
    "ipvishal5@gmail.com";

  let emailSent = false;
  let sheetsSaved = false;
  const errors: string[] = [];

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  // Strip spaces if user pasted 16-char Google App Password like "xxxx yyyy zzzz wwww"
  const smtpPass = process.env.SMTP_PASS?.trim().replace(/\s+/g, "");
  const sheetsUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL?.trim();

  console.log("[Kairologic Enquiry Processing]:", {
    id: data.id,
    hasResend: Boolean(resendApiKey),
    hasSmtp: Boolean(smtpUser && smtpPass),
    hasSheets: Boolean(sheetsUrl),
    recipient,
  });

  if (!resendApiKey && (!smtpUser || !smtpPass) && !sheetsUrl) {
    const warning =
      "No notification environment variables detected. If you configured variables in Vercel, ensure you selected 'Production' and REDEPLOYED your latest deployment.";
    errors.push(warning);
    console.warn(`[Kairologic Enquiry Warning]: ${warning}`);
  }

  // 1. Resend Delivery (if RESEND_API_KEY is configured)
  if (resendApiKey) {
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL?.trim() ||
        "Kairologic <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
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

  // 2. SMTP / Gmail Delivery (via Nodemailer)
  if (!emailSent && smtpUser && smtpPass) {
    try {
      const isCustomSmtp =
        process.env.SMTP_HOST &&
        process.env.SMTP_HOST.trim() !== "" &&
        process.env.SMTP_HOST.trim() !== "smtp.gmail.com";

      const transporter = isCustomSmtp
        ? nodemailer.createTransport({
            host: process.env.SMTP_HOST!.trim(),
            port: Number(process.env.SMTP_PORT || 465),
            secure: (process.env.SMTP_PORT || "465") === "465",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            connectionTimeout: 10000,
          })
        : nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: smtpPass,
            },
            connectionTimeout: 10000,
          });

      await transporter.sendMail({
        from: `"Kairologic Contact" <${smtpUser}>`,
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

  // 3. Permanent Google Sheets Webhook
  if (sheetsUrl) {
    try {
      // Note: Google Apps Script redirects with 302. Use text/plain with follow redirect
      // to ensure the POST body is accepted without preflight rejection.
      const payloadString = JSON.stringify({
        id: data.id,
        timestamp,
        formattedDate,
        name: data.name,
        email: data.email,
        organisation: data.organisation || "",
        message: data.message,
      });

      const response = await fetch(sheetsUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        redirect: "follow",
        body: payloadString,
      });

      const respText = await response.text();

      if (response.ok && !respText.includes('"status":"error"') && !respText.includes('<html') && !respText.includes('<!DOCTYPE')) {
        sheetsSaved = true;
        console.log("[Storage Dispatch] Google Sheets row saved successfully:", respText);
      } else {
        const preview = respText.slice(0, 300);
        errors.push(`Google Sheets returned unexpected response: ${preview}`);
        console.error("[Storage Dispatch] Google Sheets failed:", response.status, preview);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      errors.push(`Google Sheets exception: ${message}`);
      console.error("[Storage Dispatch] Google Sheets exception:", message);
    }
  }

  // 4. Always record in server console
  console.log("[Kairologic Enquiry Processed Result]:", {
    id: data.id,
    name: data.name,
    email: data.email,
    organisation: data.organisation,
    timestamp,
    emailSent,
    sheetsSaved,
    errorCount: errors.length,
    errors,
  });

  return { emailSent, sheetsSaved, errors };
}
