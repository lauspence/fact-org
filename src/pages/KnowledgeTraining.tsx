import { FaBook, FaVideo, FaChalkboardTeacher, FaUsers, FaLeaf, FaBriefcase } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const KnowledgeTraining = () => {
  const targetAudiences = [
    {
      title: "Youth",
      description: "Agripreneurship programs and skills development for young people entering agriculture.",
      icon: <FaUsers className="w-12 h-12 text-emerald-600" />
    },
    {
      title: "Farmers",
      description: "Practical training on modern farming techniques and sustainable practices.",
      icon: <FaLeaf className="w-12 h-12 text-emerald-600" />
    },
    {
      title: "Entrepreneurs",
      description: "Business development and value chain integration for agribusiness ventures.",
      icon: <FaBriefcase className="w-12 h-12 text-emerald-600" />
    }
  ];

  const trainingTopics = [
    "Value Addition & Post-Harvest Handling",
    "Business Planning & Financial Management",
    "Climate-Smart Agriculture",
    "Organic Farming Certification",
    "Market Linkage & Value Chains",
    "Integrated Pest Management",
    "Water Management & Irrigation",
    "Soil Health & Nutrition Management"
  ];

  const trainingFormats = [
    {
      title: "Workshops & Seminars",
      description: "Interactive in-person sessions with hands-on learning experiences.",
      icon: <FaChalkboardTeacher className="w-10 h-10 text-emerald-600" />
    },
    {
      title: "Information Resources",
      description: "Downloadable guides, manuals, and digital publications (free & paid).",
      icon: <FaBook className="w-10 h-10 text-emerald-600" />
    },
    {
      title: "Video Demonstrations",
      description: "Step-by-step visual guides and expert demonstrations for practical application.",
      icon: <FaVideo className="w-10 h-10 text-emerald-600" />
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Knowledge & Training</h1>
          <p className="text-xl text-emerald-50">
            Empowering communities through comprehensive agricultural training and knowledge resources.
          </p>
        </div>
      </section>

      {/* Target Audiences */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Who We Train
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Our programs are designed for diverse groups seeking to enhance their agricultural knowledge and skills.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {targetAudiences.map((audience, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">{audience.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{audience.title}</h3>
                <p className="text-gray-600">{audience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Topics */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Training Topics
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Comprehensive curriculum covering essential agricultural practices and business skills.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingTopics.map((topic, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-emerald-600 hover:bg-emerald-50 transition-all">
                <p className="font-semibold text-gray-800">{topic}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Formats */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            How We Deliver
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Flexible training delivery methods to suit different learning preferences and needs.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {trainingFormats.map((format, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all">
                <div className="flex justify-center mb-4">{format.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-center text-gray-900">{format.title}</h3>
                <p className="text-gray-600 text-center">{format.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Join our training programs and transform your agricultural knowledge and skills.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default KnowledgeTraining;
