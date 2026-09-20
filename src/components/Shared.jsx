import data from '../data.json';
export function RevealEmail(){return <details className="contact-card" style={{marginTop:'1rem'}}><summary className="button--ghost" style={{display:'inline-block',cursor:'pointer'}}>Email us</summary><p style={{marginTop:'0.75rem'}}><a href="mailto:hello@stickroof.com">hello@stickroof.com</a></p></details>}
export function Gallery({limit=5}){return <div className="gallery-grid">{data.gallery.slice(0,limit).map(item=><article key={item.src} className="gallery-card gallery-card--image"><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async"/><div className="gallery-card__caption"><span>{item.title}</span></div></article>)}</div>}
export function DisabledNotice(){return <div className="error-summary" role="note"><strong>Preview only — online enquiries are disabled.</strong><p>Nothing is sent or stored. Please call <a href="tel:+61457523919">0457 523 919</a> instead.</p></div>}
export function LeadForm({sourcePath}){
 const validate=event=>{const field=event.target;if(['name','phone','suburb','details'].includes(field.name))field.setCustomValidity(field.value.trim()?'':'Please fill out this field.');};
 return <div className="form-shell" id="lead-form"><DisabledNotice/><form onSubmit={e=>e.preventDefault()} onInput={validate}>
 <input type="hidden" name="source_path" value={sourcePath}/>
 <div className="field-grid"><label>Name<input name="name" autoComplete="name" required/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required/></label><label>Email (optional)<input name="email" type="email" autoComplete="email"/></label><label>Suburb / town<input name="suburb" autoComplete="address-level2" required/></label></div>
 <label>Service needed<select name="service" defaultValue="" required><option value="">Select a service</option>{data.formServices.map(s=><option key={s}>{s}</option>)}</select></label>
 <label>Tell us about the job<textarea name="details" required placeholder="Type of roof or carpentry work, stage of build, timeframe, plans available, and anything tricky about the job."/></label>
 <label className="check-row"><input type="checkbox" name="consent" value="1" required/><span>I’m happy for Stick Roof to contact me about this enquiry.</span></label>
 <div className="button-row"><button className="button" type="button" disabled>Send enquiry</button><a className="button--ghost" href="tel:+61457523919">Call 0457 523 919</a></div>
 <p className="fineprint">Sending is disabled in this preview. Your enquiry details are not stored.</p>
 </form></div>
}
