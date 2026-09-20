export const SITE_EMAIL = 'hello@stickroof.com';
export const POSTIE_URL = 'https://postie.duncanclaw.ai/submissions';
export const MAX_NAME = 120;
export const MAX_MESSAGE = 5000;
export const TIMEOUT_MS = 15000;

// Fold the brochure form fields into a single message body. Preserves an optional
// email; for a phone-only enquiry the site mailbox is used as the reply-to so Postie
// (which requires email) still accepts the message, and the body clearly labels it.
// We never misrepresent the mailbox as the customer's own address.
export function buildMessage({details, phone, suburb, service, email, sourcePath}) {
  const suppliedEmail = (email || '').trim();
  return [
    (details || '').trim(),
    '—',
    'Phone: ' + (phone || '').trim(),
    'Suburb: ' + (suburb || '').trim(),
    'Service: ' + (service || '').trim(),
    'Page: ' + sourcePath,
    'Consent: yes',
    suppliedEmail ? null : 'No email supplied — contact by phone; reply-to is the site mailbox.',
  ].filter(Boolean).join('\n').slice(0, MAX_MESSAGE);
}

// Build the body POSTed to Postie. email falls back to the site mailbox only when
// no address was supplied (phone-only), clearly flagged in the message.
export function buildPayload({name, email, phone, suburb, service, details, sourcePath}) {
  const suppliedEmail = (email || '').trim();
  return {
    name: (name || '').trim().slice(0, MAX_NAME),
    email: suppliedEmail || SITE_EMAIL,
    message: buildMessage({details, phone, suburb, service, email, sourcePath}),
    nickname: '',
  };
}

// Postie accepts but silently drops the message when the honeypot is filled.
export function isHoneypot(fields) {
  return !!((fields && fields.nickname) || '').trim();
}

// Returns true only when the response is an HTTP success AND the JSON body ok:true.
export function isAccepted(response, body) {
  return !!(response && response.ok && body && body.ok === true);
}

export function readableError() {
  return 'Sorry — your enquiry could not be sent. Please try again, or call Ian on 0457 523 919.';
}