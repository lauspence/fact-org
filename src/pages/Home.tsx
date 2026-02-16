import { Link } from 'react-router-dom';
import { services } from '../data/services';
import SEO from '../components/common/SEO';

type ResponsiveImageProps = {
  baseName: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'auto' | 'sync';
  sizes?: string;
  priority?: boolean;
  availableWidths: Array<640 | 1024 | 1920>;
};

const ResponsiveWebPImage = ({
  baseName,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  priority = false,
  availableWidths,
}: ResponsiveImageProps) => {
  const sorted = [...availableWidths].sort((a, b) => a - b);
  const largest = sorted[sorted.length - 1];

  const srcSet = sorted
    .map((w) => `/images/${baseName}-${w}.webp ${w}w`)
    .join(', ');

  return (
    <picture>
      <source srcSet={srcSet} type="image/webp" sizes={sizes} />
      <img
        src={`/images/${baseName}-${largest}.webp`}
        alt={alt}
        className={className}
        width={width}
        height={height}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
      />
    </picture>
  );
};

const Home = () => {
  return (
    <>
      <SEO
        title="Home"
        description="F.a.C.T LTD - Empowering farming communities through sustainable agriculture, innovative training, and comprehensive support services across Kenya. Expert agricultural training, quality inputs, and advisory services."
        keywords="farming Kenya, agricultural training, agribusiness Kenya, farm inputs, soil testing Kenya, agricultural services, climate-smart agriculture, farm technology Kenya"
        image="/images/hero-bg-1920.webp"
      />

      <div>
        {/* Hero Section */}
        <section className="relative text-white py-16 md:py-28 px-4 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <ResponsiveWebPImage
              baseName="hero-bg"
              alt="Kenyan farmers working in agricultural field"
              className="w-full h-full object-cover"
              availableWidths={[640, 1024, 1920]}
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/70 via-emerald-800/60 to-teal-900/70"></div>
          </div>

          <div className="container mx-auto text-center max-w-5xl relative z-10">
            <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-xs md:text-sm font-bold mb-4 md:mb-6 border border-white/30 shadow-lg">
              Empowering Kenya's Agricultural Future
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 leading-tight drop-shadow-2xl">
              Farming and Community Technologies Limited
            </h1>
            <p className="text-base md:text-xl lg:text-2xl mb-8 md:mb-10 text-emerald-50 leading-relaxed max-w-3xl mx-auto drop-shadow-lg font-light">
              Transforming agriculture through sustainable practices, expert training, and innovative solutions for modern agribusiness.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-block bg-white text-emerald-700 px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-emerald-50 transition-all shadow-2xl hover:shadow-emerald-500/20"
              >
                Get Started →
              </Link>
              <Link
                to="/about"
                className="inline-block bg-white/15 backdrop-blur-sm text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-base md:text-lg hover:bg-white/25 transition-all border-2 border-white/40 shadow-xl"
              >
                Learn More
              </Link>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-10 md:mb-16">
              <p className="text-emerald-600 font-bold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">What We Offer</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 text-gray-900">Our Core Services</h2>
              <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
                Comprehensive solutions tailored to farmers, entrepreneurs, and agricultural professionals.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-xl md:rounded-2xl border-2 border-gray-100 hover:border-emerald-300 hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="p-5 md:p-6 flex flex-col flex-grow">
                    <h3 className="text-lg md:text-xl font-black mb-2 md:mb-3 text-gray-900 group-hover:text-emerald-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 md:mb-5 leading-relaxed flex-grow">
                      {service.description}
                    </p>
                    <ul className="mb-5 md:mb-6 space-y-2 text-left">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="text-xs md:text-sm text-gray-700 flex items-start">
                          <span className="text-emerald-600 mr-2 font-bold mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 md:p-6 pt-0">
                    <Link
                      to={service.link}
                      className="flex items-center justify-center w-full text-center bg-gray-900 text-white py-2.5 md:py-3 rounded-xl hover:bg-emerald-600 transition-all font-bold text-sm md:text-base shadow-md hover:shadow-xl"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Section */}
        <section className="py-12 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <div className="inline-block bg-emerald-100 text-emerald-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4">
                  Our Approach
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 text-gray-900 leading-tight">
                  Transforming Agriculture Through Knowledge
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  Our approach to training is practical, learner-centered, and results-driven. We blend expert instruction with real-world case studies, hands-on demonstrations, and interactive discussions to ensure knowledge translates into action.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                  By tailoring programs to diverse agricultural contexts, we empower farmers, entrepreneurs, and professionals with skills that enhance productivity, sustainability, and long-term business success.
                </p>
                <Link
                  to="/about"
                  className="inline-block bg-emerald-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Learn More About Us →
                </Link>
              </div>

              <div className="relative order-first md:order-last">
                <div className="absolute -top-4 -right-4 w-48 h-48 md:w-72 md:h-72 bg-emerald-100 rounded-full blur-3xl opacity-30"></div>
                <ResponsiveWebPImage
                  baseName="training"
                  alt="Agricultural training session with Kenyan farmers"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="rounded-xl md:rounded-2xl shadow-2xl w-full h-auto object-cover relative z-10"
                  availableWidths={[640, 1024]}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Work in Action */}
        <section className="py-12 md:py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-8 md:mb-12">
              <p className="text-emerald-600 font-bold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3">Impact Stories</p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4 text-gray-900">Our Work in Action</h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
                Supporting Kenyan farmers with training, technology, and sustainable practices.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl group h-72 md:h-96">
                <ResponsiveWebPImage
                  baseName="community1"
                  alt="F.a.C.T community training session"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  availableWidths={[640, 1024]}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/50 to-transparent flex items-end p-4 md:p-6">
                  <div className="text-white">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs font-bold mb-2 md:mb-3 border border-white/30">
                      Community
                    </span>
                    <h3 className="font-black text-lg md:text-2xl mb-1 md:mb-2">Community Empowerment</h3>
                    <p className="text-xs md:text-sm text-emerald-50">Training farmers across Kenya</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl group h-72 md:h-96">
                <ResponsiveWebPImage
                  baseName="farming1"
                  alt="Sustainable farming practices in Kenya"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  availableWidths={[640, 1024]}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-teal-900/95 via-teal-900/50 to-transparent flex items-end p-4 md:p-6">
                  <div className="text-white">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs font-bold mb-2 md:mb-3 border border-white/30">
                      Sustainability
                    </span>
                    <h3 className="font-black text-lg md:text-2xl mb-1 md:mb-2">Sustainable Practices</h3>
                    <p className="text-xs md:text-sm text-teal-50">Climate-smart agriculture</p>
                  </div>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-xl group h-72 md:h-96">
                <ResponsiveWebPImage
                  baseName="harvest1"
                  alt="Kenyan farmers with quality harvest"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  availableWidths={[640, 1024]}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/50 to-transparent flex items-end p-4 md:p-6">
                  <div className="text-white">
                    <span className="inline-block bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 rounded-full text-xs font-bold mb-2 md:mb-3 border border-white/30">
                      Results
                    </span>
                    <h3 className="font-black text-lg md:text-2xl mb-1 md:mb-2">Quality Yields</h3>
                    <p className="text-xs md:text-sm text-gray-100">Improved crop production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modern Farming Section */}
        <section className="py-12 md:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div className="relative order-first">
                <div className="absolute -top-4 -left-4 w-48 h-48 md:w-72 md:h-72 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
                <ResponsiveWebPImage
                  baseName="technology"
                  alt="Modern agricultural technology in Kenya"
                  width={600}
                  height={400}
                  loading="lazy"
                  className="rounded-xl md:rounded-2xl shadow-2xl w-full h-auto object-cover relative z-10"
                  availableWidths={[640, 1024]}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>

              <div>
                <div className="inline-block bg-emerald-100 text-emerald-700 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold mb-3 md:mb-4">
                  Innovation
                </div>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 text-gray-900 leading-tight">
                  Embracing Modern Agricultural Technology
                </h2>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4 md:mb-6">
                  Access cutting-edge tools, smart technology, and quality inputs that enhance productivity and
                  profitability for farmers of all scales.
                </p>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8">
                  Our comprehensive range of agricultural inputs includes precision farming tools, certified seeds, and
                  expert guidance on implementation.
                </p>
                <Link
                  to="/agricultural-inputs"
                  className="inline-block bg-emerald-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl"
                >
                  Explore Our Products →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Youth & Innovation */}
        <section className="py-12 md:py-20 px-4 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group h-[400px] md:h-[500px]">
                <ResponsiveWebPImage
                  baseName="youth"
                  alt="Youth in agriculture program Kenya"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  availableWidths={[640, 1024]}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/95 via-emerald-900/70 to-transparent flex items-end">
                  <div className="p-5 md:p-8 text-white">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold mb-3 md:mb-4 border border-white/30">
                      Youth Empowerment
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 md:mb-3">Youth in Agriculture</h3>
                    <p className="text-emerald-50 mb-4 md:mb-6 text-sm md:text-lg">
                      Empowering the next generation of farmers with modern skills and entrepreneurial mindset.
                    </p>
                    <Link
                      to="/enterprise-building"
                      className="inline-block bg-white text-emerald-900 px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base hover:bg-emerald-50 transition-all shadow-lg"
                    >
                      Learn More →
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl group h-[400px] md:h-[500px]">
                <ResponsiveWebPImage
                  baseName="innovation"
                  alt="Smart farming solutions Kenya"
                  width={600}
                  height={450}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  availableWidths={[640, 1024]}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/70 to-transparent flex items-end">
                  <div className="p-5 md:p-8 text-white">
                    <div className="inline-block bg-white/20 backdrop-blur-sm px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-bold mb-3 md:mb-4 border border-white/30">
                      Smart Solutions
                    </div>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 md:mb-3">Smart Farming Solutions</h3>
                    <p className="text-gray-100 mb-4 md:mb-6 text-sm md:text-lg">
                      Integrating technology and data-driven insights for better farm management and productivity.
                    </p>
                    <Link
                      to="/analytical-services"
                      className="inline-block bg-white text-gray-900 px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold text-sm md:text-base hover:bg-gray-100 transition-all shadow-lg"
                    >
                      Discover Services →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 md:py-20 px-4 bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-700 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-teal-300 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="container mx-auto max-w-6xl relative z-10">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-center mb-10 md:mb-16 text-white">Our Impact in Numbers</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              <div className="text-center">
                <div className="text-4xl md:text-6xl lg:text-7xl font-black mb-1 md:mb-2 text-white">500+</div>
                <p className="text-emerald-100 text-xs md:text-base lg:text-lg font-semibold">Farmers Trained</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl lg:text-7xl font-black mb-1 md:mb-2 text-white">50+</div>
                <p className="text-emerald-100 text-xs md:text-base lg:text-lg font-semibold">Training Programs</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl lg:text-7xl font-black mb-1 md:mb-2 text-white">100+</div>
                <p className="text-emerald-100 text-xs md:text-base lg:text-lg font-semibold">Partnerships</p>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-6xl lg:text-7xl font-black mb-1 md:mb-2 text-white">10+</div>
                <p className="text-emerald-100 text-xs md:text-base lg:text-lg font-semibold">Counties Reached</p>
              </div>
            </div>
          </div>
        </section>

        {/* Community Banner */}
        <section className="relative h-72 md:h-96 lg:h-[500px] overflow-hidden">
          <ResponsiveWebPImage
            baseName="community-banner"
            alt="F.a.C.T farming community working together in Kenya"
            width={1200}
            height={400}
            loading="lazy"
            className="w-full h-full object-cover"
            availableWidths={[640, 1024, 1920]}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/85 via-gray-900/70 to-gray-900/85 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-black mb-3 md:mb-4">Building Resilient Farming Communities</h2>
              <p className="text-base md:text-xl lg:text-2xl text-gray-200 font-light">
                Together, we're creating sustainable livelihoods and food security across Kenya
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 md:py-20 lg:py-24 px-4 bg-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 md:mb-6 text-gray-900">Ready to Transform Your Farm?</h2>
            <p className="text-gray-600 text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto">
              Join hundreds of farmers who have improved their yields, incomes, and sustainability through our training
              and services.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Link
                to="/knowledge-training"
                className="inline-block bg-emerald-600 text-white px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:bg-emerald-700 transition-all shadow-xl hover:shadow-2xl"
              >
                Explore Training Programs →
              </Link>
              <Link
                to="/contact"
                className="inline-block border-2 border-gray-300 text-gray-900 px-8 md:px-10 py-3 md:py-4 rounded-xl font-bold text-sm md:text-base hover:border-emerald-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
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
