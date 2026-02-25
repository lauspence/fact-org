import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import { FaSeedling, FaUsers, FaLightbulb, FaHandshake, FaArrowRight } from 'react-icons/fa';

const YouthInAgriculture = () => {
  return (
    <>
      <SEO
        title="Youth in Agriculture"
        description="Empowering the next generation of farmers with modern skills, entrepreneurship support, and practical pathways into agribusiness."
        keywords="youth in agriculture Kenya, agribusiness youth program, farm training youth, entrepreneurship agriculture"
        image="/images/youth-1024.webp"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-emerald-100/60">
          <div className="absolute inset-0">
            <img
              src="/images/youth-1024.webp"
              alt="Youth in agriculture"
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/75 via-emerald-950/55 to-gray-950/80" />
          </div>

          <div className="container mx-auto max-w-6xl px-4 py-16 sm:py-20 relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-emerald-600/90 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-md">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-200 animate-pulse" />
                Youth Empowerment
              </div>

              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
                style={{ textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}
              >
                Youth in Agriculture
              </h1>

              <p
                className="mt-4 text-white/90 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}
              >
                Empowering the next generation of farmers with modern skills, an entrepreneurial mindset, and practical pathways into agribusiness.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/training-events"
                  className="inline-flex items-center justify-center bg-emerald-500 text-white px-6 py-3.5 sm:px-8 rounded-xl font-semibold hover:bg-emerald-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 text-sm sm:text-base"
                >
                  View Trainings <FaArrowRight className="ml-2" />
                </Link>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center bg-white/10 text-white px-6 py-3.5 sm:px-8 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base"
                >
                  Partner / Join Program
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-14 sm:py-18 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  What we do for youth
                </h2>

                <p className="text-gray-600 mt-3 text-sm sm:text-base leading-relaxed">
                  We support youth to enter and grow in agribusiness through practical training, mentorship, access to information resources,
                  and linkages to opportunities. Our focus is to make agriculture a competitive and attractive career pathway.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <FaSeedling className="text-emerald-700" />
                      <h3 className="font-semibold text-gray-900">Practical Skills</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Hands-on learning in production systems, climate-smart practices, and farm management.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <FaLightbulb className="text-emerald-700" />
                      <h3 className="font-semibold text-gray-900">Entrepreneurship</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Business planning, market analysis, value addition, and enterprise development support.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <FaUsers className="text-emerald-700" />
                      <h3 className="font-semibold text-gray-900">Mentorship</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Coaching, peer learning, and guidance from experienced professionals and partners.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5">
                    <div className="flex items-center gap-3 mb-2">
                      <FaHandshake className="text-emerald-700" />
                      <h3 className="font-semibold text-gray-900">Linkages</h3>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Connections to trainings, demonstrations, markets, and collaboration opportunities.
                    </p>
                  </div>
                </div>
              </div>

              {/* Side card */}
              <aside className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm h-fit">
                <h3 className="text-lg font-bold text-gray-900">Want to get involved?</h3>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">
                  If you’re a youth group, school, partner, or sponsor — reach out and we’ll design a practical program together.
                </p>

                <div className="mt-5 space-y-3">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center w-full bg-emerald-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition"
                  >
                    Contact Us
                  </Link>

                  <Link
                    to="/enterprise-building"
                    className="inline-flex items-center justify-center w-full border border-gray-300 text-gray-900 px-5 py-3 rounded-xl font-semibold hover:border-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition"
                  >
                    Explore Enterprise Building
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-14 px-4 bg-gray-950 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              Ready to start your agribusiness journey?
            </h2>
            <p className="text-gray-300 mt-3 text-sm sm:text-base max-w-2xl mx-auto">
              Browse trainings and events, or contact us to tailor a youth program for your group.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/training-events"
                className="inline-flex items-center justify-center bg-emerald-500 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-emerald-600 transition"
              >
                Trainings & Events
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center bg-white/10 border border-white/15 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-white/20 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default YouthInAgriculture;