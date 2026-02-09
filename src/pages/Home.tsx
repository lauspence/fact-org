import { Link } from 'react-router-dom';
import { FaGraduationCap, FaTractor, FaHandshake, FaMicroscope, FaUsers, FaLeaf, FaSeedling } from 'react-icons/fa';
import { services } from '../data/services';
import type { ReactElement } from 'react';
import SEO from '../components/common/SEO';

const iconMap: Record<string, ReactElement> = {
  FaGraduationCap: <FaGraduationCap className="w-16 h-16 text-emerald-600" />,
  FaTractor: <FaTractor className="w-16 h-16 text-emerald-600" />,
  FaHandshake: <FaHandshake className="w-16 h-16 text-emerald-600" />,
  FaMicroscope: <FaMicroscope className="w-16 h-16 text-emerald-600" />,
};

const Home = () => {
  return (
    <>
      <SEO 
        title="Home"
        description="F.a.C.T LTD - Empowering farming communities through sustainable agriculture, innovative training, and comprehensive support services across Kenya. Expert agricultural training, quality inputs, and advisory services."
        keywords="farming Kenya, agricultural training, agribusiness Kenya, farm inputs, soil testing Kenya, agricultural services, climate-smart agriculture, farm technology Kenya"
        image="/images/hero-bg.jpg"
      />

      <div>
        {/* Hero Section - No lazy loading (above fold) */}
        <section 
          className="relative bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white py-32 px-4"
          style={{
            backgroundImage: 'linear-gradient(rgba(5, 150, 105, 0.85), rgba(13, 148, 136, 0.85)), url(/images/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'multiply'
          }}
        >
          <div className="container mx-auto text-center max-w-4xl relative z-10">
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
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-center mb-5">
                      {iconMap[service.icon]}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 text-center leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <ul className="mb-6 space-y-2 text-left">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-emerald-600 mr-2 font-bold text-lg">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
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

        {/* Training Section - WITH LAZY LOADING */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Transforming Agriculture Through Knowledge
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  We combine traditional wisdom with modern technology to deliver practical, 
                  sustainable solutions that empower farming communities across Kenya.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  From hands-on training to cutting-edge analytical services, we're committed 
                  to building a thriving agricultural sector for future generations.
                </p>
                <Link
                  to="/about"
                  className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all"
                >
                  Learn More About Us
                </Link>
              </div>

              <div className="relative">
                <img 
                  src="/images/training.jpg" 
                  alt="Agricultural training session with Kenyan farmers"
                  width="1200"
                  height="800"
                  loading="lazy"
                  className="rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Work in Action - WITH LAZY LOADING */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
              Our Work in Action
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
              Supporting Kenyan farmers with training, technology, and sustainable practices.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/images/community1.jpg"
                  alt="F.a.C.T community training session"
                  width="800"
                  height="600"
                  loading="lazy"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center text-white">
                    <FaUsers className="text-2xl mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">Community Empowerment</h3>
                      <p className="text-sm text-gray-200">Training farmers across Kenya</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/images/farming1.jpg"
                  alt="Sustainable farming practices in Kenya"
                  width="800"
                  height="600"
                  loading="lazy"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center text-white">
                    <FaLeaf className="text-2xl mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">Sustainable Practices</h3>
                      <p className="text-sm text-gray-200">Climate-smart agriculture</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl shadow-lg group">
                <img 
                  src="/images/harvest1.jpg"
                  alt="Kenyan farmers with quality harvest"
                  width="800"
                  height="600"
                  loading="lazy"
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center text-white">
                    <FaSeedling className="text-2xl mr-3" />
                    <div>
                      <h3 className="font-bold text-lg">Quality Yields</h3>
                      <p className="text-sm text-gray-200">Improved crop production</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Farming Section - WITH LAZY LOADING */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <img 
                  src="/images/technology.jpg" 
                  alt="Modern agricultural technology in Kenya"
                  width="1200"
                  height="800"
                  loading="lazy"
                  className="rounded-xl shadow-2xl w-full h-auto object-cover"
                />
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Embracing Modern Agricultural Technology
                </h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  Access cutting-edge tools, smart technology, and quality inputs that enhance 
                  productivity and profitability for farmers of all scales.
                </p>
                <p className="text-gray-700 leading-relaxed mb-8">
                  Our comprehensive range of agricultural inputs includes precision farming tools, 
                  certified seeds, and expert guidance on implementation.
                </p>
                <Link
                  to="/agricultural-inputs"
                  className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-all"
                >
                  Explore Our Products
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Youth & Innovation - WITH LAZY LOADING */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/images/youth.jpg"
                  alt="Youth in agriculture program Kenya"
                  width="800"
                  height="600"
                  loading="lazy"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/90 via-emerald-900/50 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-3">Youth in Agriculture</h3>
                    <p className="text-emerald-100 mb-4">
                      Empowering the next generation of farmers with modern skills and entrepreneurial mindset.
                    </p>
                    <Link 
                      to="/enterprise-building"
                      className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="/images/innovation.jpg"
                  alt="Smart farming solutions Kenya"
                  width="800"
                  height="600"
                  loading="lazy"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/50 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <h3 className="text-2xl font-bold mb-3">Smart Farming Solutions</h3>
                    <p className="text-teal-100 mb-4">
                      Integrating technology and data-driven insights for better farm management and productivity.
                    </p>
                    <Link 
                      to="/analytical-services"
                      className="inline-block bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-yellow-300 transition-all"
                    >
                      Discover Services
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Background image (lazy loaded via CSS) */}
        <section 
          className="relative py-20 px-4 text-white"
        >
          <div className="container mx-auto max-w-6xl relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Our Impact in Numbers
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">500+</div>
                <p className="text-emerald-100">Farmers Trained</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">50+</div>
                <p className="text-emerald-100">Training Programs</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100+</div>
                <p className="text-emerald-100">Partnerships</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">10+</div>
                <p className="text-emerald-100">Counties Reached</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Banner - WITH LAZY LOADING */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src="/images/community-banner.jpg"
            alt="F.a.C.T farming community working together in Kenya"
            width="1920"
            height="600"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white px-4">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Building Resilient Farming Communities
              </h2>
              <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                Together, we're creating sustainable livelihoods and food security across Kenya
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
              Join hundreds of farmers who have improved their yields, incomes, and sustainability 
              through our training and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/knowledge-training"
                className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-all shadow-lg"
              >
                Explore Training Programs
              </Link>
              <Link
                to="/contact"
                className="inline-block bg-gray-200 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-300 transition-all"
              >
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
