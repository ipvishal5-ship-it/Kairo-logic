import Header from "@/components/header";
import Footer from "@/components/footer";
import { Capabilities, ContactInvitation, TechnologyFeature } from "@/components/company-sections";
export const metadata = { title: "Technologies" };
export default function Technologies() {
  return <><Header /><main id="main" className="c-main"><section className="c-shell c-page-hero"><div><p className="c-section-label">Our technologies</p><h1>Bring the work<br /><em>into view.</em></h1></div><p>Business information, document workflows and team reporting, configured around the way your organization operates.</p></section><section className="c-shell c-catalogue"><TechnologyFeature /></section><section className="c-section c-shell"><div className="c-section-heading"><div><p className="c-section-label">The capabilities behind it</p><h2>A connected foundation<br />for daily work.</h2></div><p>The setup starts with your process and the information your team needs.</p></div><Capabilities /></section><ContactInvitation /></main><Footer /></>;
}
