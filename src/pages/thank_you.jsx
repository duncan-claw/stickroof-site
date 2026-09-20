import data from "../data.json";
import { Gallery, RevealEmail, LeadForm } from "../components/Shared.jsx";
export default function Page({route}) { return <>
<section className="thank-you">
  <div className="wrap split-grid">
    <div className="section-heading">
      <p className="eyebrow">Thanks</p>
      <h1>Your enquiry is through.</h1>
      <p className="lede">Stick Roof has your details and will be in touch shortly. If the job is urgent, call Ian on <a href="tel:+61457523919">0457 523 919</a>.</p>
      <div className="button-row">
        <a className="button" href="tel:+61457523919">Call Ian</a>
        <a className="button--ghost" href="/">Back to home</a>
      </div>
    </div>
    <aside className="quote-card">
      <blockquote>Complicated build? Good. That’s usually where the interesting work lives.</blockquote>
      <cite>Stick Roof · Geelong, VIC</cite>
    </aside>
  </div>
</section>

</>; }
