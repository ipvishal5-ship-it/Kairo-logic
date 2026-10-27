import Link from "@/components/site-link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import Showcase from "@/components/showcase";
import { ContactInvitation } from "@/components/company-sections";
export const metadata = { title: "Case and workflow workspace" };
export default function WorkflowProduct() {
  return <><Header /><main id="main"><nav className="c-breadcrumb c-shell" aria-label="Breadcrumb"><Link href="/technologies">Technologies</Link><span aria-hidden="true">/</span><span>Case &amp; workflow workspace</span></nav><div className="product-detail"><Showcase /></div><div id="contact"><ContactInvitation /></div></main><Footer /></>;
}
