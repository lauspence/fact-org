import { FaEye, FaBullseye } from 'react-icons/fa';
import SEO from '../components/common/SEO';

const About = () => {
  const values = [
    {
      title: 'Honesty',
      description: 'We uphold the truth at all times in all our dealings and communications.',
    },
    {
      title: 'Innovation',
      description: "We look out for the most efficient ways to meet our clients' needs and drive agricultural transformation.",
    },
    {
      title: 'Professionalism',
      description: 'We conduct our work to expected professional standards, delivering excellence in every engagement.',
    },
    {
      title: 'Confidentiality',
      description: 'We keep confidential any information entrusted to us by clients, ensuring trust and privacy.',
    },
    {
      title: 'Fairness',
      description: 'We are fair in dealing with our clients and practice equity in all our interactions.',
    },
  ];

  const impactAreas = [
    {
      title: 'Small & Large Scale Producers',
      description: 'Supporting agricultural producers of all scales with technical expertise.',
    },
    {
      title: 'Farm Input Suppliers',
      description: 'Empowering suppliers with knowledge and quality standards.',
    },
    {
      title: 'Processors & Investors',
      description: 'Guiding agribusiness investors and processors toward sustainable growth.',
    },
  ];

  const sdgContributions = [
    { number: '1', text: 'No Poverty' },
    { number: '2', text: 'Zero Hunger' },
    { number: '3', text: 'Good Health and Well-Being' },
    { number: '5', text: 'Gender Equality' },
    { number: '8', text: 'Decent Work and Economic Growth' },
    { number: '9', text: 'Industry, Innovation and Infrastructure' },
    { number: '13', text: 'Climate Action' },
    { number: '14', text: 'Life Below Water' },
    { number: '15', text: 'Life on Land' },
  ];

  return (
    <>
      <SEO
        title="About Us"
        description="Farm and Community Technologies Limited (FaCT Ltd) is a Kenyan company providing technical expertise and specialist knowledge to stakeholders in agricultural production, agribusiness, and food security sectors since 2007."
        keywords="FaCT Ltd, Farm and Community Technologies, agricultural services Kenya, agribusiness consulting, farm training Kenya, agricultural technical services"
      />

      <div className="bg-white">
        <section className="relative overflow-hidden bg-slate-900 px-4 py-20 text-white min-h-[460px] md:min-h-[560px] flex items-center">
          <picture className="absolute inset-0 block">
            <source media="(min-width: 1280px)" srcSet="/images/hero-bg-1920.webp" type="image/webp" />
            <source media="(min-width: 768px)" srcSet="/images/hero-bg-1024.webp" type="image/webp" />
            <source media="(max-width: 767px)" srcSet="/images/hero-bg-640.webp" type="image/webp" />
            <img
              src="/images/hero-bg.jpg"
              alt=""
              aria-hidden="true"
              className="
                h-full w-full object-cover
                object-[64%_38%]
                sm:object-[62%_36%]
                md:object-[60%_35%]
                lg:object-[58%_34%]
                xl:object-[56%_34%]
                scale-[1.02]
              "
            />
          </picture>

          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/75 via-slate-900/60 to-stone-900/55" />

          <div className="container mx-auto max-w-4xl relative z-10">
            <p className="text-sm font-semibold text-amber-300 mb-3">
              Since 2007 • Transforming Agriculture
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
              About FaCT Ltd
            </h1>
            <p className="text-base md:text-lg text-slate-100 max-w-3xl leading-relaxed">
              Providing technical expertise and specialist knowledge to stakeholders in agriculture.
            </p>
          </div>
        </section>

        <section className="py-14 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Who We Are</h2>

            <div className="mt-6 space-y-5 text-gray-700 leading-relaxed">
              <p>
                <strong>Farm and Community Technologies Limited (FaCT Ltd)</strong> is a Kenyan company incorporated in{' '}
                <strong>November 2007</strong> to provide technical expertise and specialist knowledge and services targeted at
                stakeholders in agricultural production, agribusiness and food security sectors in Kenya and beyond.
              </p>
              <p>
                Since then, we have continued to significantly impact the livelihoods of many small and large scale agricultural
                producers, farm input suppliers, processors, as well as investors in agribusiness through our diverse range of
                products and services.
              </p>
              <p>
                At FaCT we believe that <strong>agri-enterprise is the way to wealth</strong> and a sure strategy to uplift the
                economy of African countries. We know that agriculture has evolved, and is still changing, from the subsistence
                activity it was decades ago to a highly dynamic business with the highest potential for profit and possibility of
                empowering communities across Africa to achieve high quality lives.
              </p>
              <p>
                Agri-enterprise contributes directly to at least <strong>9 of the 17 Sustainable Development Goals</strong> set by
                the UN members on reducing poverty and hunger (1, 2), promoting good health and gender equality (3, 5), creating
                employment and industrial growth (8, 9), and advancing climate action together with the well-being of life below
                water and on land (13, 14, 15).
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Impact</h2>
            <p className="text-gray-600 mt-3">
              We recognise the importance of the agricultural sector to millions of people, and this keeps us motivated in driving
              change and impact.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {impactAreas.map((area, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-5">
                  <h3 className="font-bold text-gray-900 mb-2">{area.title}</h3>
                  <p className="text-sm text-gray-600">{area.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-white border border-emerald-200 rounded-lg p-6 border-l-4 border-l-emerald-600">
              <h3 className="text-xl font-bold text-gray-900">Who We Serve</h3>
              <p className="text-gray-700 mt-3 leading-relaxed">
                In addition to working with full-time agro-entrepreneurs, we are delighted to work with <strong>youth</strong> as
                well as <strong>professionals from diverse backgrounds</strong> (law, engineering, medical, politics, business,
                etc) newly venturing into agribusiness.
              </p>
              <p className="text-gray-700 mt-4 leading-relaxed">
                The purpose of our existence is to support people, either as <strong>individuals, groups or organisations</strong>{' '}
                to succeed in their undertakings in agriculture and agribusiness. Whatever your need may be, if you are a practising
                or an aspiring agro-entrepreneur, we are available to help out.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-gradient-to-br from-emerald-50 to-white border border-emerald-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-emerald-100 p-3 rounded-lg">
                    <FaEye className="w-5 h-5 text-emerald-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Vision</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To be a leading provider of knowledge resources and technical services to agro-entrepreneurs.
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-white border border-teal-200 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-teal-100 p-3 rounded-lg">
                    <FaBullseye className="w-5 h-5 text-teal-700" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Our Mission</h3>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To provide quality knowledge and training, promote innovation, competitiveness, sustained growth and profitability
                  of agro-enterprises.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 mt-3">The principles that guide everything we do at FaCT Ltd.</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((value, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-5 hover:border-emerald-300 transition-colors">
                  <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Sustainable Development</h2>
            <p className="text-gray-600 mt-3">
              Through Agri-Enterprise, Fact Limited contributes directly to at least 9 of the 17 UN Sustainable Development Goals.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sdgContributions.map((sdg, index) => (
                <div key={index} className="bg-emerald-50 border border-emerald-200 rounded-lg p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-lg text-emerald-700">SDG {sdg.number}</div>
                    <div className="text-xs text-emerald-600 font-medium">UN Goal</div>
                  </div>
                  <p className="text-sm text-gray-700">{sdg.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 md:py-16 px-4 bg-gradient-to-br from-emerald-600 to-teal-700 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">Ready to Transform Your Agribusiness?</h2>
            <p className="text-emerald-50 mt-4 max-w-2xl mx-auto text-lg">
              Whatever your need may be, if you are a practising or an aspiring agro-entrepreneur, we are available to help out.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center mt-6 bg-white text-emerald-700 px-8 py-3 rounded-lg font-bold hover:bg-emerald-50 transition-colors shadow-lg"
            >
              Contact Us Today
            </a>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;
