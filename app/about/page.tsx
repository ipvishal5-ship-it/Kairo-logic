import Header from "@/components/header";
import Footer from "@/components/footer";
import { Approach, BrandComposition, ContactInvitation } from "@/components/company-sections";
export const metadata = { title: "Company" };
export default function About() {
  return <><Header /><main id="main" className="c-main"><section className="c-shell c-page-hero c-about-hero"><div><p className="c-section-label">Our company</p><h1>We start with<br /><em>your business.</em></h1><p>Kairologic Technologies designs and configures business systems around the information, processes and people they need to support.</p></div><BrandComposition /></section><section className="c-shell c-company-statement"><p className="c-section-label">Our focus</p><div><h2>Make the system fit<br />the work it serves.</h2><p>We focus on the connections between business records, documents, team responsibilities and reporting. Understanding those connections helps us shape a useful workspace.</p><p>Our work includes process mapping, system configuration, validation with your team and handover. The product walkthrough shows how these ideas come together in a case and workflow workspace.</p></div></section><Approach /><ContactInvitation /></main><Footer /></>;
}
