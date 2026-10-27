import Brand from "@/components/brand";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Enquiries | Kairologic",
  robots: { index: false, follow: false },
};

export default async function Enquiries() {
  return (
    <main className="c-main c-shell c-prose c-owner-inbox">
      <a href="/">
        <Brand />
      </a>
      <div className="inbox-heading">
        <div>
          <p className="eyebrow">REVIEW</p>
          <h1>Enquiry inbox</h1>
          <p>
            Customer submissions from the contact form are logged directly to your Vercel deployment console.
          </p>
        </div>
        <a className="text-link" href="/">
          Back to website
        </a>
      </div>
      <div className="inbox-empty">
        All form enquiries are securely captured and recorded.
      </div>
    </main>
  );
}
