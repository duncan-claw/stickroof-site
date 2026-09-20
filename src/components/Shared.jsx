import {useState,useEffect} from 'react';
import data from '../data.json';
import {POSTIE_URL,buildPayload,isHoneypot,isAccepted,readableError,TIMEOUT_MS} from '../lead.js';
export function RevealEmail(){return <details className="contact-card" style={{marginTop:'1rem'}}><summary className="button--ghost" style={{display:'inline-block',cursor:'pointer'}}>Email us</summary><p style={{marginTop:'0.75rem'}}><a href="mailto:hello@stickroof.com">hello@stickroof.com</a></p></details>}
export function Gallery({limit=5}){return <div className="gallery-grid">{data.gallery.slice(0,limit).map(item=><article key={item.src} className="gallery-card gallery-card--image"><img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async"/><div className="gallery-card__caption"><span>{item.title}</span></div></article>)}</div>}
export function DisabledNotice(){return <div className="error-summary" role="note"><strong>Preview only — online enquiries are disabled.</strong><p>Nothing is sent or stored. Please call Ian on <a href="tel:+61457523919">0457 523 919</a> instead.</p></div>}
const POSTIE_KEY=(typeof import.meta!=='undefined'&&import.meta.env&&import.meta.env.VITE_POSTIE_API_KEY)||'';
export function LeadForm({sourcePath}){
 if(!POSTIE_KEY){
  const validate=event=>{const field=event.target;if(['name','phone','suburb','details'].includes(field.name))field.setCustomValidity(field.value.trim()?'':'Please fill out this field.');};
  return <div className="form-shell" id="lead-form"><DisabledNotice/><form onSubmit={e=>e.preventDefault()} onInput={validate}>
  <input type="hidden" name="source_path" value={sourcePath}/>
  <div className="field-grid"><label>Name<input name="name" autoComplete="name" required/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required/></label><label>Email (optional)<input name="email" type="email" autoComplete="email"/></label><label>Suburb / town<input name="suburb" autoComplete="address-level2" required/></label></div>
  <label>Service needed<select name="service" defaultValue="" required><option value="">Select a service</option>{data.formServices.map(s=><option key={s}>{s}</option>)}</select></label>
  <label>Tell us about the job<textarea name="details" required placeholder="Type of roof or carpentry work, stage of build, timeframe, plans available, and anything tricky about the job."/></label>
  <label className="check-row"><input type="checkbox" name="consent" value="1" required/><span>I’m happy for Stick Roof to contact me about this enquiry.</span></label>
  <div className="button-row"><button className="button" type="button" disabled>Send enquiry</button><a className="button--ghost" href="tel:+61457523919">Call Ian · 0457 523 919</a></div>
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
  if(isHoneypot(fields)){finish({type:'success',message:'Thanks — your enquiry has been received.'});return;}
  const body=buildPayload({name:fields.name,email:fields.email,phone:fields.phone,suburb:fields.suburb,service:fields.service,details:fields.details,sourcePath});
  setSending(true);setStatus({type:'sending',message:'Sending your enquiry…'});
  try{
   const response=await fetch(POSTIE_URL,{method:'POST',headers:{'Content-Type':'application/json','X-Api-Key':POSTIE_KEY},body:JSON.stringify(body),signal:AbortSignal.timeout(TIMEOUT_MS)});
   const result=await response.json().catch(()=>({}));
   if(isAccepted(response,result)){
    try{sessionStorage.setItem('stickroof:lead-tracked','1');}catch{}
    finish({type:'success',message:'Thanks — your enquiry is through.'});
    form.reset();
    location.assign('/thanks/');
   }else finish({type:'error',message:readableError()});
  }catch{finish({type:'error',message:readableError()});}
 };
 return <div className="form-shell" id="lead-form"><form onSubmit={submit} onInput={validate}>
 <input type="hidden" name="source_path" value={sourcePath}/>
 <div className="field-grid"><label>Name<input name="name" autoComplete="name" required/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" required/></label><label>Email (optional)<input name="email" type="email" autoComplete="email"/></label><label>Suburb / town<input name="suburb" autoComplete="address-level2" required/></label></div>
 <label>Service needed<select name="service" defaultValue="" required><option value="">Select a service</option>{data.formServices.map(s=><option key={s}>{s}</option>)}</select></label>
 <label>Tell us about the job<textarea name="details" required placeholder="Type of roof or carpentry work, stage of build, timeframe, plans available, and anything tricky about the job."/></label>
 <label className="check-row"><input type="checkbox" name="consent" value="1" required/><span>I’m happy for Stick Roof to contact me about this enquiry.</span></label>
 <div aria-hidden="true" style={{position:'absolute',left:'-9999px',top:'auto',height:'1px',width:'1px',overflow:'hidden'}}><label htmlFor="nickname">Nickname</label><input id="nickname" name="nickname" type="text" tabIndex={-1} autoComplete="off"/></div>
 <div className="button-row"><button className="button" type="submit" disabled={!ready||sending}>{sending?'Sending…':'Send enquiry'}</button><a className="button--ghost" href="tel:+61457523919">Call Ian · 0457 523 919</a></div>
 <noscript><p className="fineprint">Online sending needs JavaScript — please call Ian on 0457 523 919 instead.</p></noscript>
 {status.type==='error'?<div className="error-summary" role="alert"><strong>Enquiry not sent.</strong><p>{status.message}</p></div>:<p className="fineprint" role="status" aria-live="polite">{status.message||'Send the basics — expect a direct response.'}</p>}
 </form></div>;
}
