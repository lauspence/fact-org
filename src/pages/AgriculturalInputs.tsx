import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';

const AgriculturalInputs = () => {
  const categories = [
    {
      title: "Smart Technology",
      description: "Innovative IoT solutions and tools for modern farming efficiency.",
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
      items: [
        "Drip irrigation installation",
        "Hydrogels",
        "Dam liners",
        "Sprinklers",
        "Venturi injectors (fertilize & irrigate)"
      ]
    }
  ];

  const features = [
    {
      emoji: "✓",
      title: "Quality Assured",
      description: "Certified and tested products"
    },
    {
      emoji: "💡",
      title: "Expert Guidance",
      description: "Installation support and advisory services"
    },
    {
      emoji: "🚚",
      title: "Complete Service",
      description: "Post sales services"
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
        <section className="bg-white border-b border-gray-200 py-16 px-4">
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
        <section className="py-16 md:py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl border border-gray-200 p-6 md:p-8 hover:border-emerald-300 hover:shadow-lg transition-all"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-900">{category.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed text-sm md:text-base">{category.description}</p>
                  
                  <ul className="space-y-2.5 mb-6">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-sm text-gray-700">
                        <span className="text-emerald-600 mr-2 mt-0.5 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/marketplace"
                    className="inline-block text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors text-sm"
                  >
                    View Products →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Why Choose Our Inputs?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive support from selection to installation and beyond
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">{feature.emoji}</span>
                  </div>
                  <h3 className="font-bold mb-2 text-gray-900 text-lg">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Info Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-white border border-emerald-200 rounded-xl p-6 md:p-8 border-l-4 border-l-emerald-600">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Complete Agricultural Solutions
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Beyond providing quality inputs, we offer comprehensive support including technical advisory, installation services, 
                and ongoing consultation to ensure you get the most out of your investment.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our team of agricultural experts is ready to help you select the right products for your specific needs, 
                climate conditions, and farming goals. We believe in building long-term partnerships with our clients.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
          <div className="container mx-auto max-w-3xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Order?
            </h2>
            <p className="text-lg md:text-xl text-emerald-100 mb-8">
              Contact us for pricing, availability, and delivery options
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-white text-emerald-700 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg"
              >
                Contact Us →
              </Link>
              <Link
                to="/marketplace"
                className="inline-block bg-emerald-700 text-white px-8 py-3 rounded-lg font-bold hover:bg-emerald-800 transition-colors border-2 border-white/30"
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
