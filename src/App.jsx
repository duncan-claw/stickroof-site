import Layout from './components/Layout.jsx';
import Home from './pages/home.jsx';
import Roofs from './pages/stick_roofs.jsx';
import Carpentry from './pages/carpentry_joinery.jsx';
import Area from './pages/service_area.jsx';
import Contact from './pages/contact.jsx';
import Thanks from './pages/thank_you.jsx';
const pages={'/':Home,'/stick-roofs':Roofs,'/carpentry-joinery':Carpentry,'/service-area':Area,'/contact':Contact,'/thanks':Thanks};
export default function App({route}){const Page=pages[route];return <Layout route={route}><Page route={route}/></Layout>}
