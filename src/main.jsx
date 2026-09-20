import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {initTracking,trackAcceptedEnquiry} from './tracking.js';
const route=location.pathname.replace(/\/$/,'')||'/';
const root=document.getElementById('root');
if(root.querySelector('.site-shell'))hydrateRoot(root,<App route={route}/>);else createRoot(root).render(<App route={route}/>);
initTracking();
try{if(route==='/thanks'&&sessionStorage.getItem('stickroof:lead-tracked')==='1'){sessionStorage.removeItem('stickroof:lead-tracked');trackAcceptedEnquiry();}}catch{}
