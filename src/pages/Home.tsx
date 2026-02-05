import { Link } from 'react-router-dom';
import { FaGraduationCap, FaTractor, FaHandshake, FaMicroscope } from 'react-icons/fa';
import { services } from '../data/services';
import type { ReactElement } from 'react';

const iconMap: Record<string, ReactElement> = {
  FaGraduationCap: <FaGraduationCap className="w-16 h-16 text-emerald-600" />,
  FaTractor: <FaTractor className="w-16 h-16 text-emerald-600" />,
  FaHandshake: <FaHandshake className="w-16 h-16 text-emerald-600" />,
  FaMicroscope: <FaMicroscope className="w-16 h-16 text-emerald-600" />,
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-32 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Farming and Community Training Limited
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-emerald-50 leading-relaxed">
            Empowering communities through sustainable agriculture, innovative training, 
            and comprehensive support services.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-yellow-400 text-gray-900 px-10 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4 text-gray-900">
            Our Core Services
          </h2>
          <p className="text-center text-gray-600 mb-16 text-base md:text-lg max-w-3xl mx-auto">
            Comprehensive solutions tailored to farmers, entrepreneurs, and agricultural professionals.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col transform hover:-translate-y-2 border border-gray-100"
              >
                {/* Card Content */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Icon */}
                  <div className="flex justify-center mb-5">
                    {iconMap[service.icon]}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-center text-gray-900">
                    {service.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-5 text-center leading-relaxed flex-grow">
                    {service.description}
                  </p>
                  
                  {/* Features List */}
                  <ul className="mb-6 space-y-2 text-left">
                    {service.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-700 flex items-start">
                        <span className="text-emerald-600 mr-2 font-bold text-lg">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Button at bottom */}
                <div className="p-6 pt-0">
                  <Link
                    to={service.link}
                    className="block w-full text-center bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-all font-semibold shadow hover:shadow-lg"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
