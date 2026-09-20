import data from "../data.json";
import { Gallery, RevealEmail, LeadForm } from "../components/Shared.jsx";
export default function Page({route}) { return <>
<section className="page-hero">
  <div className="wrap split-grid">
    <div className="section-heading">
      <p className="eyebrow">Stick roofs Geelong</p>
      <h1>Specialist stick frame roofs for builds that aren’t simple.</h1>
      <p className="lede">A stick roof is built on site piece by piece, which makes it ideal for custom homes, renovations, additions, and roof forms that need real carpentry judgment rather than a standard truss drop.</p>
    </div>
    <aside className="contact-card">
      <h2>Need a roof carpenter who’ll take on the awkward stuff?</h2>
      <p>We work on difficult roof structures, renovations tying into existing homes, and custom framing details where accuracy matters.</p>
      <div className="button-row" style={{"marginTop":"1rem"}}>
        <a className="button" href="/contact">Request a quote</a>
        <a className="button--ghost" href="tel:+61457523919">Call Ian · 0457 523 919</a>
      </div>
    </aside>
  </div>
</section>

<section className="section">
  <div className="wrap service-grid">
    <article className="card">
      <h3>What is a stick roof?</h3>
      <p>A stick roof is hand-framed on site using individual timber members instead of relying solely on pre-manufactured trusses. It suits custom shapes, non-standard spans, extensions, and builds where the roof design needs flexibility.</p>
    </article>
    <article className="card">
      <h3>Why it’s more complex</h3>
      <p>Complex roof framing demands accurate set-out, clean geometry, smart sequencing, and a carpenter who can solve problems as the structure comes together. That’s exactly where Stick Roof adds value.</p>
    </article>
    <article className="card">
      <h3>Why choose us</h3>
      <p>Because the work is the point. Difficult hips, valleys, tie-ins, raked ceilings, structural details, and renovation constraints are not a nuisance here — they’re the core job.</p>
    </article>
  </div>
</section>

<section className="section">
  <div className="wrap split-grid">
    <div>
      <div className="section-heading">
        <p className="eyebrow">Typical projects</p>
        <h2>Custom homes, renovations, additions, and anything with roof geometry that can’t be phoned in.</h2>
      </div>
      <ul className="bullet-list">
        <li>New homes with non-standard rooflines</li>
        <li>Extensions tying new structure into existing roofs</li>
        <li>Dormers and dormer conversions</li>
        <li>Raked ceilings and feature framing</li>
        <li>Repairs or rebuilds where roof structure needs specialist carpentry</li>
        <li>Builder support on difficult framing stages</li>
      </ul>
    </div>
    <Gallery limit={4} />
  </div>
</section>

</>; }
