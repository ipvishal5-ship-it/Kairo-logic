"use client";
import { useRef, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CheckCircle2,
  LoaderCircle,
  ArrowRight,
} from "lucide-react";
import Brand from "./brand";
import { createRequestId } from "@/lib/request-id";
import Reveal from "./reveal";
export default function Contact() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [error, setError] = useState("");
  const requestId = useRef("");
  const success = useRef<HTMLDivElement>(null);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setError("");
    setState("sending");
    try {
      if (!requestId.current) requestId.current = createRequestId();
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: requestId.current,
          name: data.get("name"),
          email: data.get("email"),
          organisation: data.get("organisation"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website"),
        }),
      });
      const raw: unknown = await response.json().catch(() => ({}));
      const result =
        raw && typeof raw === "object"
          ? (raw as { ok?: boolean; error?: string })
          : {};
      if (!response.ok || !result.ok)
        throw new Error(
          result.error || "We couldn’t save your enquiry. Please try again.",
        );
      setState("success");
      form.reset();
      requestId.current = "";
      requestAnimationFrame(() => success.current?.focus());
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Please check your connection and try again.",
      );
      setState("error");
    }
  }
  return (
    <>
      <section id="contact" className="contact section">
        <div className="container contact-grid">
          <Reveal className="contact-copy">
            <p className="eyebrow">LET’S MAKE WORK FLOW</p>
            <h2>
              A clearer process
              <br />
              starts with
              <br />
              <span>a conversation.</span>
            </h2>
            <p>
              Tell us what your team manages today. We’ll discuss the workflow,
              the setup and a focused demonstration.
            </p>
            <div className="contact-expect">
              <span className="teal-dot" /> Your process. Your priorities. A
              practical next step.
            </div>
          </Reveal>
          <div className="enquiry-card">
            {state === "success" ? (
              <div
                className="form-success"
                ref={success}
                tabIndex={-1}
                role="status"
              >
                <CheckCircle2 size={48} />
                <h3>Your enquiry is received.</h3>
                <p>
                  Your request has been saved. We’ll use the email you provided
                  to follow up.
                </p>
                <button
                  className="button primary"
                  onClick={() => setState("idle")}
                >
                  Send another enquiry <ArrowRight size={20} />
                </button>
              </div>
            ) : (
              <form onSubmit={submit} aria-label="Request a demonstration">
                <h3>Let’s understand your workflow.</h3>
                <p className="form-intro">
                  A few details are all we need to start.
                </p>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="Full name"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Work email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      placeholder="you@organisation.com"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="organisation">
                    Organisation <span>(optional)</span>
                  </label>
                  <input
                    id="organisation"
                    name="organisation"
                    autoComplete="organization"
                    maxLength={160}
                    placeholder="Organisation name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="message">
                    What would you like to improve?
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={4}
                    placeholder="Tell us about your case records, documents or reporting."
                  />
                </div>
                <div className="form-trap" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <label className="consent">
                  <input name="consent" type="checkbox" required />
                  <span>
                    You may contact me about this enquiry.{" "}
                    <a href="/privacy">Privacy notice</a>
                  </span>
                </label>
                {error && (
                  <p className="form-error" role="alert">
                    {error}
                  </p>
                )}
                <button
                  className="button primary submit-button"
                  disabled={state === "sending"}
                  type="submit"
                >
                  {state === "sending" ? (
                    <>
                      Saving your enquiry{" "}
                      <LoaderCircle className="spin" size={22} />
                    </>
                  ) : (
                    <>
                      Request a demonstration <ArrowUpRight size={22} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container footer-main">
          <a href="#home" aria-label="Kairologic home">
            <Brand inverse />
          </a>
          <p>
            Connected work.
            <br />
            Considered technology.
          </p>
          <a href="/privacy">
            Privacy notice <ArrowUpRight size={19} />
          </a>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Kairologic Technology</span>
          <span>Bring structure. Move work forward.</span>
        </div>
      </footer>
    </>
  );
}
