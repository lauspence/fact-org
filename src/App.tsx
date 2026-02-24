import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';   // ✅ import hook

import Layout from './components/layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import KnowledgeTraining from './pages/KnowledgeTraining';
import AgriculturalInputs from './pages/AgriculturalInputs';
import EnterpriseBuilding from './pages/EnterpriseBuilding';
import AnalyticalServices from './pages/AnalyticalServices';
import AnalyticalServiceComingSoon from './pages/AnalyticalServiceComingSoon';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Marketplace from './pages/Marketplace';
import ProductDetail from './pages/ProductDetail';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';

import { laravelApi } from "./services/laravel";

function App() {

  // ✅ place useEffect inside component
  useEffect(() => {
    laravelApi.health()
      .then(res => console.log("API OK:", res))
      .catch(err => console.error("API ERROR:", err));
  }, []);

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

          {/* Category cards click → Coming Soon */}
          <Route path="analytical/:slug" element={<AnalyticalServiceComingSoon />} />

          <Route path="marketplace" element={<Marketplace />} /> 
          <Route path="marketplace/:id" element={<ProductDetail />} />
          <Route path="articles" element={<Articles />} />
          <Route path="articles/:slug" element={<ArticleDetail />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;