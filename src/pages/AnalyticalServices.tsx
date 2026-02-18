import { FaFlask, FaTint, FaLeaf, FaClipboardCheck, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const AnalyticalServices = () => {
  const services = [
    {
      title: "Soil Analysis",
      slug: "soil-analysis",
      icon: <FaFlask className="w-10 h-10 text-emerald-600" />,
      description: "Comprehensive soil testing for optimal crop nutrition and productivity.",
      tests: [
        "NPK Analysis (Nitrogen, Phosphorus, Potassium)",
        "Micronutrient Testing (Fe, Zn, Cu, Mn, B)",
        "pH & EC Testing",
        "Organic Matter Content",
        "Heavy Metal Screening"
      ]
    },
    {
      title: "Water Testing",
      slug: "water-testing",
      icon: <FaTint className="w-10 h-10 text-emerald-600" />,
      description: "Water quality assessment for safe irrigation and consumption.",
      tests: [
        "Physical Parameters (pH, TDS, turbidity)",
        "Chemical Analysis (Nitrates, phosphates)",
        "Microbial Testing (E.coli, coliform)",
        "Salinity Testing",
        "Heavy Metals Detection"
      ]
    },
    {
      title: "Pesticide Residue Analysis",
      slug: "pesticide-residue-analysis",
      icon: <FaLeaf className="w-10 h-10 text-emerald-600" />,
      description: "Detection of pesticide residues for food safety and export compliance.",
      tests: [
        "Multi-Residue Screening (200+ pesticides)",
        "MRL Compliance Verification",
        "Organic Certification Support",
        "Export Standards Compliance",
        "Safety Recommendations"
      ]
    }
  ];

  const advisoryServices = [
    "Crop Nutrition Management",
    "Integrated Pest Management",
    "Soil Health Strategies",
    "Water Management",
    "Farm Input Recommendations",
    "Certification Support",
    "Farm Audits",
    "Problem Solving"
  ];

  const process = [
    { step: "1", title: "Sample Collection", desc: "Follow guidelines or request pickup" },
    { step: "2", title: "Lab Analysis", desc: "Certified testing methods" },
    { step: "3", title: "Results Report", desc: "Detailed interpretations" },
    { step: "4", title: "Advisory", desc: "Expert recommendations" }
  ];

  return (
    <>
      <SEO 
        title="Analytical & Advisory Services"
        description="Professional laboratory analysis and expert advisory services for soil testing, water quality, and pesticide residue analysis in Kenya."
        keywords="soil testing Kenya, water quality testing, pesticide residue analysis, agricultural laboratory, farm advisory services"
      />

      <div className="bg-white">
        {/* Hero Section - Clean */}
        <section className="bg-white border-b-2 border-gray-200 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Laboratory Services
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Analytical & Advisory Services
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Professional laboratory analysis and expert recommendations to optimize your agricultural operations.
            </p>
          </div>
        </section>

        {/* Laboratory Services - Simplified Cards */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Link
                  key={index}
                  to={`/analytical/${service.slug}`}
                  className="block bg-white rounded-2xl border border-gray-200 p-8 hover:border-emerald-200 hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <div className="mb-6">
                    {service.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    {service.title}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="inline-flex items-center gap-2 text-emerald-700 font-semibold">
                    Learn more <FaArrowRight className="w-4 h-4" />
                  </div>

                  {/* 
                    ✅ Intentionally hidden for now (launch later).
                    Tests remain in code internally, but not shown to users yet.
                  */}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Process - Streamlined */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                How It Works
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Simple process from sample to solution
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-14 h-14 bg-emerald-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Advisory Services - Compact Grid */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <FaClipboardCheck className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Advisory Support
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto mb-3">
                Expert recommendations and ongoing support for your farm
              </p>
              <div className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                Coming Soon
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {advisoryServices.map((service, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-emerald-200 transition-all text-center">
                  <p className="font-medium text-gray-800 text-sm">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA - Minimal */}
        <section className="py-20 px-4 bg-white border-t border-gray-200">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Request Laboratory Services
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Get accurate analysis and expert recommendations for your farm
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
            >
              Contact Us <FaArrowRight />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default AnalyticalServices;
