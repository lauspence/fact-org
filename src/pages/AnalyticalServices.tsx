import { FaFlask, FaTint, FaLeaf, FaMicroscope, FaCheckCircle, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AnalyticalServices = () => {
  const services = [
    {
      title: "Soil Analysis",
      icon: <FaFlask className="w-16 h-16 text-emerald-600" />,
      description: "Comprehensive soil testing for optimal crop nutrition and productivity.",
      tests: [
        { name: "NPK Analysis", desc: "Nitrogen, Phosphorus, Potassium levels" },
        { name: "Micronutrient Testing", desc: "Iron, Zinc, Copper, Manganese, Boron" },
        { name: "pH & EC Testing", desc: "Soil acidity and electrical conductivity" },
        { name: "Organic Matter", desc: "Soil organic carbon content" },
        { name: "Heavy Metal Screening", desc: "Safety and contamination assessment" }
      ]
    },
    {
      title: "Water Testing",
      icon: <FaTint className="w-16 h-16 text-emerald-600" />,
      description: "Water quality assessment for safe irrigation and consumption.",
      tests: [
        { name: "Physical Parameters", desc: "pH, TDS, turbidity, temperature" },
        { name: "Chemical Analysis", desc: "Nitrates, phosphates, chlorides" },
        { name: "Microbial Testing", desc: "E.coli, coliform bacteria" },
        { name: "Salinity Testing", desc: "Sodium, calcium, magnesium ions" },
        { name: "Heavy Metals", desc: "Lead, cadmium, arsenic detection" }
      ]
    },
    {
      title: "Pesticide Residue Analysis",
      icon: <FaLeaf className="w-16 h-16 text-emerald-600" />,
      description: "Detection of pesticide residues for food safety and export compliance.",
      tests: [
        { name: "Multi-Residue Screening", desc: "Detection of 200+ pesticides" },
        { name: "MRL Compliance", desc: "Maximum Residue Level verification" },
        { name: "Organic Certification", desc: "Support for organic farming certification" },
        { name: "Export Compliance", desc: "EU, US, and regional standards" },
        { name: "Safety Recommendations", desc: "Pre-harvest interval guidance" }
      ]
    }
  ];

  const advisoryServices = [
    "Crop Nutrition Management Plans",
    "Integrated Pest Management (IPM)",
    "Soil Health Improvement Strategies",
    "Water Management Optimization",
    "Farm Input Recommendations",
    "Certification Support (Organic, GAP)",
    "Farm Audits & Assessments",
    "Agronomic Problem Solving"
  ];

  const process = [
    { step: "1", title: "Sample Collection", desc: "Follow our guidelines or request collection service" },
    { step: "2", title: "Laboratory Analysis", desc: "Samples tested using certified methods" },
    { step: "3", title: "Results & Report", desc: "Detailed report with interpretations" },
    { step: "4", title: "Advisory Support", desc: "Expert recommendations and action plans" }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Analytical & Advisory Services</h1>
          <p className="text-xl text-emerald-50">
            Professional laboratory analysis and expert advisory to optimize your agricultural operations.
          </p>
        </div>
      </section>

      {/* Laboratory Services */}
      {services.map((service, serviceIndex) => (
        <section key={serviceIndex} className={`py-16 px-4 ${serviceIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{service.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">{service.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.tests.map((test, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all border-l-4 border-emerald-600">
                  <div className="flex items-start mb-3">
                    <FaMicroscope className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <h3 className="text-lg font-bold text-gray-900">{test.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{test.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Advisory Services */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <FaClipboardCheck className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Advisory Support</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Beyond laboratory testing, our experts provide actionable recommendations and ongoing support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {advisoryServices.map((service, index) => (
              <div key={index} className="bg-emerald-50 rounded-lg p-6 border-l-4 border-emerald-600 hover:bg-emerald-100 transition-all">
                <div className="flex items-start">
                  <FaCheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="font-semibold text-gray-800">{service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            How It Works
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Simple, reliable process from sample to solution.
          </p>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-all">
                  <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <div className="w-8 h-0.5 bg-emerald-600"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Request Laboratory Services</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Get accurate analysis and expert recommendations for your farm.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AnalyticalServices;
