import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import SEO from '../components/common/SEO';

const titleFromSlug = (slug: string) => {
  const normalized = slug.replace(/[-_]+/g, ' ').trim();
  return normalized
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const AnalyticalServiceComingSoon = () => {
  const { slug } = useParams();

  const pageTitle = useMemo(() => {
    if (!slug) return 'Service';
    return titleFromSlug(slug);
  }, [slug]);

  return (
    <>
      <SEO
        title={`${pageTitle} - Coming Soon`}
        description="This service is coming soon. Please check back later or contact us for more information."
        keywords="coming soon, laboratory services, soil analysis, water testing, pesticide residue analysis"
      />

      <div className="bg-white">
        <section className="py-20 px-4 bg-white border-b border-gray-200">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Coming Soon
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {pageTitle}
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
              We’re preparing this service for launch. For urgent inquiries, please reach out and we’ll guide you.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                Contact Us
              </Link>

              <Link
                to="/analytical-services"
                className="inline-flex items-center justify-center bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold border border-gray-300 hover:border-emerald-200 hover:shadow-sm transition-all"
              >
                Back to Analytical Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnalyticalServiceComingSoon;
