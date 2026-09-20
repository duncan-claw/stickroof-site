import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {initTracking} from './tracking.js';
const route=location.pathname.replace(/\/$/,'')||'/';
const root=document.getElementById('root');
if(root.querySelector('.site-shell'))hydrateRoot(root,<App route={route}/>);else createRoot(root).render(<App route={route}/>);
initTracking();
