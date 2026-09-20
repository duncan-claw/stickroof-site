import {test, before, after} from 'node:test';
import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import fs from 'node:fs';
import {POSTIE_URL} from '../src/lead.js';

const BASE = 'http://127.0.0.1:4174';
// These tests exercise the live-Postie branch; skip the whole suite when dist/
// was built keyless (form is intentionally disabled there). The nickname
// honeypot only renders in the keyed build.
const keyedDist = fs.readFileSync('dist/contact/index.html','utf8').includes('name="nickname"');
const t = keyedDist ? test : test.skip;

let browser; let server;

before(async () => {
  // Serve dist/ so the built form (keyed) is exercised in a real browser.
  const {createServer} = await import('node:http');
  const {readFile} = await import('node:fs/promises');
  const {stat} = await import('node:fs/promises');
  server = createServer(async (req, res) => {
    let path = req.url.split('?')[0];
    if (path.endsWith('/')) path += 'index.html';
    const file = 'dist' + path;
    const data = await readFile(file).catch(() => null);
    if (!data || ((await stat(file).catch(()=>null))||{}).isDirectory?.()) {
      res.writeHead(404); res.end('not found'); return;
    }
    const type = file.endsWith('.js') ? 'application/javascript'
      : file.endsWith('.css') ? 'text/css'
      : file.endsWith('.svg') ? 'image/svg+xml'
      : file.endsWith('.png') ? 'image/png'
      : file.endsWith('.ico') ? 'image/x-icon'
      : file.endsWith('.html') ? 'text/html'
      : 'application/octet-stream';
    res.writeHead(200, {'Content-Type': type}); res.end(data);
  });
  await new Promise(r => server.listen(4174, '127.0.0.1', r));
  browser = await chromium.launch({channel:'chrome', headless:true});
});

after(async () => {
  await browser?.close();
  await server?.close();
});

// Install a route that mocks Postie and blocks every other external request,
// so no real email/tracking can ever fire during these tests.
async function mockPostie(context, responder) {
  const seen = [];
  await context.route('**/*', (route, req) => {
    const url = req.url();
    if (url === POSTIE_URL) {
      seen.push(req.postDataJSON());
      return responder(route, req);
    }
    // Test-server navigation stays local; tracking/GTM/Meta/external is aborted.
    if (url.startsWith(BASE)) return route.continue();
    return route.abort();
  });
  return seen;
}

async function openForm(context) {
  const page = await context.newPage();
  await page.goto(BASE + '/contact/');
  const form = page.locator('form');
  const fill = async (name, value) => { if (value != null) await form.locator('[name=' + name + ']').fill(String(value)); };
  return {page, form, fill};
}

t('accepted submission: POSTs correct payload, flags session, routes /thanks', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => route.fulfill({status: 200, contentType: 'application/json', body: '{"ok":true}'}));
  const {page, form} = await openForm(context);
  await form.locator('[name=name]').fill('Jo Example');
  await form.locator('[name=phone]').fill('0457523919');
  await form.locator('[name=email]').fill('jo@example.com');
  await form.locator('[name=suburb]').fill('Geelong');
  await form.locator('select').selectOption('Stick frame roofs');
  await form.locator('[name=details]').fill('New roof');
  await form.locator('[name=consent]').check();
  await form.locator('button[type=submit]').click();
  await page.waitForURL('**/thanks/');
  assert.equal(seen.length, 1);
  const body = seen[0];
  assert.equal(body.name, 'Jo Example');
  assert.equal(body.email, 'jo@example.com');
  assert.ok(body.message.includes('Phone: 0457523919'));
  assert.equal(body.nickname, '');
  assert.equal(await page.evaluate(() => sessionStorage.getItem('stickroof:lead-tracked') || null), null); // consumed on redirect
  await context.close();
});

t('ok:false with HTTP 200 → error, stays on form, no redirect', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => route.fulfill({status: 200, contentType: 'application/json', body: '{"ok":false}'}));
  const {page, form} = await openForm(context);
  await fillValid(form);
  await form.locator('button[type=submit]').click();
  await page.waitForSelector('.error-summary');
  assert.equal(page.url().includes('/thanks'), false);
  assert.equal(seen.length, 1);
  await context.close();
});

