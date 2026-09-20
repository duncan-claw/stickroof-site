import {test} from 'node:test';
import assert from 'node:assert/strict';
import {
  buildMessage, buildPayload, isHoneypot, isAccepted, readableError,
  SITE_EMAIL, POSTIE_URL, MAX_NAME, MAX_MESSAGE,
} from '../src/lead.js';

const fields = {name:'Jo Example', phone:'0457 523 919', suburb:'Geelong', service:'Stick frame roofs', details:'New pitched roof', sourcePath:'/contact'};

test('buildPayload preserves optional email verbatim', () => {
  const body = buildPayload({...fields, email:'jo@example.com'});
  assert.equal(body.email, 'jo@example.com');
  assert.equal(body.name, 'Jo Example');
  assert.equal(body.nickname, '');
  assert.ok(!body.message.includes('No email supplied'));
});

test('phone-only enquiry falls back to site mailbox and labels it', () => {
  const body = buildPayload({...fields, email:'  '});
  assert.equal(body.email, SITE_EMAIL);
  assert.ok(body.message.includes('No email supplied — contact by phone; reply-to is the site mailbox.'));
});

test('message folds phone/suburb/service/source/consent and validates limits', () => {
  const body = buildPayload({...fields, email:''});
  assert.ok(body.message.includes('Phone: 0457 523 919'));
  assert.ok(body.message.includes('Suburb: Geelong'));
  assert.ok(body.message.includes('Service: Stick frame roofs'));
  assert.ok(body.message.includes('Page: /contact'));
  assert.ok(body.message.includes('Consent: yes'));

  // name cap
  const long = buildPayload({...fields, name:'x'.repeat(1000)});
  assert.ok(long.name.length <= MAX_NAME);

  // message cap
  const big = buildPayload({...fields, details:('y'.repeat(MAX_MESSAGE + 200))});
  assert.ok(big.message.length <= MAX_MESSAGE);
});

test('honeypot detection', () => {
  assert.equal(isHoneypot({nickname:'robot'}), true);
  assert.equal(isHoneypot({nickname:'   '}), false);
  assert.equal(isHoneypot({}), false);
});

test('accepted only on HTTP ok AND body ok:true', () => {
  assert.equal(isAccepted({ok:true},{ok:true}), true);
  assert.equal(isAccepted({ok:true},{ok:false}), false);
  assert.equal(isAccepted({ok:false},{ok:true}), false);
  assert.equal(isAccepted({ok:true},{}), false);
  assert.equal(isAccepted(undefined,{ok:true}), false);
});

test('error copy exists', () => {
  assert.ok(readableError().includes('0457 523 919'));
});