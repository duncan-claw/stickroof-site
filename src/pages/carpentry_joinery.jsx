import data from "../data.json";
import { Gallery, RevealEmail, LeadForm } from "../components/Shared.jsx";
export default function Page({route}) { return <>
<section className="page-hero">
  <div className="wrap split-grid">
    <div className="section-heading">
      <p className="eyebrow">Carpentry & joinery Geelong</p>
      <h1>Specialist carpentry and joinery for jobs that need judgement, not just labour.</h1>
      <p className="lede">Beyond stick roofs, Stick Roof takes on selected carpentry, detailed joinery, and project support work where the brief is technical, awkward, custom, or quality-sensitive.</p>
    </div>
    <aside className="quote-card">
      <blockquote>Good carpentry solves problems before they turn into expensive surprises.</blockquote>
      <cite>Specialist detail work across Geelong and surrounds</cite>
    </aside>
  </div>
</section>

<section className="section">
  <div className="wrap service-grid">
    <article className="card">
      <h3>Specialist carpentry</h3>
      <p>Structural detailing, hard set-outs, renovation framing, and site work where accuracy matters more than speed for speed’s sake.</p>
    </article>
    <article className="card">
      <h3>Joinery and finishing detail</h3>
      <p>Tailored timber work, careful fitting, and joinery-minded execution where poor finish work would let the whole project down.</p>
    </article>
    <article className="card">
      <h3>Project management support</h3>
      <p>Help coordinating tricky build stages, sequencing trades, and keeping complicated jobs moving with less confusion on site.</p>
    </article>
  </div>
</section>

<section className="section">
  <div className="wrap split-grid">
    <div className="contact-card">
      <h2>Best fit jobs</h2>
      <ul className="bullet-list">
        <li>Architectural homes and extensions</li>
        <li>Renovations with existing structure constraints</li>
        <li>Builder overflow on difficult framing or detail work</li>
        <li>Projects where communication and reliability matter</li>
      </ul>
    </div>
    <div className="contact-card">
      <h2>How to start</h2>
      <p>Send plans, photos, dimensions, or just a plain-English description. If it sounds like the sort of problem most carpenters avoid, that’s probably a good sign.</p>
      <div className="button-row" style={{"marginTop":"1rem"}}>
        <a className="button" href="/contact">Send project details</a>
        <a className="button--ghost" href="tel:+61457523919">Call Ian · 0457 523 919</a>
      </div>
    </div>
  </div>
</section>

</>; }
