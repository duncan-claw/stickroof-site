import {chromium} from '@playwright/test';import assert from 'node:assert/strict';import fs from 'node:fs';
const data=JSON.parse(fs.readFileSync('src/data.json'));fs.mkdirSync('artifacts',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{for(const [mode,viewport]of Object.entries({desktop:{width:1440,height:1000},mobile:{width:390,height:844}})){
 const context=await browser.newContext({viewport});const page=await context.newPage();const errors=[];const external=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});page.on('request',r=>{if(!r.url().startsWith('http://127.0.0.1:4173'))external.push(r.url());});
 for(const [route,meta] of Object.entries(data.pages)){
 const response=await page.goto('http://127.0.0.1:4173'+route);assert.equal(response.status(),200);assert.equal(await page.title(),meta.title);await page.locator('footer').scrollIntoViewIfNeeded();
 for(const img of await page.locator('img').all()){await img.scrollIntoViewIfNeeded();await img.evaluate(el=>el.decode());assert.ok(await img.evaluate(el=>el.naturalWidth>0));}
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'overflow '+route+' '+mode);
 const reveal=page.locator('footer details');await reveal.locator('summary').click();assert.ok(await reveal.getAttribute('open')!==null);assert.equal(await reveal.locator('a').getAttribute('href'),'mailto:hello@stickroof.com');await reveal.locator('summary').click();
 for(const link of await page.locator('nav a').all())assert.ok(await link.isVisible());
 if(route==='/'||route==='/contact'){
 const form=page.locator('form');assert.equal(await form.evaluate(f=>f.checkValidity()),false);for(const [name,value] of Object.entries({name:'QA Preview',phone:'0400000000',suburb:'Geelong',details:'Local validation only'}))await form.locator('[name='+name+']').fill(value);await form.locator('select').selectOption('Stick frame roofs');await form.locator('[name=consent]').check();assert.equal(await form.evaluate(f=>f.checkValidity()),true);await form.locator('[name=email]').fill('invalid');assert.equal(await form.evaluate(f=>f.checkValidity()),false);await form.locator('[name=email]').fill('');assert.ok(await form.locator('button').isDisabled());assert.equal(await form.locator('[name=source_path]').inputValue(),route);
 }
 await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'artifacts/'+mode+'-'+meta.action+'.png',fullPage:true});results.push({mode,route,status:response.status(),title:await page.title(),images:await page.locator('img').count()});
 }
 await page.goto('http://127.0.0.1:4173/');await page.locator('nav a[href="/contact"]').click();await page.waitForURL(/\/contact\/?$/);assert.equal(await page.title(),data.pages['/contact'].title);
 assert.deepEqual(errors,[]);assert.deepEqual(external,[]);await context.close();
}
const nojs=await browser.newContext({javaScriptEnabled:false});for(const route of Object.keys(data.pages)){const page=await nojs.newPage();await page.goto('http://127.0.0.1:4173'+route);assert.equal(await page.locator('h1').count(),1);await page.close();}await nojs.close();
fs.writeFileSync('artifacts/browser-results.json',JSON.stringify({results,consoleErrors:[],externalRequests:[],noJavaScriptRoutes:6},null,2));console.log('PASS: 12 desktop/mobile routes; 6 no-JS routes; metadata, images, links, email reveal, validation, disabled sends; no console errors or external requests.');
}finally{await browser.close()}
