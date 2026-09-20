import data from "../data.json";
import { Gallery, RevealEmail, LeadForm } from "../components/Shared.jsx";
export default function Page({route}) { return <>
<section className="hero">
  <div className="wrap hero__grid">
    <div className="hero__copy">
      <img src="/stickroof-roofmark-outline.png" alt="Traditional Stick Roof roof mark" className="hero__mark" width="864" height="251" loading="eager" decoding="async" />
      <p className="eyebrow">Specialist carpentry & joinery · Geelong region</p>
      <h1 className="headline">If it’s too difficult for most carpenters, try us.</h1>
      <p className="lede">Stick Roof specialises in complex stick frame roofs, awkward roof geometry, hard renovation tie-ins, and the kind of carpentry detail that usually gets passed over by standard crews.</p>
      <div className="hero__actions">
        <a className="button" href="#lead-form">Request a quote</a>
        <a className="button--ghost" href="/stick-roofs">See stick roof work</a>
      </div>
      <div className="stats-grid" aria-label="Business highlights">
        <div className="stat"><strong>40 min</strong><span>Service radius around Geelong</span></div>
        <div className="stat"><strong>1 call</strong><span>Direct contact with the person doing the work</span></div>
        <div className="stat"><strong>Complex</strong><span>Roof framing and joinery jobs welcomed</span></div>
      </div>
    </div>

    <aside className="hero__panel">
      <p className="kicker">Tell us about the job</p>
      <h2>Get a straight answer quickly.</h2>
      <p className="hint">Roof framing, specialist joinery, renovation detail work, or project support — send the basics and get a callback.</p>
      <LeadForm sourcePath={route} />
    </aside>
  </div>
</section>

<section className="section">
  <div className="wrap">
    <div className="section-heading">
      <p className="eyebrow">What we do best</p>
      <h2>Built for the jobs that need more thought, more precision, and less hand-waving.</h2>
    </div>
    <div className="service-grid">
      {data.services.map(service => (
        <article key={service} className="card">
          <h3>{service}</h3>
          <p>Practical site knowledge, careful layout, and workmanship that respects the complexity of the build.</p>
        </article>
      ))}
    </div>
  </div>
</section>

<section className="section">
  <div className="wrap split-grid">
    <div>
      <div className="section-heading">
        <p className="eyebrow">Why Stick Roof</p>
        <h2>Trusted when the roof shape gets interesting.</h2>
      </div>
      <div className="proof-grid">
        {data.benefits.map(benefit => (
          <article key={benefit.title} className="proof-card">
            <h3>{benefit.title}</h3>
            <p>{benefit.copy}</p>
          </article>
        ))}
      </div>
    </div>
    <aside className="quote-card">
      <blockquote>“The tricky stuff is usually where the real craftsmanship starts.”</blockquote>
      <cite>Stick Roof · Geelong, VIC</cite>
    </aside>
  </div>
</section>

<section className="section">
  <div className="wrap">
    <div className="section-heading">
      <p className="eyebrow">Placeholder-friendly gallery</p>
      <h2>Enough room for a handful of strong project photos — no bloated gallery needed.</h2>
    </div>
    <Gallery />
  </div>
</section>

<section className="cta-band">
  <div className="wrap split-grid">
    <div>
      <p className="eyebrow">Service area</p>
      <h2>Geelong first, plus the surrounding region.</h2>
      <p className="lede">Working across Geelong, the Surf Coast, Bellarine Peninsula, Werribee corridor, and Colac direction — roughly 40 minutes in every direction depending on the job.</p>
    </div>
    <div className="contact-card">
      <h2>Prefer to talk it through?</h2>
      <p>Call <a href="tel:+61457523919">0457 523 919</a> for a quick conversation about access, plans, roof shape, timeframe, and whether it’s the right fit.</p>
      <div className="button-row" style={{"marginTop":"1rem"}}>
        <a className="button" href="tel:+61457523919">Call now</a>
        <a className="button--ghost" href="/service-area">See service area</a>
      </div>
    </div>
  </div>
</section>

</>; }
