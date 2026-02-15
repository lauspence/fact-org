import { FaBook, FaVideo, FaChalkboardTeacher, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';


const KnowledgeTraining = () => {
  const courseCategories = [
    {
      title: "Livestock Production",
      courses: [
        "Livestock production",
        "Dairy cattle management",
        "Chicken production",
        "Pig production",
        "Fish production",
        "Bee keeping"
      ]
    },
    {
      title: "Horticultural Crops",
      courses: [
        "Fruits production (avocado, banana, mango, passion, etc)",
        "Vegetable farming (exotic and African leafy vegetables)",
        "Greenhouse tomato farming",
        "Exotic fruits (apples, berries, dragon fruit, lychee)",
        "Herbs and spices",
        "Medicinal plants"
      ]
    },
    {
      title: "Greenhouse Systems",
      courses: [
        "Greenhouse construction",
        "Crops production and management",
        "Water & plant nutrition",
        "Automated monitoring systems"
      ]
    },
    {
      title: "Agribusiness Development",
      courses: [
        "Business planning",
        "Value chain analysis",
        "Product development",
        "Market analysis",
        "Agro-tourism"
      ]
    }
  ];


  const trainingFormats = [
    {
      title: "Workshops & Seminars",
      description: "Interactive in-person sessions with hands-on learning.",
      icon: <FaChalkboardTeacher className="w-12 h-12 text-gray-700" />
    },
    {
      title: "Information Resources",
      description: "Downloadable guides, manuals, and publications.",
      icon: <FaBook className="w-12 h-12 text-gray-700" />
    },
    {
      title: "Video Demonstrations",
      description: "Step-by-step visual guides and expert demos.",
      icon: <FaVideo className="w-12 h-12 text-gray-700" />
    },
    {
      title: "Hands-on Demonstration",
      description: "Practical field demonstrations for selected topics.",
      icon: <FaCheckCircle className="w-12 h-12 text-gray-700" />
    }
  ];


  return (
    <>
      <SEO 
        title="Knowledge & Training"
        description="Comprehensive agricultural training programs in livestock, horticulture, greenhouse systems, and agribusiness development. Practical courses for farmers, youth, and entrepreneurs in Kenya."
        keywords="agricultural training Kenya, livestock production, greenhouse farming, agribusiness training, farming courses Kenya"
      />


      <div className="bg-gray-50">
        {/* Hero Section */}
        <section className="bg-white border-b-2 border-gray-200 py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Knowledge & Training
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Empowering communities through comprehensive agricultural training and knowledge resources.
            </p>
          </div>
        </section>


        {/* Training Courses */}
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
              Our Training Programs
            </h2>


            <div className="grid md:grid-cols-2 gap-8">
              {courseCategories.map((category, index) => (
                <div key={index} className="bg-white rounded-xl border border-gray-200 p-8 hover:border-gray-300 hover:shadow-lg transition-all">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">
                    {category.title}
                  </h3>
                  <ul className="space-y-3">
                    {category.courses.map((course, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <FaCheckCircle className="text-gray-600 mr-3 mt-1 flex-shrink-0" />
                        <span>{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>


            {/* Custom Training Callout */}
            <div className="bg-gray-100 border-l-4 border-gray-800 p-6 rounded-lg mt-12 max-w-4xl mx-auto">
              <p className="text-gray-800 text-lg">
                <strong className="text-gray-900">Custom Training Available:</strong> All courses can be tailored to meet your specific needs. 
                <Link to="/contact" className="text-gray-900 font-semibold hover:underline ml-1">
                  Contact us →
                </Link>
              </p>
            </div>
          </div>
        </section>


        {/* Training Delivery */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              How We Train
            </h2>
            <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
              Flexible delivery methods to suit your learning style
            </p>


            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
              {trainingFormats.map((format, index) => (
                <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
                  <div className="flex justify-center mb-4">{format.icon}</div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{format.title}</h3>
                  <p className="text-gray-600">{format.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-10 text-gray-300">
              Join our training programs and enhance your farming and agribusiness skills
            </p>
            <Link
              to="/contact"
              className="inline-block bg-white text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Enroll Now
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};


export default KnowledgeTraining;
