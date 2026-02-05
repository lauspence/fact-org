import { FaBriefcase, FaUsers, FaChartLine, FaHandshake, FaLightbulb, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const EnterpriseBuilding = () => {
  const services = [
    {
      icon: <FaLightbulb className="w-12 h-12 text-emerald-600" />,
      title: "Business Planning",
      description: "Comprehensive business plan development, feasibility studies, and strategic planning for agricultural ventures."
    },
    {
      icon: <FaChartLine className="w-12 h-12 text-emerald-600" />,
      title: "Market Linkage",
      description: "Connecting farmers and agribusinesses with buyers, processors, and value chain actors for sustainable growth."
    },
    {
      icon: <FaBriefcase className="w-12 h-12 text-emerald-600" />,
      title: "Financial Management",
      description: "Training on bookkeeping, financial planning, cost management, and accessing agricultural finance."
    },
    {
      icon: <FaHandshake className="w-12 h-12 text-emerald-600" />,
      title: "Partnership Development",
      description: "Facilitating strategic partnerships with corporates, institutions, and development organizations."
    }
  ];

  const youthPrograms = [
    "Agripreneurship Training",
    "Start-up Incubation & Mentorship",
    "Skills Development Workshops",
    "Access to Finance & Grants",
    "Peer Learning Networks",
    "Leadership Development"
  ];

  const successStories = [
    {
      name: "Youth Agripreneur Group",
      achievement: "30 young farmers established successful vegetable enterprises",
      impact: "Generated over KES 2M in annual revenue"
    },
    {
      name: "Women's Cooperative",
      achievement: "Value addition training led to 200% income increase",
      impact: "Created 50+ jobs in the local community"
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Enterprise Building & Sector Development</h1>
          <p className="text-xl text-emerald-50">
            Building sustainable agricultural businesses and strengthening value chains for lasting impact.
          </p>
        </div>
      </section>

      {/* Business Support Services */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Business Support Services
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Comprehensive support to help you build and grow your agricultural enterprise.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all">
                <div className="flex items-start">
                  <div className="mr-6 flex-shrink-0">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Youth Engagement */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <FaUsers className="w-12 h-12 text-emerald-600 mr-4" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Youth Engagement</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                We are committed to engaging youth in agriculture through innovative programs that 
                transform farming into an attractive and profitable career option.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Our youth programs combine practical training, mentorship, access to resources, and 
                peer networks to support young agripreneurs in building successful enterprises.
              </p>
            </div>

            <div className="bg-emerald-50 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6 text-gray-900">Youth Program Components</h3>
              <ul className="space-y-3">
                {youthPrograms.map((program, index) => (
                  <li key={index} className="flex items-start">
                    <FaRocket className="text-emerald-600 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{program}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Success Stories
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Real impact from our enterprise building programs.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-8 border-l-4 border-emerald-600">
                <h3 className="text-xl font-bold mb-3 text-emerald-600">{story.name}</h3>
                <p className="text-gray-700 mb-4">{story.achievement}</p>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gray-900">Impact: {story.impact}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Your Enterprise?</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Partner with us to transform your agricultural business idea into a thriving reality.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg"
          >
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EnterpriseBuilding;
