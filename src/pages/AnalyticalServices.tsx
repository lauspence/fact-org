import { FaFlask, FaTint, FaLeaf } from 'react-icons/fa';

const AnalyticalServices = () => {
  const services = [
    {
      title: "Soil Analysis",
      icon: <FaFlask className="text-5xl text-emerald-600" />,
      description: "Comprehensive soil testing for nutrient levels, pH, and composition.",
      tests: ["NPK analysis", "Micronutrient testing", "Heavy metal screening", "Organic matter content"]
    },
    {
      title: "Water Testing",
      icon: <FaTint className="text-5xl text-emerald-600" />,
      description: "Water quality assessment for irrigation and consumption.",
      tests: ["pH and TDS", "Microbial analysis", "Chemical contaminants", "Salinity testing"]
    },
    {
      title: "Pesticide Analysis",
      icon: <FaLeaf className="text-5xl text-emerald-600" />,
      description: "Detection of pesticide residues and recommendations.",
      tests: ["Residue detection", "Compliance testing", "Safety recommendations", "Organic certification support"]
    }
  ];

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-[#2C3E50]">Analytical & Advisory Services</h1>
        
        <p className="text-lg text-gray-700 mb-12 max-w-3xl">
          Professional laboratory analysis and expert advisory services to optimize your agricultural operations.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition">
              <div className="flex justify-center mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-center">{service.title}</h3>
              <p className="text-gray-700 mb-4 text-center text-sm">{service.description}</p>
              <div className="border-t pt-4">
                <h4 className="font-semibold mb-2 text-sm">Services Include:</h4>
                <ul className="space-y-1">
                  {service.tests.map((test, idx) => (
                    <li key={idx} className="text-sm text-gray-600">• {test}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Advisory Support</h2>
          <p className="text-gray-700 mb-4">
            Beyond laboratory testing, we provide expert advisory services including:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <ul className="space-y-2 text-gray-700">
              <li>• Crop nutrition management</li>
              <li>• Integrated pest management</li>
              <li>• Soil health improvement strategies</li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li>• Water management optimization</li>
              <li>• Certification support (organic, GAP)</li>
              <li>• Farm audits and assessments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticalServices;
