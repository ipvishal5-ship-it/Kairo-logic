"use client";
import { useRef, useState, type FormEvent } from "react";
import Link from "./site-link";
import { createRequestId } from "@/lib/request-id";

export default function CompanyContact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const requestId = useRef("");
  const feedback = useRef<HTMLDivElement>(null);
  const errorMessage = useRef<HTMLParagraphElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError("");
    try {
      if (!requestId.current) requestId.current = createRequestId();
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: requestId.current,
          name: data.get("name"), email: data.get("email"), organisation: data.get("organisation"),
          message: data.get("message"), consent: data.get("consent") === "on", website: data.get("website"),
        }),
      });
      const raw: unknown = await response.json().catch(() => ({}));
      const result = raw && typeof raw === "object" ? raw as { ok?: boolean; error?: string } : {};
      if (!response.ok || !result.ok) throw new Error(result.error || "We could not save your enquiry. Please try again.");
      setState("success");
      form.reset(); requestId.current = "";
      requestAnimationFrame(() => feedback.current?.focus());
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "Please check your connection and try again.");
      setState("error");
      requestAnimationFrame(() => errorMessage.current?.focus());
    }
  }

  return <section className="c-shell c-contact-page">
    <div className="c-contact-intro"><p className="c-section-label">Talk to our team</p><h1>Tell us what<br /><em>you have in mind.</em></h1><p>Tell us about your process, a system you want to improve, or the product you would like to see.</p><div className="c-contact-note"><h2>A useful first conversation.</h2><p>We can discuss your workflow, the implementation and a focused product demonstration.</p></div></div>
    <div className="c-form-panel">
      {state === "success" ? <div className="c-form-success" role="status" tabIndex={-1} ref={feedback}><span className="c-success-symbol" aria-hidden="true">✓</span><h2>Your enquiry<br />is received.</h2><p>Your message has been saved for the team to review, together with the email address you provided.</p><button className="c-button" onClick={() => setState("idle")}>Send another enquiry</button></div> :
      <form onSubmit={submit} aria-label="Contact Kairologic Technologies" aria-busy={state === "sending"}>
        <h2>Start the conversation.</h2><p className="c-form-intro">All fields are required unless marked optional.</p>
        <div className="c-form-row"><div className="c-field"><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" required minLength={2} maxLength={100} /></div><div className="c-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" required maxLength={254} /></div></div>
        <div className="c-field"><label htmlFor="organisation">Organization <span>(optional)</span></label><input id="organisation" name="organisation" autoComplete="organization" maxLength={160} /></div>
        <div className="c-field"><label htmlFor="message">What would you like to discuss?</label><textarea id="message" name="message" required minLength={10} maxLength={3000} rows={5} /></div>
        <div className="c-form-trap" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
        <label className="c-consent"><input name="consent" type="checkbox" required /><span>You may contact me about this enquiry. <Link href="/privacy">Privacy notice</Link></span></label>
        {error && <p className="c-form-error" role="alert" ref={errorMessage} tabIndex={-1}>{error}</p>}
        <button className="c-button c-submit" disabled={state === "sending"} type="submit">{state === "sending" ? "Sending your enquiry…" : "Send your enquiry"}</button>
        <p className="c-form-footnote">Please keep confidential records and passwords out of this first message.</p>
      </form>}
    </div>
  </section>;
}
