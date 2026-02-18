import { useEffect } from 'react';

const StructuredData = () => {
  useEffect(() => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Farming and Community Technologies Limited (F.a.C.T LTD)",
      "alternateName": "F.a.C.T LTD",
      "url": typeof window !== 'undefined' ? window.location.origin : "",
      "description": "Leading agricultural development organization providing training, inputs, and advisory services to farming communities in Kenya.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Nairobi",
        "addressCountry": "KE"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "availableLanguage": ["English", "Swahili"]
      }
    };

    // Add JSON-LD script
    let script = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(organizationSchema);

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;
};

export default StructuredData;
