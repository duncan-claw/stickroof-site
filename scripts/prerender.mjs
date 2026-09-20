import fs from 'node:fs';
import {pages,render} from '../.ssr/render.js';
import {META_PIXEL_ID} from '../src/tracking.js';
// The no-JS pixel cannot inspect hostname; include only in deployment artifacts.
const beacon = process.env.STICKROOF_PRODUCTION === '1'
  ? `<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${META_PIXEL_ID}&amp;ev=PageView&amp;noscript=1" alt=""></noscript>`
  : '';
const template=fs.readFileSync('dist/index.html','utf8');
for(const route of Object.keys(pages)){const {head,body}=render(route);const dir='dist'+(route==='/'?'':route);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/index.html',template.replace('<!--head-->',head).replace('<!--app-->',body).replace('</body>',beacon+'</body>').replace('<body>','<body id="page-pages-'+pages[route].action.replaceAll('_','-')+'">'));if(route!=='/')fs.copyFileSync(dir+'/index.html','dist'+route+'.html');console.log('Prerendered '+route);}
fs.writeFileSync('dist/404.html','<!doctype html><html lang="en-AU"><meta charset="utf-8"><title>Page not found | Stick Roof</title><h1>Page not found</h1><a href="/">Back to home</a></html>');
