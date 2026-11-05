import Link from "@/components/site-link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Showcase from "@/components/showcase";
import { ContactInvitation } from "@/components/company-sections";

export const metadata = { title: "Kairologic Ops — SARFAESI Workflow Workspace" };

export default function WorkflowProduct() {
  return (
    <>
      <Header />
      <main id="main">
        <nav className="c-breadcrumb c-shell" aria-label="Breadcrumb">
          <Link href="/technologies">Technologies</Link>
          <span aria-hidden="true">/</span>
          <span>SARFAESI (Kairologic Ops)</span>
        </nav>
        <div className="product-detail">
          <Showcase />
        </div>
        <div id="contact">
          <ContactInvitation />
        </div>
      </main>
      <Footer />
    </>
  );
}
