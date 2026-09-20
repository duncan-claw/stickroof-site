// One-time, read-only source importer. Never needed for normal builds.
import fs from 'node:fs';
import path from 'node:path';
const source = process.env.SOURCE_REPO || '/Users/markrichards/Development/repos/stickroof/stickroof.com';
const read = p => fs.readFileSync(path.join(source,p),'utf8');
const put = (p,s) => {fs.mkdirSync(path.dirname(p),{recursive:true});fs.writeFileSync(p,s)};
const controller=read('app/controllers/pages_controller.rb');
const array = name => JSON.parse(controller.match(new RegExp(name+' = (\\[[\\s\\S]*?\\])\\.freeze'))?.[1] || '[]');
// Ruby literal constants contain only strings, integers and symbol-keyed hashes.
function constant(name,text=controller){const raw=text.split(name+' = ')[1].split('.freeze')[0];return JSON.parse(raw.replace(/(\w+): /g,'"$1": '));}
const data={areas:constant('SERVICE_AREAS'),services:constant('SERVICES'),benefits:constant('BENEFITS'),gallery:constant('GALLERY_ITEMS'),formServices:constant('SERVICES',read('app/models/lead.rb'))};
const routes={'/':'home','/stick-roofs':'stick_roofs','/carpentry-joinery':'carpentry_joinery','/service-area':'service_area','/contact':'contact','/thanks':'thank_you'};
data.pages=Object.fromEntries(Object.entries(routes).map(([route,action])=>{const block=controller.split('  def '+action+'\n')[1];return [route,{action,title:block.match(/@page_title = "(.*)"/)[1],description:block.match(/@meta_description = "(.*)"/)[1]}]}));
put('src/data.json',JSON.stringify(data,null,2)+'\n');
function convert(s){return s.replaceAll('class=','className=').replaceAll('<%= default_phone_href %>','+61457523919').replaceAll('<%= default_phone_number %>','0457 523 919').replaceAll('<%= default_email_address %>','hello@stickroof.com').replace(/style="([^"]+)"/g,(_,styles)=>'style={'+JSON.stringify(Object.fromEntries(styles.split(';').filter(x=>x.trim()).map(x=>{const [k,v]=x.split(':');return [k.trim().replace(/-([a-z])/g,(_,c)=>c.toUpperCase()),v.trim()]})))+'}').replaceAll('<%= render "shared/reveal_email" %>','<RevealEmail />').replace(/<%= render "shared\/lead_form"[\s\S]*?%>/g,'<LeadForm sourcePath={route} />').replaceAll('<%= render "gallery", items: @gallery_items %>','<Gallery />').replaceAll('<%= render "gallery", items: @gallery_items.first(4) %>','<Gallery limit={4} />');}
for(const [route,action] of Object.entries(routes)){
let s=read('app/views/pages/'+action+'.html.erb');
if(action==='thank_you')s=s.slice(s.indexOf('<section'));
s=convert(s).replace(/<%= image_tag "([^"]+)",[\s\S]*?decoding: "async" %>/, '<img src="$1" alt="Traditional Stick Roof roof mark" className="hero__mark" width="864" height="251" loading="eager" decoding="async" />');
s=s.replace('<% @services.each do |service| %>','{data.services.map(service => (').replace('<%= service %>','{service}').replace('<% @benefits.each do |benefit| %>','{data.benefits.map(benefit => (').replaceAll('<%= benefit[:title] %>','{benefit.title}').replaceAll('<%= benefit[:copy] %>','{benefit.copy}').replaceAll('<% end %>','))}').replace('<article className="card">\n          <h3>{service}', '<article key={service} className="card">\n          <h3>{service}').replace('<article className="proof-card">','<article key={benefit.title} className="proof-card">');
if(s.includes('<%'))throw Error('Unconverted ERB '+action);
put('src/pages/'+action+'.jsx', 'import data from "../data.json";\nimport { Gallery, RevealEmail, LeadForm } from "../components/Shared.jsx";\nexport default function Page({route}) { return <>\n'+s+'\n</>; }\n');
}
put('src/index.css',read('app/assets/tailwind/application.css'));
let layout=read('app/views/layouts/application.html.erb');
let shell=layout.slice(layout.indexOf('    <div class="site-shell">'),layout.lastIndexOf('  </body>'));
shell=shell.replace(/<% flash.each[\s\S]*?<% end %>/,'').replace('<%= yield %>','{children}').replace('<%= link_to root_path, class: "brand", aria: { label: "Traditional Stick Roof home" } do %>','<a href="/" class="brand" aria-label="Traditional Stick Roof home">').replace('<% end %>','</a>').replace(/<%= nav_link_to "([^"]+)", (root_path|"[^"]+") %>/g,(_,label,p)=>'<a href="'+(p==='root_path'?'/':JSON.parse(p))+'" className={route === '+JSON.stringify(p==='root_path'?'/':JSON.parse(p))+' ? "nav-link nav-link--active" : "nav-link"}>'+label+'</a>');
put('src/components/Layout.jsx','import { RevealEmail } from "./Shared.jsx";\nexport default function Layout({route,children}) {return (\n'+convert(shell)+'\n);}\n');
for(const asset of ['icon.svg','icon.png','stickroof-roofmark-outline.png','robots.txt','sitemap.xml']){fs.mkdirSync('public',{recursive:true});fs.copyFileSync(path.join(source,'public',asset),'public/'+asset)}
fs.cpSync(path.join(source,'public/images'),'public/images',{recursive:true});
put('public/CNAME','stickroof.com\n');
