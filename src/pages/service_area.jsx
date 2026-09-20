import data from "../data.json";
import { Gallery, RevealEmail, LeadForm } from "../components/Shared.jsx";
export default function Page({route}) { return <>
<section className="page-hero">
  <div className="wrap split-grid">
    <div className="section-heading">
      <p className="eyebrow">Service area</p>
      <h1>Servicing Geelong and surrounding areas within roughly 40 minutes.</h1>
      <p className="lede">Stick Roof is based around Geelong and regularly works across key suburbs, the Surf Coast, Bellarine Peninsula, Werribee corridor, and inland towns toward Colac.</p>
    </div>
    <aside className="contact-card">
      <h2>Not sure if your job is in range?</h2>
      <p>Call Ian on <a href="tel:+61457523919">0457 523 919</a> or send an enquiry with your suburb and project type. If the job suits, we’ll make it work.</p>
    </aside>
  </div>
</section>

<section className="section">
  <div className="wrap area-grid">
    <article className="area-card">
      <h3>Geelong core</h3>
      <ul className="area-list">
        <li>Geelong</li><li>Newtown</li><li>Belmont</li><li>Highton</li><li>Herne Hill</li><li>Manifold Heights</li><li>Hamlyn Heights</li><li>Geelong West</li><li>North Geelong</li><li>South Geelong</li><li>East Geelong</li><li>Rippleside</li><li>Drumcondra</li>
      </ul>
    </article>
    <article className="area-card">
      <h3>North & west</h3>
      <ul className="area-list">
        <li>Norlane</li><li>Corio</li><li>Lara</li><li>Bannockburn</li><li>Teesdale</li><li>Inverleigh</li><li>Winchelsea</li><li>Colac</li><li>Birregurra</li>
      </ul>
    </article>
    <article className="area-card">
      <h3>South & Surf Coast</h3>
      <ul className="area-list">
        <li>Waurn Ponds</li><li>Grovedale</li><li>Marshall</li><li>Armstrong Creek</li><li>Mount Duneed</li><li>Torquay</li><li>Jan Juc</li><li>Anglesea</li>
      </ul>
    </article>
    <article className="area-card">
      <h3>Bellarine & east</h3>
      <ul className="area-list">
        <li>Leopold</li><li>Drysdale</li><li>Clifton Springs</li><li>Ocean Grove</li><li>Barwon Heads</li><li>Point Lonsdale</li><li>Queenscliff</li><li>Portarlington</li><li>Little River</li><li>Werribee</li>
      </ul>
    </article>
  </div>
</section>

</>; }
