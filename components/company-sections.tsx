import Link from "./site-link";
import { BrandMark } from "./brand";

export function BrandComposition() {
  return <div className="c-brand-composition" aria-hidden="true"><div className="c-composition-top"><span>Considered systems.</span><span>Connected work.</span></div><BrandMark className="c-composition-mark" /><div className="c-composition-bottom"><span>Built around<br />your business.</span><span className="c-square-mark" /></div></div>;
}
export function ProductVisual() {
  return <div className="c-product-visual" aria-label="Product overview connecting case information, documents and team activity"><div className="c-product-visual-title"><BrandMark className="c-preview-mark" /><span>One connected workspace</span></div><div className="c-preview-record"><span className="c-preview-corner" /><strong>Case information</strong><span>Details in context</span></div><div className="c-preview-bottom"><div><span className="c-preview-symbol c-document-symbol" aria-hidden="true" /><strong>Documents</strong><span>Prepared from your records</span></div><div><span className="c-preview-symbol c-team-symbol" aria-hidden="true" /><strong>Team activity</strong><span>A shared view of the work</span></div></div></div>;
}
export function TechnologyFeature() {
  return <article className="c-technology-feature"><div className="c-technology-copy"><p className="c-section-label">Featured product</p><h3>Case &amp; workflow<br />workspace.</h3><p>Bring case information, prepared documents and team responsibilities into one connected system.</p><Link href="/technologies/workflow" className="c-button c-button-light">View the product</Link></div><ProductVisual /></article>;
}
const capabilities = [
  { name: "Connected information", text: "Organize business records and keep related details, documents and actions together." },
  { name: "Document workflows", text: "Prepare repeatable documents from approved templates and the information in your records." },
  { name: "Reporting and visibility", text: "Give teams a useful view of responsibilities, work in progress and the next action." },
  { name: "System implementation", text: "Map your process, configure the system and prepare your team to use it." },
];
export function Capabilities() {
  return <div className="c-capability-list">{capabilities.map((item, index) => <div className="c-capability" key={item.name}><span className="c-item-number" aria-hidden="true">0{index + 1}</span><h3>{item.name}</h3><p>{item.text}</p></div>)}</div>;
}
const approach = [
  { title: "Understand the process", text: "Start with the information, handoffs and daily tasks your team manages." },
  { title: "Configure the system", text: "Shape records, templates, workflows and permissions around those needs." },
  { title: "Validate with your team", text: "Review the working setup together and check the details against your process." },
  { title: "Prepare the handover", text: "Make the setup and day-to-day use clear for the people responsible for the work." },
];
export function Approach() {
  return <section className="c-approach c-section" id="approach"><div className="c-shell c-approach-grid"><div><p className="c-section-label">Our approach</p><h2>Start with<br />the work.</h2><p className="c-lede">Useful technology starts with an understanding of the people and process behind it.</p></div><div className="c-approach-list">{approach.map((item, index) => <div key={item.title}><span className="c-item-number">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></div>)}</div></div></section>;
}
export function ContactInvitation() {
  return <section className="c-invitation"><div className="c-shell c-invitation-inner"><div><p className="c-section-label">Talk to Kairologic</p><h2>What should<br />work better?</h2><p>Tell us about the work your team manages and where you want to improve it.</p></div><Link href="/contact" className="c-button">Tell us about your project</Link></div></section>;
}
