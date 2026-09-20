import {test} from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import {load} from 'cheerio';import {trackingAllowed,trackAcceptedEnquiry} from '../src/tracking.js';
const data=JSON.parse(fs.readFileSync('src/data.json'));const norm=s=>s.replace(/\s+/g,' ').trim();
for(const [route,page] of Object.entries(data.pages))test('Static content, SEO, assets and source copy: '+route,()=>{
const html=fs.readFileSync('dist'+(route==='/'?'':route)+'/index.html','utf8');const $=load(html);
assert.equal($('title').text(),page.title);assert.equal($('meta[name=description]').attr('content'),page.description);assert.equal($('link[rel=canonical]').attr('href'),'https://stickroof.com'+route);
for(const [key,value]of Object.entries({type:'website',title:page.title,description:page.description,url:'https://stickroof.com'+route}))assert.equal($('meta[property="og:'+key+'"]').attr('content'),value);
const schema=JSON.parse($('script[type="application/ld+json"]').html());assert.equal(schema.url,'https://stickroof.com'+route);assert.deepEqual(schema.areaServed,data.areas.map(name=>({'@type':'City',name})));assert.deepEqual(schema.serviceType,data.services);assert.equal(schema.telephone,'+61457523919');assert.equal(schema.description,page.description);assert.equal($('h1').length,1);
$('img').each((_,el)=>{assert.ok(fs.existsSync('dist'+$(el).attr('src')));assert.ok($(el).attr('alt') || $(el).parents('noscript').length);});
$('a').each((_,el)=>{const href=$(el).attr('href');if(href.startsWith('/'))assert.ok(data.pages[href]||fs.existsSync('dist'+href));if(href.startsWith('#'))assert.equal($(href).length,1);});
const source=fs.readFileSync('tests/fixtures/'+page.action+'.html.erb','utf8').replaceAll('<%= default_phone_number %>','0457 523 919').replace(/<%[\s\S]*?%>/g,'');const original=load(source);const text=norm($('main').text());
original('h1,h2,h3,p,li,blockquote,cite').each((_,el)=>{const copy=norm(original(el).text());if(copy)assert.ok(text.includes(copy),'Missing source copy: '+copy);});
if(route==='/'||route==='/contact'){assert.equal($('input[name=source_path]').attr('value'),route);assert.equal($('button[disabled]').length,1);assert.equal($('[required]').length,6);assert.deepEqual($('select option').toArray().slice(1).map(e=>$(e).text()),data.formServices);}
if(route==='/'||route==='/stick-roofs')$('.gallery-card img').each((i,el)=>{const item=data.gallery[i];for(const key of ['src','alt','width','height'])assert.equal($(el).attr(key),String(item[key]));});
assert.ok(!html.includes('<%'));assert.equal(html.includes('facebook.com/tr?'),process.env.STICKROOF_PRODUCTION === '1');
});
test('Source CSS exact; tracking and publishing gates',()=>{assert.equal(fs.readFileSync('src/index.css','utf8'),fs.readFileSync('tests/fixtures/application.css','utf8'));assert.equal(fs.readFileSync('public/CNAME','utf8'),'stickroof.com\n');for(const host of ['localhost','127.0.0.1','::1','preview.example'])assert.equal(trackingAllowed(host),false);assert.equal(trackingAllowed('stickroof.com'),true);trackAcceptedEnquiry();assert.ok(!fs.readFileSync('dist/404.html','utf8').includes('id="root"'));});

test('Controller constants and SEO independently match frozen Rails source',()=>{
const source=fs.readFileSync('tests/fixtures/pages_controller.rb','utf8');
for(const [key,name]of Object.entries({areas:'SERVICE_AREAS',services:'SERVICES',benefits:'BENEFITS',gallery:'GALLERY_ITEMS'})){const raw=source.split(name+' = ')[1].split('.freeze')[0];assert.deepEqual(data[key],JSON.parse(raw.replace(/(\w+): /g,'"$1": ')));}
for(const [route,page]of Object.entries(data.pages)){const block=source.split('  def '+page.action+'\n')[1];assert.equal(page.title,block.match(/@page_title = "(.*)"/)[1]);assert.equal(page.description,block.match(/@meta_description = "(.*)"/)[1]);if(route!=='/')assert.equal(fs.readFileSync('dist'+route+'.html','utf8'),fs.readFileSync('dist'+route+'/index.html','utf8'));}
});
