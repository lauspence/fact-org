import { FaMicrochip, FaTools, FaSeedling, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const AgriculturalInputs = () => {
  const categories = [
    {
      title: "Smart Technology",
      description: "Innovative IoT solutions and tools for modern farming efficiency.",
      icon: <FaMicrochip className="w-16 h-16 text-emerald-600" />,
      items: [
        { name: "Soil Moisture Sensors", desc: "Monitor soil conditions in real-time" },
        { name: "Weather Stations", desc: "Accurate microclimate monitoring" },
        { name: "Irrigation Controllers", desc: "Automated water management systems" },
        { name: "Drone Solutions", desc: "Aerial monitoring and spraying" }
      ]
    },
    {
      title: "Farm Tools",
      description: "Quality equipment and machinery for enhanced productivity.",
      icon: <FaTools className="w-16 h-16 text-emerald-600" />,
      items: [
        { name: "Hand Tools", desc: "Hoes, spades, pruning shears" },
        { name: "Mechanized Equipment", desc: "Tillers, harvesters, planters" },
        { name: "Post-Harvest Tools", desc: "Drying, sorting, packaging equipment" },
        { name: "Irrigation Equipment", desc: "Pumps, pipes, drip systems" }
      ]
    },
    {
      title: "Planting Materials",
      description: "High-quality seedlings and certified propagation materials.",
      icon: <FaSeedling className="w-16 h-16 text-emerald-600" />,
      items: [
        { name: "Certified Seeds", desc: "High-yield, disease-resistant varieties" },
        { name: "Grafted Seedlings", desc: "Fruit trees and horticultural crops" },
        { name: "Tissue Culture Plants", desc: "Disease-free plantlets" },
        { name: "Organic Inputs", desc: "Bio-fertilizers and pest control" }
      ]
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Agricultural Inputs</h1>
          <p className="text-xl text-emerald-50">
            Quality inputs, modern technology, and expert guidance to maximize your farming success.
          </p>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, catIndex) => (
        <section key={catIndex} className={`py-16 px-4 ${catIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">{category.icon}</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{category.title}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">{category.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {category.items.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-all border-l-4 border-emerald-600">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.desc}</p>
                  <button className="text-emerald-600 font-semibold hover:text-emerald-700 flex items-center">
                    <FaShoppingCart className="mr-2" /> 
                    Learn More
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* How to Purchase */}
      <section className="py-16 px-4 bg-emerald-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">How to Purchase</h2>
          <p className="text-xl mb-8 text-emerald-50">
            Contact us for pricing, availability, and delivery options. We offer guidance on selecting the right inputs for your needs.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg"
          >
            Get in Touch
          </Link>
          <p className="mt-6 text-sm text-emerald-100">
            *E-commerce functionality coming soon for online purchases
          </p>
        </div>
      </section>
    </div>
  );
};

export default AgriculturalInputs;
