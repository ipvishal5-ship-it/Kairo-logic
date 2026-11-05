import Header from "@/components/header";
import Footer from "@/components/footer";
import Link from "@/components/site-link";
import { ContactInvitation } from "@/components/company-sections";
import {
  ShieldCheck, Scale, Factory, Puzzle, ArrowRight, ClipboardList,
  Workflow, Database, BarChart3, ShieldAlert, Clock,
} from "lucide-react";

export const metadata = {
  title: "Need a Solution?",
  description:
    "Tell us the problem — scattered records, slow statutory processes, missed hearings or shopfloor chaos — and we configure a system that fits the way your team actually works.",
};

const pains = [
  {
    icon: Database,
    title: "Records scattered everywhere",
    desc: "Worker lists, case files, delivery notes — spread across folders, drives and Excel files nobody can find when it's urgent.",
  },
  {
    icon: Clock,
    title: "Slow, repetitive manual work",
    desc: "Preparing orders, tracking hearings, planning shifts or answering delivery questions eats hours your team never gets back.",
  },
  {
    icon: ShieldAlert,
    title: "Deadlines slipping quietly",
    desc: "Statutory timelines, court dates, dispatch commitments — missed because the reminder lived in someone's head or notebook.",
  },
  {
    icon: BarChart3,
    title: "No live visibility",
    desc: "Management asks \u201cwhat's the status right now?\u201d and the honest answer takes a day of phone calls and file digging.",
  },
];

const fits = [
  {
    icon: ShieldCheck,
    color: "green",
    name: "SARFAESI Operations",
    when: "When statutory recovery work is drowning in manual filings and timelines.",
    href: "/technologies/workflow",
    points: ["DM/CMM order automation", "Possession & auction tracking", "Full case audit trail"],
  },
  {
    icon: Scale,
    color: "blue",
    name: "Kairologic Lex",
    when: "When litigation teams are chasing cause lists and hearing updates across courts.",
    href: "/technologies/ecourt-filing",
    points: ["Cause list monitoring", "Hearing radar", "Case movement analytics"],
  },
  {
    icon: Factory,
    color: "amber",
    name: "Manufacturing Suite",
    when: "When a large plant is still run on folders, Excel sheets and verbal updates.",
    href: "/technologies/manufacturing",
    points: ["500+ worker records, centralised", "Automatic shift allocation", "Instant delivery lookup"],
  },
];

const howItWorks = [
  {
    n: "01",
    title: "You describe the work",
    desc: "A 30-minute conversation about what your team does daily — no forms, no jargon. Just the real process, pain points included.",
  },
  {
    n: "02",
    title: "We map it to a system",
    desc: "We identify where records, responsibilities and reporting connect — and where software removes friction instead of adding it.",
  },
  {
    n: "03",
    title: "Configure, don't rebuild",
    desc: "Our platforms are configured to your workflow, not coded from scratch. That means faster rollout and lower risk.",
  },
  {
    n: "04",
    title: "Validate with your team",
    desc: "We hand over only after your own people confirm the system matches how they actually work — then support continues.",
  },
];

const outcomes = [
  { value: "Hours", label: "of manual filing & lookup eliminated weekly" },
  { value: "Zero", label: "missed statutory or delivery deadlines, by design" },
  { value: "One", label: "system of record instead of scattered folders" },
  { value: "Live", label: "visibility for management, every day" },
];

export default function NeedSolutionPage() {
  return (
    <>
      <Header />
      <main id="main" className="c-main">
        {/* Hero */}
        <section className="c-shell c-ns-hero">
          <div className="c-ns-hero-inner">
            <span className="c-hero-badge">
              <span className="c-hero-badge-dot" />
              Tell us the problem
            </span>
            <h1 className="c-hero-title">
              Need a <em>solution?</em>
            </h1>
            <p className="c-hero-lead">
              Every organisation we work with started with the same sentence:
              <strong> &ldquo;there must be a better way to do this.&rdquo;</strong>{" "}
              Scattered records, manual chasing, missed deadlines, no live view.
              We build — and configure — systems that remove exactly that.
            </p>
            <div className="c-ns-hero-actions">
              <Link href="/contact" className="c-button">
                Describe your problem <ArrowRight size={16} />
              </Link>
              <a href="#platforms" className="c-button c-button-secondary">
                Or browse our platforms
              </a>
            </div>
          </div>
        </section>

        {/* The pains we solve */}
        <section className="c-shell c-ns-section">
          <p className="c-section-label">Sound familiar?</p>
          <h2 className="c-ns-heading">
            Four problems we exist to solve.
          </h2>
          <div className="c-ns-pain-grid">
            {pains.map((p) => (
              <article key={p.title} className="c-ns-pain-card">
                <span className="c-ns-pain-icon">
                  <p.icon size={22} />
                </span>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Platform fits */}
        <section id="platforms" className="c-shell c-ns-section">
          <p className="c-section-label">If your problem looks like this</p>
          <h2 className="c-ns-heading">
            One of these platforms probably already fits.
          </h2>
          <p className="c-ns-sub">
            They are configured, living systems — not demos. Pick the closest
            match and see the product walkthrough.
          </p>
          <div className="c-ns-fit-grid">
            {fits.map((f) => (
              <article key={f.name} className={`c-ns-fit-card c-fit-${f.color}`}>
                <div className="c-ns-fit-head">
                  <span className="c-ns-fit-icon">
                    <f.icon size={22} />
                  </span>
                  <h3>{f.name}</h3>
                </div>
                <p className="c-ns-fit-when">{f.when}</p>
                <ul>
                  {f.points.map((pt) => (
                    <li key={pt}>
                      <ClipboardList size={14} /> {pt}
                    </li>
                  ))}
                </ul>
                <Link href={f.href} className="c-ns-fit-link">
                  See the platform <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* Nothing off the shelf */}
        <section className="c-shell c-ns-section">
          <div className="c-ns-custom">
            <div className="c-ns-custom-left">
              <span className="c-ns-pain-icon c-icon-puzzle">
                <Puzzle size={24} />
              </span>
              <h2>Nothing quite fits?</h2>
              <p>
                That is our favourite brief. Our approach is to make the system
                fit the work it serves — process mapping, configuration,
                validation with your team and a clean handover. If your problem
                sits between two platforms or outside them entirely, we shape a
                workspace around it.
              </p>
            </div>
            <ol className="c-ns-steps">
              {howItWorks.map((s) => (
                <li key={s.n}>
                  <span className="c-ns-step-num">{s.n}</span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Outcomes strip */}
        <section className="c-shell c-ns-section">
          <div className="c-ns-outcomes">
            {outcomes.map((o) => (
              <div key={o.label} className="c-ns-outcome">
                <span className="c-ns-outcome-value">{o.value}</span>
                <span className="c-ns-outcome-label">{o.label}</span>
              </div>
            ))}
          </div>
        </section>

        <ContactInvitation />
      </main>
      <Footer />
    </>
  );
}
