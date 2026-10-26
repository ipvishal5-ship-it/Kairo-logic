import { env } from "cloudflare:workers";
import { getChatGPTUser, chatGPTSignInPath } from "../chatgpt-auth";
import Brand from "@/components/brand";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Enquiries | Kairologic",
  robots: { index: false, follow: false },
};
export default async function Enquiries() {
  const user = await getChatGPTUser();
  const allowed =
    !!user &&
    !!env.ENQUIRY_REVIEWER_EMAIL &&
    user.email.toLowerCase() ===
      env.ENQUIRY_REVIEWER_EMAIL.trim().toLowerCase();
  if (!allowed)
    return (
      <main className="utility-page container">
        <a href="/">
          <Brand />
        </a>
        <h1>Enquiry inbox</h1>
        <p>This area is restricted to the site owner.</p>
        {!user ? (
          <a
            className="button primary"
            href={chatGPTSignInPath("/enquiries")}
            target="_top"
          >
            Sign in to continue
          </a>
        ) : (
          <a className="text-link" href="/">
            Return to the website
          </a>
        )}
      </main>
    );
  const result = env.DB
    ? await env.DB.prepare(
        "SELECT id,name,email,organisation,message,created_at FROM enquiries ORDER BY created_at DESC LIMIT 100",
      ).all<{
        id: string;
        name: string;
        email: string;
        organisation: string;
        message: string;
        created_at: number;
      }>()
    : null;
  return (
    <main className="utility-page container">
      <a href="/">
        <Brand />
      </a>
      <div className="inbox-heading">
        <div>
          <p className="eyebrow">PRIVATE REVIEW</p>
          <h1>Enquiry inbox</h1>
          <p>
            Latest {result?.results.length || 0} enquiries. Visible only to the
            authorised owner.
          </p>
        </div>
        <a className="text-link" href="/">
          Back to website
        </a>
      </div>
      {!result ? (
        <p role="alert">The enquiry service is unavailable.</p>
      ) : result.results.length === 0 ? (
        <div className="inbox-empty">
          No enquiries yet. New website submissions will appear here.
        </div>
      ) : (
        result.results.map((e) => (
          <article className="inbox-card" key={e.id}>
            <div>
              <h2>{e.name}</h2>
              <time dateTime={new Date(e.created_at).toISOString()}>
                {new Intl.DateTimeFormat("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                  timeZone: "Asia/Kolkata",
                }).format(e.created_at)}{" "}
                IST
              </time>
            </div>
            <a href={`mailto:${e.email}`}>{e.email}</a>
            {e.organisation && <p>{e.organisation}</p>}
            <p className="inbox-message">{e.message}</p>
          </article>
        ))
      )}
    </main>
  );
}
