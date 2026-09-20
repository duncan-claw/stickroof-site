import {useState,useEffect} from 'react';
import data from '../data.json';
export function RevealEmail(){return <details className="contact-card" style={{marginTop:'1rem'}}><summary className="button--ghost" style={{display:'inline-block',cursor:'pointer'}}>Email us</summary><p style={{marginTop:'0.75rem'}}><a href="mailto:hello@stickroof.com">hello@stickroof.com</a></p></details>}
export function Gallery({limit=5}){return <div className="gallery-grid">{data.gallery.slice(0,limit).map(item=><article key={item.src} className="gallery-card gallery-card--image"><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async"/><div className="gallery-card__caption"><span>{item.title}</span></div></article>)}</div>}
export function DisabledNotice(){return <div className="error-summary" role="note"><strong>Preview only — online enquiries are disabled.</strong><p>Nothing is sent or stored. Please call <a href="tel:+61457523919">0457 523 919</a> instead.</p></div>}
const POSTIE_URL='https://postie.duncanclaw.ai/submissions';
const POSTIE_KEY=(typeof import.meta!=='undefined'&&import.meta.env&&import.meta.env.VITE_POSTIE_API_KEY)||'';
const SITE_EMAIL='hello@stickroof.com';
export function LeadForm({sourcePath}){
 if(!POSTIE_KEY){
  const validate=event=>{const field=event.target;if(['name','phone','suburb','details'].includes(field.name))field.setCustomValidity(field.value.trim()?'':'Please fill out this field.');};
  return <div className="form-shell" id="lead-form"><DisabledNotice/><form onSubmit={e=>e.preventDefault()} onInput={validate}>
  <input type="hidden" name="source_path" value={sourcePath}/>
  <div className="field-grid"><label>Name<input name="name" autoComplete="name" required/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required/></label><label>Email (optional)<input name="email" type="email" autoComplete="email"/></label><label>Suburb / town<input name="suburb" autoComplete="address-level2" required/></label></div>
  <label>Service needed<select name="service" defaultValue="" required><option value="">Select a service</option>{data.formServices.map(s=><option key={s}>{s}</option>)}</select></label>
  <label>Tell us about the job<textarea name="details" required placeholder="Type of roof or carpentry work, stage of build, timeframe, plans available, and anything tricky about the job."/></label>
  <label className="check-row"><input type="checkbox" name="consent" value="1" required/><span>I’m happy for Stick Roof to contact me about this enquiry.</span></label>
  <div className="button-row"><button className="button" type="button" disabled>Send enquiry</button><a className="button--ghost" href="tel:+61457523919">Call 0457 523 919</a></div>
  <p className="fineprint">Sending is disabled in this preview. Your enquiry details are not stored.</p>
  </form></div>;
 }
 const [status,setStatus]=useState({type:'idle',message:''});
 const [sending,setSending]=useState(false);
 // SSR renders the button disabled so a no-JS visitor can never native-submit
 // (which would leak form fields into the URL); JS enables it after hydration.
 const [ready,setReady]=useState(false);
 useEffect(()=>setReady(true),[]);
 const validate=event=>{const field=event.target;if(['name','phone','suburb','details'].includes(field.name))field.setCustomValidity(field.value.trim()?'':'Please fill out this field.');};
 const finish=next=>{setSending(false);setStatus(next);};
 const submit=async event=>{
  event.preventDefault();
  if(sending)return;
  const form=event.currentTarget;
  const fields=Object.fromEntries(new FormData(form));
  const email=(fields.email||'').trim();
  const message=[
   (fields.details||'').trim(),
   '—',
   'Phone: '+(fields.phone||'').trim(),
   'Suburb: '+(fields.suburb||'').trim(),
   'Service: '+(fields.service||'').trim(),
   'Page: '+sourcePath,
   'Consent: yes',
   email?null:'No email supplied — contact by phone; reply-to is the site mailbox.'
  ].filter(Boolean).join('\n').slice(0,5000);
  // Honeypot: Postie accepts and silently drops; show success without tracking.
  if((fields.nickname||'').trim()){finish({type:'success',message:'Thanks — your enquiry has been received.'});return;}
  setSending(true);setStatus({type:'sending',message:'Sending your enquiry…'});
  try{
   const response=await fetch(POSTIE_URL,{method:'POST',headers:{'Content-Type':'application/json','X-Api-Key':POSTIE_KEY},body:JSON.stringify({name:(fields.name||'').trim().slice(0,120),email:email||SITE_EMAIL,message,nickname:''}),signal:AbortSignal.timeout(15000)});
   const result=await response.json().catch(()=>({}));
   if(response.ok&&result.ok){
    try{sessionStorage.setItem('stickroof:lead-tracked','1');}catch{}
    finish({type:'success',message:'Thanks — your enquiry is through.'});
    form.reset();
    location.assign('/thanks/');
   }else finish({type:'error',message:'Sorry — your enquiry could not be sent. Please try again, or call 0457 523 919.'});
  }catch{finish({type:'error',message:'Sorry — your enquiry could not be sent. Please try again, or call 0457 523 919.'});}
 };
 return <div className="form-shell" id="lead-form"><form onSubmit={submit} onInput={validate}>
 <input type="hidden" name="source_path" value={sourcePath}/>
 <div className="field-grid"><label>Name<input name="name" autoComplete="name" required/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required/></label><label>Email (optional)<input name="email" type="email" autoComplete="email"/></label><label>Suburb / town<input name="suburb" autoComplete="address-level2" required/></label></div>
 <label>Service needed<select name="service" defaultValue="" required><option value="">Select a service</option>{data.formServices.map(s=><option key={s}>{s}</option>)}</select></label>
 <label>Tell us about the job<textarea name="details" required placeholder="Type of roof or carpentry work, stage of build, timeframe, plans available, and anything tricky about the job."/></label>
 <label className="check-row"><input type="checkbox" name="consent" value="1" required/><span>I’m happy for Stick Roof to contact me about this enquiry.</span></label>
 <div aria-hidden="true" style={{position:'absolute',left:'-9999px',top:'auto',height:'1px',width:'1px',overflow:'hidden'}}><label htmlFor="nickname">Nickname</label><input id="nickname" name="nickname" type="text" tabIndex={-1} autoComplete="off"/></div>
 <div className="button-row"><button className="button" type="submit" disabled={!ready||sending}>{sending?'Sending…':'Send enquiry'}</button><a className="button--ghost" href="tel:+61457523919">Call 0457 523 919</a></div>
 <noscript><p className="fineprint">Online sending needs JavaScript — please call 0457 523 919 instead.</p></noscript>
 {status.type==='error'?<div className="error-summary" role="alert"><strong>Enquiry not sent.</strong><p>{status.message}</p></div>:<p className="fineprint" role="status" aria-live="polite">{status.message||'Send the basics — expect a direct response.'}</p>}
 </form></div>;
}
