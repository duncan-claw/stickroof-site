import Layout from './components/Layout.jsx';
import {DisabledNotice} from './components/Shared.jsx';
import Home from './pages/home.jsx';
import Roofs from './pages/stick_roofs.jsx';
import Carpentry from './pages/carpentry_joinery.jsx';
import Area from './pages/service_area.jsx';
import Contact from './pages/contact.jsx';
import Thanks from './pages/thank_you.jsx';
const pages={'/':Home,'/stick-roofs':Roofs,'/carpentry-joinery':Carpentry,'/service-area':Area,'/contact':Contact,'/thanks':Thanks};
export default function App({route}){const Page=pages[route];return <Layout route={route}>{route==='/thanks'&&<div className="wrap"><DisabledNotice/><p>This is a preview of the confirmation page, not confirmation of a submission.</p></div>}<Page route={route}/></Layout>}
