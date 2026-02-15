import { FaMicrochip, FaTools, FaSeedling, FaLeaf, FaShieldAlt, FaTint, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';


const AgriculturalInputs = () => {
  const categories = [
    {
      title: "Smart Technology",
      description: "Innovative IoT solutions and tools for modern farming efficiency.",
      icon: <FaMicrochip className="w-10 h-10 text-emerald-600" />,
      items: [
        "Soil Moisture Sensors",
        "Weather Stations",
        "Irrigation Controllers",
        "Drone Solutions"
      ]
    },
    {
      title: "Farm Tools & Equipment",
      description: "Quality equipment and machinery for enhanced productivity.",
      icon: <FaTools className="w-10 h-10 text-emerald-600" />,
      items: [
        "Hand Tools (Hoes, spades, pruning shears)",
        "Mechanized Equipment (Tillers, harvesters)",
        "Post-Harvest Equipment",
        "Irrigation Systems"
      ]
    },
    {
      title: "Planting Materials",
      description: "High-quality seedlings and certified propagation materials.",
      icon: <FaSeedling className="w-10 h-10 text-emerald-600" />,
      items: [
        "Certified Seeds (High-yield varieties)",
        "Grafted Fruit Seedlings",
        "Tissue Culture Plants",
        "Organic Bio-inputs"
      ]
    },
    {
      title: "Plant Nutrition Products",
      description: "Comprehensive nutrition solutions for optimal plant growth and health.",
      icon: <FaLeaf className="w-10 h-10 text-emerald-600" />,
      items: [
        "Fertilisers",
        "Plant hormones",
        "Microbials",
        "Biostimulants",
        "Soil conditioners"
      ]
    },
    {
      title: "Pest Control Solutions",
      description: "Advanced and eco-friendly pest management technologies.",
      icon: <FaShieldAlt className="w-10 h-10 text-emerald-600" />,
      items: [
        "Biopesticides",
        "AI aided pest detection",
        "Insect traps",
        "Pheromone lures",
        "Nano-based pesticides",
        "Safe synthetics"
      ]
    },
    {
      title: "Irrigation Products and Services",
      description: "Complete water management solutions for efficient irrigation.",
      icon: <FaTint className="w-10 h-10 text-emerald-600" />,
      items: [
        "Drip irrigation installation",
        "Hydrogels",
        "Dam liners",
        "Sprinklers",
        "Venturi injectors (fertilize & irrigate)"
      ]
    }
  ];


  return (
    <>
      <SEO 
        title="Agricultural Inputs"
        description="Quality agricultural inputs, modern technology, and expert guidance. Smart farming tools, equipment, seeds, planting materials, plant nutrition, pest control, and irrigation products in Kenya."
        keywords="agricultural inputs Kenya, farm equipment Kenya, certified seeds, smart farming technology, irrigation equipment, farm tools Kenya, plant nutrition, pest control, fertilizers Kenya"
      />


      <div className="bg-white">
        {/* Hero Section */}
        <section className="bg-white border-b-2 border-gray-200 py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              Quality Inputs
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Agricultural Inputs
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quality inputs, modern technology, and expert guidance to maximise your farming and agribusiness success.
            </p>
          </div>
        </section>


        {/* Categories - Clean Cards */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category, index) => (
                <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:border-emerald-200 hover:shadow-lg transition-all">
                  <div className="mb-6">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{category.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{category.description}</p>
                  
                  <ul className="space-y-2.5">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="text-emerald-600 mr-2 mt-0.5">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>


                  <Link
                    to="/marketplace"
                    className="inline-flex items-center gap-2 mt-6 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors text-sm"
                  >
                    View Products <FaArrowRight className="text-xs" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* Features */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Why Choose Our Inputs?
              </h2>
            </div>


            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✓</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Quality Assured</h3>
                <p className="text-gray-600 text-sm">Certified and tested products</p>
              </div>


              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Expert Guidance</h3>
                <p className="text-gray-600 text-sm">Installation support and advisory services</p>
              </div>


              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="font-bold mb-2 text-gray-900">Complete Service</h3>
                <p className="text-gray-600 text-sm">Delivery, installation support, and post sales services</p>
              </div>
            </div>
          </div>
        </section>


        {/* CTA */}
        <section className="py-20 px-4 bg-emerald-600 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg text-emerald-100 mb-8">
              Contact us for pricing, availability, and delivery options
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Contact Us <FaArrowRight />
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center justify-center gap-2 bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-800 transition-colors border border-white/20"
              >
                Browse Marketplace
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};


export default AgriculturalInputs;