t('HTTP 500 → error, no redirect', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => route.fulfill({status: 500, contentType: 'application/json', body: '{"ok":false}'}));
  const {page, form} = await openForm(context);
  await fillValid(form);
  await form.locator('button[type=submit]').click();
  await page.waitForSelector('.error-summary');
  assert.equal(page.url().includes('/thanks'), false);
  assert.equal(seen.length, 1);
  await context.close();
});

t('network failure → error, no external traffic, no redirect', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => route.abort());
  const {page, form} = await openForm(context);
  await fillValid(form);
  await form.locator('button[type=submit]').click();
  await page.waitForSelector('.error-summary');
  assert.equal(page.url().includes('/thanks'), false);
  assert.equal(seen.length, 1);
  await context.close();
});

t('timeout → error, no redirect', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => new Promise(() => {})); // never responds
  const {page, form} = await openForm(context);
  await fillValid(form);
  await form.locator('button[type=submit]').click();
  await page.waitForSelector('.error-summary', {timeout: 20000});
  assert.equal(page.url().includes('/thanks'), false);
  assert.equal(seen.length, 1);
  await context.close();
});

t('double submit prevented: only one request', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => new Promise(() => {}));
  const {page, form} = await openForm(context);
  await fillValid(form);
  await form.locator('button[type=submit]').click();
  await form.locator('button[type=submit]').click({force: true}).catch(() => {});
  await page.waitForTimeout(300);
  assert.equal(seen.length, 1);
  await context.close();
});

t('honeypot: silent success, NO network call, NO redirect', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => route.fulfill({status: 200, contentType: 'application/json', body: '{"ok":true}'}));
  const {page, form} = await openForm(context);
  await fillValid(form);
  await form.locator('[name=nickname]').fill('spambot'); // fills hidden honeypot
  await form.locator('button[type=submit]').click();
  await page.waitForTimeout(300);
  assert.equal(seen.length, 0);
  assert.equal(page.url().includes('/thanks'), false);
  // success message shown without navigation
  assert.ok(await form.locator('[role=status]').textContent().then(t => t.includes('received')));
  await context.close();
});

t('native validation blocks invalid email and empty required fields', async () => {
  const context = await browser.newContext();
  await mockPostie(context, route => route.fulfill({status: 200, contentType: 'application/json', body: '{"ok":true}'}));
  const {page, form} = await openForm(context);
  // empty required → invalid
  assert.equal(await form.evaluate(f => f.checkValidity()), false);
  await form.locator('[name=name]').fill('Q A'); await form.locator('[name=phone]').fill('0400000000');
  await form.locator('[name=suburb]').fill('Geelong'); await form.locator('[name=details]').fill('Job');
  await form.locator('select').selectOption('Stick frame roofs'); await form.locator('[name=consent]').check();
  assert.equal(await form.evaluate(f => f.checkValidity()), true);
  // invalid email → invalid
  await form.locator('[name=email]').fill('not-an-email');
  assert.equal(await form.evaluate(f => f.checkValidity()), false);
  await context.close();
});

t('optional email: empty allowed, sent to site mailbox fallback in message', async () => {
  const context = await browser.newContext();
  const seen = await mockPostie(context, route => route.fulfill({status: 200, contentType: 'application/json', body: '{"ok":true}'}));
  const {page, form} = await openForm(context);
  await fillValid(form);
  await form.locator('[name=email]').fill('');
  await form.locator('button[type=submit]').click();
  await page.waitForURL('**/thanks/');
  assert.equal(seen.length, 1);
  assert.ok(seen[0].message.includes('No email supplied — contact by phone; reply-to is the site mailbox.'));
  await context.close();
});

async function fillValid(form) {
  await form.locator('[name=name]').fill('QA Preview');
  await form.locator('[name=phone]').fill('0400000000');
  await form.locator('[name=suburb]').fill('Geelong');
  await form.locator('select').selectOption('Stick frame roofs');
  await form.locator('[name=details]').fill('Local validation only');
  await form.locator('[name=consent]').check();
}