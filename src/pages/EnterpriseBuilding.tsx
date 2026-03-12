import { FaBriefcase,FaChartLine, FaHandshake, FaLightbulb,FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const EnterpriseBuilding = () => {
  const services = [
    {
      icon: <FaLightbulb className="w-10 h-10 text-emerald-600" />,
      title: "Business Planning",
      description: "Business plan development, feasibility studies, and strategic planning for agricultural ventures."
    },
    {
      icon: <FaChartLine className="w-10 h-10 text-emerald-600" />,
      title: "Market Linkage",
      description: "Connecting farmers with buyers, processors, and value chain actors for sustainable growth."
    },
    {
      icon: <FaBriefcase className="w-10 h-10 text-emerald-600" />,
      title: "Financial Management",
      description: "Training on bookkeeping, financial planning, and accessing agricultural finance."
    },
    {
      icon: <FaHandshake className="w-10 h-10 text-emerald-600" />,
      title: "Partnership Development",
      description: "Facilitating strategic partnerships with corporates and development organizations."
    }
  ];

  const youthPrograms = [
    "Agripreneurship Training",
    "Start-up Incubation",
    "Skills Development",
    "Training on Access to Finance  ",
    "Peer Networks",
    "Leadership Development"
  ];

  const successMetrics = [
    { number: "500+", label: "Agripreneurs" },
    {number:"10", label:"Counties Reached"},
    { number: "200+", label: "Jobs Created" },
  ];

  return (
    <>
      <SEO 
        title="Enterprise Building & Sector Development"
        description="Building sustainable agricultural businesses and strengthening value chains. Youth engagement programs, business support, and market linkages in Kenya."
        keywords="agricultural enterprise Kenya, agribusiness development, youth in agriculture, farm business planning, market linkage Kenya"
      />

      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-white border-b-2 border-gray-200 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Enterprise Development
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Enterprise Building &<br />Sector Development
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Building sustainable agricultural businesses and strengthening value chains for lasting impact.
            </p>
          </div>
        </section>

        {/* Business Support Services */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Business Support Services
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Comprehensive support to build and grow your agricultural enterprise
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-emerald-200 hover:shadow-lg transition-all">
                  <div className="mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Youth Engagement */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Youth Programs
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Engaging Youth in Agriculture
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Transforming farming into an attractive and profitable career through innovative programs, 
                  mentorship, and access to resources.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                >
                  Learn More <FaArrowRight className="text-sm" />
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {youthPrograms.map((program, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
                    <p className="font-medium text-gray-800 text-sm">{program}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-20 px-4 bg-emerald-600">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Our Impact
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {successMetrics.map((metric, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold mb-2 text-white">{metric.number}</div>
                  <p className="text-emerald-100 text-sm font-medium">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Ready to Build Your Enterprise?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Partner with us to transform your agricultural business idea into a thriving reality
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Get Started Today <FaArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default EnterpriseBuilding;
