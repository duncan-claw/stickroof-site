import data from "../data.json";
import { Gallery, RevealEmail, LeadForm } from "../components/Shared.jsx";
export default function Page({route}) { return <>
<section className="page-hero">
  <div className="wrap contact-grid">
    <div className="section-heading">
      <p className="eyebrow">Contact Stick Roof</p>
      <h1>Tell us what you’re building.</h1>
      <p className="lede">Need help with a stick roof, difficult renovation framing, specialist joinery, or project management? Send the basics and expect a direct response.</p>
      <div className="contact-card">
        <h2>Quickest option</h2>
        <p>Call Ian on <a href="tel:+61457523919">0457 523 919</a>.</p>
        <p>If calling Ian is awkward, you can email instead.</p>
        <RevealEmail />
      </div>
    </div>
    <aside>
      <LeadForm sourcePath={route} />
    </aside>
  </div>
</section>

</>; }
