import { Link } from 'react-router-dom';
import { FaGraduationCap, FaTractor, FaHandshake, FaMicroscope, FaUsers, FaLeaf, FaSeedling, FaArrowRight } from 'react-icons/fa';
import { services } from '../data/services';
import type { ReactElement } from 'react';
import SEO from '../components/common/SEO';

const iconMap: Record<string, ReactElement> = {
  FaGraduationCap: <FaGraduationCap className="w-12 h-12 text-emerald-600" />,
  FaTractor: <FaTractor className="w-12 h-12 text-emerald-600" />,
  FaHandshake: <FaHandshake className="w-12 h-12 text-emerald-600" />,
  FaMicroscope: <FaMicroscope className="w-12 h-12 text-emerald-600" />,
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
        {/* Hero Section - With Background Image */}
        <section className="relative text-white py-20 md:py-32 px-4 overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-bg.jpg" 
              alt="Kenyan farmers working in agricultural field"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/60 via-emerald-800/50 to-emerald-900/60"></div>

          </div>

          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 z-[1] opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30 shadow-lg">
                Empowering Kenya's Agricultural Future
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
              Farming and Community<br />Training Limited
            </h1>
            <p className="text-lg md:text-xl mb-10 text-white leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              Transforming agriculture through sustainable practices, expert training, 
              and innovative solutions for modern farmers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-emerald-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-all shadow-xl hover:shadow-2xl hover:scale-105"
              >
                Get Started <FaArrowRight className="text-sm" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all border-2 border-white/30 shadow-lg"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section - Card Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Our Core Services
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Comprehensive solutions tailored to farmers, entrepreneurs, and agricultural professionals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl border border-gray-200 hover:border-emerald-200 hover:shadow-xl transition-all duration-200 overflow-hidden flex flex-col group"
                >
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                      {iconMap[service.icon]}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-center text-gray-900">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 text-center leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <ul className="mb-6 space-y-2.5 text-left">
                      {service.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-start">
                          <span className="text-emerald-600 mr-2 text-base">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      to={service.link}
                      className="flex items-center justify-center gap-2 w-full text-center bg-gray-900 text-white py-3 rounded-lg hover:bg-emerald-600 transition-colors font-semibold"
                    >
                      Learn More <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Section - Two Column Layout */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Our Approach
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Transforming Agriculture Through Knowledge
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  We combine traditional wisdom with modern technology to deliver practical, 
                  sustainable solutions that empower farming communities across Kenya.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  From hands-on training to cutting-edge analytical services, we're committed 
                  to building a thriving agricultural sector for future generations.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Learn More About Us <FaArrowRight className="text-xs" />
                </Link>
              </div>

              <div className="relative">
                <img 
                  src="/images/training.jpg" 
                  alt="Agricultural training session with Kenyan farmers"
                  width="600"
                  height="400"
                  loading="lazy"
                  className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Work in Action - Image Cards */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                Our Work in Action
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Supporting Kenyan farmers with training, technology, and sustainable practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-80">
                <img 
                  src="/images/community1.jpg"
                  alt="F.a.C.T community training session"
                  width="600"
                  height="400"
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="flex items-center mb-2">
                      <FaUsers className="text-xl mr-2" />
                      <span className="text-sm font-semibold uppercase tracking-wider">Community</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">Community Empowerment</h3>
                    <p className="text-sm text-gray-300">Training farmers across Kenya</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-80">
                <img 
                  src="/images/farming1.jpg"
                  alt="Sustainable farming practices in Kenya"
                  width="600"
                  height="400"
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="flex items-center mb-2">
                      <FaLeaf className="text-xl mr-2" />
                      <span className="text-sm font-semibold uppercase tracking-wider">Sustainability</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">Sustainable Practices</h3>
                    <p className="text-sm text-gray-300">Climate-smart agriculture</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl shadow-lg group h-80">
                <img 
                  src="/images/harvest1.jpg"
                  alt="Kenyan farmers with quality harvest"
                  width="600"
                  height="400"
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent flex items-end p-6">
                  <div className="text-white">
                    <div className="flex items-center mb-2">
                      <FaSeedling className="text-xl mr-2" />
                      <span className="text-sm font-semibold uppercase tracking-wider">Results</span>
                    </div>
                    <h3 className="font-bold text-xl mb-1">Quality Yields</h3>
                    <p className="text-sm text-gray-300">Improved crop production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Farming Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 md:order-1">
                <img 
                  src="/images/technology.jpg" 
                  alt="Modern agricultural technology in Kenya"
                  width="600"
                  height="400"
                  loading="lazy"
                  className="rounded-2xl shadow-xl w-full h-auto object-cover"
                />
              </div>

              <div className="order-1 md:order-2">
                <div className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
                  Innovation
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                  Embracing Modern Agricultural Technology
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  Access cutting-edge tools, smart technology, and quality inputs that enhance 
                  productivity and profitability for farmers of all scales.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Our comprehensive range of agricultural inputs includes precision farming tools, 
                  certified seeds, and expert guidance on implementation.
                </p>
                <Link
                  to="/agricultural-inputs"
                  className="inline-flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                >
                  Explore Our Products <FaArrowRight className="text-xs" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Youth & Innovation - Side by Side Cards */}
        <section className="py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[450px]">
                <img 
                  src="/images/youth.jpg"
                  alt="Youth in agriculture program Kenya"
                  width="600"
                  height="450"
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      Youth Empowerment
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">Youth in Agriculture</h3>
                    <p className="text-emerald-50 mb-6">
                      Empowering the next generation of farmers with modern skills and entrepreneurial mindset.
                    </p>
                    <Link 
                      to="/enterprise-building"
                      className="inline-flex items-center gap-2 bg-white text-emerald-900 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                    >
                      Learn More <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl group h-[450px]">
                <img 
                  src="/images/innovation.jpg"
                  alt="Smart farming solutions Kenya"
                  width="600"
                  height="450"
                  loading="lazy"
                  className="w-full h-full object-cover will-change-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/60 to-transparent flex items-end">
                  <div className="p-8 text-white">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold mb-3">
                      Smart Solutions
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3">Smart Farming Solutions</h3>
                    <p className="text-gray-100 mb-6">
                      Integrating technology and data-driven insights for better farm management and productivity.
                    </p>
                    <Link 
                      to="/analytical-services"
                      className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      Discover Services <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section - Clean Design */}
        <section className="py-20 px-4 bg-emerald-600">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">
              Our Impact in Numbers
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-white">500+</div>
                <p className="text-emerald-100 text-sm md:text-base font-medium">Farmers Trained</p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-white">50+</div>
                <p className="text-emerald-100 text-sm md:text-base font-medium">Training Programs</p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-white">100+</div>
                <p className="text-emerald-100 text-sm md:text-base font-medium">Partnerships</p>
              </div>
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold mb-2 text-white">10+</div>
                <p className="text-emerald-100 text-sm md:text-base font-medium">Counties Reached</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Banner */}
        <section className="relative h-96 overflow-hidden">
          <img 
            src="/images/community-banner.jpg"
            alt="F.a.C.T farming community working together in Kenya"
            width="1200"
            height="400"
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/80 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Building Resilient Farming Communities
              </h2>
              <p className="text-lg md:text-xl text-gray-200">
                Together, we're creating sustainable livelihoods and food security across Kenya
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action - Final */}
        <section className="py-24 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-gray-600 text-lg mb-10 max-w-2xl mx-auto">
              Join hundreds of farmers who have improved their yields, incomes, and sustainability 
              through our training and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/knowledge-training"
                className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors shadow-lg"
              >
                Explore Training Programs <FaArrowRight />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-colors"
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
