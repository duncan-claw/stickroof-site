import fs from 'node:fs';import crypto from 'node:crypto';
const source=process.env.SOURCE_REPO;if(!source)throw Error('Set SOURCE_REPO to read-only Rails repository');
const files=['icon.svg','icon.png','stickroof-roofmark-outline.png',...fs.readdirSync('public/images/gallery').map(x=>'images/gallery/'+x)];
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
for(const f of files)if(hash('public/'+f)!==hash(source+'/public/'+f))throw Error('Asset mismatch: '+f);
console.log('PASS: '+files.length+' source assets byte-identical');
