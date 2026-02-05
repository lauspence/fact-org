import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({ 
  title, 
  description, 
  keywords = "farming, agriculture, Kenya, training, agribusiness, agricultural inputs, farm tools",
  image = "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
  url = typeof window !== 'undefined' ? window.location.href : "",
  type = "website"
}: SEOProps) => {
  const siteName = "F.a.C.T LTD - Farming and Community Training Limited";
  const fullTitle = `${title} | ${siteName}`;

  useEffect(() => {
    // Set title
    document.title = fullTitle;

    // Helper to set or update meta tag
    const setMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Primary Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);

    // Open Graph / Facebook
    setMetaTag('og:type', type, true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:image', image, true);
    setMetaTag('og:site_name', siteName, true);

    // Twitter
    setMetaTag('twitter:card', 'summary_large_image', true);
    setMetaTag('twitter:url', url, true);
    setMetaTag('twitter:title', fullTitle, true);
    setMetaTag('twitter:description', description, true);
    setMetaTag('twitter:image', image, true);

    // Additional SEO
    setMetaTag('robots', 'index, follow');
    setMetaTag('author', 'F.a.C.T LTD');
    
    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;

  }, [title, description, keywords, image, url, type, fullTitle, siteName]);

  return null;
};

export default SEO;
