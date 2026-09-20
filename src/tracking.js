export const GOOGLE_ADS_ID='AW-18100747970';
export const GOOGLE_ADS_LEAD_LABEL='AzAaCOOlpZ4cEML9jbdD';
export const META_PIXEL_ID='982008488091156';
export const trackingAllowed=hostname=>['stickroof.com','www.stickroof.com'].includes(hostname);
export function initTracking(){
 if(!trackingAllowed(location.hostname))return;
 window.dataLayer=window.dataLayer||[];window.gtag=function(){window.dataLayer.push(arguments)};
 const tag=document.createElement('script');tag.async=true;tag.src='https://www.googletagmanager.com/gtag/js?id='+GOOGLE_ADS_ID;document.head.append(tag);
 window.gtag('js',new Date());window.gtag('config',GOOGLE_ADS_ID);
 !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=true;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=true;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
 window.fbq('init',META_PIXEL_ID);window.fbq('track','PageView');
}
// Existing source events retained, but impossible to fire in Phase 1–2.
// Phase 3 must replace this gate only after verified accepted submission.
export function trackAcceptedEnquiry(){
 const submissionEnabled=false;
 if(!submissionEnabled||!trackingAllowed(location.hostname))return;
 window.gtag?.('event','conversion',{'send_to':GOOGLE_ADS_ID+'/'+GOOGLE_ADS_LEAD_LABEL});
 window.fbq?.('track','Lead');
}
