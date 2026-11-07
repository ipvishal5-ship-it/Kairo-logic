import Link from "next/link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import OpsHeroDiagram from "@/components/ops-hero-diagram";
import OpsSections from "@/components/ops-sections";
import "./ops.css";

export const metadata = {
  title: "Kairologic Ops – SARFAESI | Kairologic Technologies",
  description:
    "A clear place for your records, documents and daily work. We build your digital workspace around your process, with organised information, clear responsibilities and access defined by role.",
};

export default function WorkflowProduct() {
  return (
    <>
      <Header />
      <main id="main" className="ops-page">
        <div className="wrap bc">
          <Link href="/technologies">Technologies</Link>
          <span>/</span>
          <b>SARFAESI (Kairologic Ops)</b>
        </div>

        <section className="wrap hero ops-hero">
          <div>
            <h1>
              Your data, structured.
              <span>Your team, connected.</span>
            </h1>
            <p className="lead">
              A clear place for your records, documents and daily work. We build
              your digital workspace around your process, with organised
              information, clear responsibilities and access defined by role.
            </p>
            <div className="btns">
              <Link className="btn" href="/contact">
                Discuss your workflow
              </Link>
              <a className="lnk" href="#s2">
                See how it works ↓
              </a>
            </div>
            <div className="chips">
              <span>Process mapping</span>
              <span>System setup</span>
              <span>Team handover</span>
            </div>
          </div>

          <OpsHeroDiagram />
        </section>

        <OpsSections />
      </main>
      <Footer />
    </>
  );
}
