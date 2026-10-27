import Link from "@/components/site-link";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Approach, BrandComposition, Capabilities, ContactInvitation, TechnologyFeature } from "@/components/company-sections";
export default function Home() {
  return <><Header /><main id="main" className="c-main">
    <section className="c-shell c-hero"><div className="c-hero-copy"><h1>Technology<br />built around<br /><em>your work.</em></h1><p>We design and configure business systems that bring your information, documents and everyday workflows together.</p><div className="c-hero-actions"><Link className="c-button" href="/technologies">View our technologies</Link><Link className="c-text-link" href="/about">Meet Kairologic</Link></div></div><BrandComposition /></section>
    <section className="c-introduction c-shell"><p className="c-section-label">Kairologic Technologies</p><div><h2>Good systems begin<br />with how people work.</h2><p>Every business has its own information, responsibilities and decisions. We build around that context, so the technology supports the way your team gets things done.</p><Link href="/about" className="c-text-link">About our company</Link></div></section>
    <section className="c-section c-technologies-home"><div className="c-shell"><div className="c-section-heading"><div><p className="c-section-label">Our technologies</p><h2>See the work<br />come together.</h2></div><p>A closer look at a workspace built for connected case information and team coordination.</p></div><TechnologyFeature /></div></section>
    <section className="c-section c-shell"><div className="c-section-heading"><div><p className="c-section-label">What we do</p><h2>Give your process<br />a working system.</h2></div><p>We connect the parts of everyday work that need to stay in step.</p></div><Capabilities /></section>
    <Approach /><ContactInvitation />
  </main><Footer /></>;
}
