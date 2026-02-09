import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import KnowledgeTraining from './pages/KnowledgeTraining';
import AgriculturalInputs from './pages/AgriculturalInputs';
import EnterpriseBuilding from './pages/EnterpriseBuilding';
import AnalyticalServices from './pages/AnalyticalServices';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Marketplace from './pages/Marketplace'; // Add this

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="knowledge-training" element={<KnowledgeTraining />} />
          <Route path="agricultural-inputs" element={<AgriculturalInputs />} />
          <Route path="enterprise-building" element={<EnterpriseBuilding />} />
          <Route path="analytical-services" element={<AnalyticalServices />} />
          <Route path="marketplace" element={<Marketplace />} /> {/* Add this */}
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
