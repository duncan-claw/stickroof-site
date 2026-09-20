import { RevealEmail } from "./Shared.jsx";
export default function Layout({route,children}) {return (
    <div className="site-shell">
      <header className="site-header">
        <div className="wrap site-header__inner">
          <a href="/" className="brand" aria-label="Traditional Stick Roof home">
            <span className="brand__eyebrow">Geelong, Victoria</span>
            <span className="brand__name">Traditional Stick Roof</span>
          </a>

          <nav className="site-nav" aria-label="Primary">
            <a href="/" className={route === "/" ? "nav-link nav-link--active" : "nav-link"}>Home</a>
            <a href="/stick-roofs" className={route === "/stick-roofs" ? "nav-link nav-link--active" : "nav-link"}>Stick Roofs</a>
            <a href="/carpentry-joinery" className={route === "/carpentry-joinery" ? "nav-link nav-link--active" : "nav-link"}>Carpentry & Joinery</a>
            <a href="/service-area" className={route === "/service-area" ? "nav-link nav-link--active" : "nav-link"}>Service Area</a>
            <a href="/contact" className={route === "/contact" ? "nav-link nav-link--active" : "nav-link"}>Contact</a>
          </nav>

          <div className="site-header__cta">
            <a className="phone-chip" href="tel:+61457523919">Call Ian · 0457 523 919</a>
          </div>
        </div>
      </header>



      <main>
        {children}
      </main>

      <footer className="site-footer">
        <div className="wrap site-footer__grid">
          <div>
            <p className="footer-title">Stick Roof</p>
            <p>Specialist stick frame roofs, carpentry, and joinery across Geelong and surrounding regions.</p>
          </div>
          <div>
            <p className="footer-title">Service region</p>
            <p>Geelong, Surf Coast, Bellarine Peninsula, Werribee corridor, and Colac direction.</p>
          </div>
          <div>
            <p className="footer-title">Get in touch</p>
            <p><a href="tel:+61457523919">0457 523 919</a></p>
            <RevealEmail />
          </div>
        </div>
      </footer>
    </div>

);}
