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
      description: "Interactive in-person and online sessions with learning.",
      icon: <FaChalkboardTeacher className="w-12 h-12 text-emerald-600 sm:w-14 sm:h-14" />
    },
    {
      title: "Information Resources",
      description: "Downloadable guides, manuals, and publications.",
      icon: <FaBook className="w-12 h-12 text-emerald-600 sm:w-14 sm:h-14" />
    },
    {
      title: "Video Demonstrations",
      description: "Step-by-step visual guides and expert demos.",
      icon: <FaVideo className="w-12 h-12 text-emerald-600 sm:w-14 sm:h-14" />
    },
    {
      title: "Hands-on Demonstration",
      description: "Practical field demonstrations for selected topics.",
      icon: <FaCheckCircle className="w-12 h-12 text-emerald-600 sm:w-14 sm:h-14" />
    }
  ];

  const steps = [
    { title: "Assess Needs", desc: "We understand your goals and current challenges." },
    { title: "Train & Practice", desc: "Hands-on sessions designed for real results." },
    { title: "Tools & Resources", desc: "Guides, videos, and support materials." },
    { title: "Follow-up Support", desc: "Advice and check-ins to keep you on track." }
  ];

  const categoryIcon = (title: string) => {
    if (title.toLowerCase().includes('livestock')) return <FaCheckCircle className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6" />;
    if (title.toLowerCase().includes('horticultural')) return <FaBook className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6" />;
    if (title.toLowerCase().includes('greenhouse')) return <FaVideo className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6" />;
    return <FaChalkboardTeacher className="text-emerald-600 w-5 h-5 sm:w-6 sm:h-6" />;
  };

  return (
    <>
      <SEO
        title="Knowledge & Training"
        description="Comprehensive agricultural training programs in livestock, horticulture, greenhouse systems, and agribusiness development. Practical courses for farmers, youth, and entrepreneurs in Kenya."
        keywords="agricultural training Kenya, livestock production, greenhouse farming, agribusiness training, farming courses Kenya"
        image="/images/knowledge---training-1920.webp"
      />

      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="relative border-b border-emerald-100/60 py-16 sm:py-20 px-4 overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <picture>
              <source
                type="image/webp"
                sizes="(min-width: 1024px) 1920px, (min-width: 768px) 1024px, 100vw"
                srcSet={[
                  `/images/knowledge---training-640.webp 640w`,
                  `/images/knowledge---training-1024.webp 1024w`,
                  `/images/knowledge---training-1920.webp 1920w`,
                ].join(', ')}
              />
              <img
                src="/images/knowledge---training-1920.webp"
                alt="Knowledge and training in agriculture"
                className="w-full h-full object-cover transform-gpu"
                loading="eager"
                decoding="async"
                fetchPriority="high"
              />
            </picture>

            {/* ✅ One strong overlay for readability (no white card needed) */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-950/75 via-emerald-950/55 to-gray-950/80" />
          </div>

          {/* Content sits directly on the image */}
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              {/* badge */}
              <div className="inline-flex items-center gap-2 bg-emerald-600/90 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold mb-6 shadow-md">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-200 animate-pulse" />
                Empowering Growth
              </div>

              {/* ✅ No white box. Just text on image */}
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight"
                style={{ textShadow: '0 2px 18px rgba(0,0,0,0.55)' }}
              >
                Knowledge &amp; Training
              </h1>

              <p
                className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto"
                style={{ textShadow: '0 2px 14px rgba(0,0,0,0.5)' }}
              >
                Empowering communities through comprehensive agricultural training and knowledge resources.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/training-events"
                  className="inline-flex items-center justify-center bg-emerald-500 text-white px-6 py-3.5 sm:px-8 rounded-xl font-semibold hover:bg-emerald-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 text-sm sm:text-base"
                >
                  Book Training →
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center bg-white/10 text-white px-6 py-3.5 sm:px-8 rounded-xl font-semibold hover:bg-white/20 transition-all border border-white/20 text-sm sm:text-base"
                >
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Training Courses */}
        <section className="py-16 sm:py-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Our Training Programs
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
                Practical programs designed for farmers, youth, and entrepreneurs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {courseCategories.map((category, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-emerald-100 p-6 sm:p-8 shadow-sm hover:shadow-xl hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start gap-3 mb-6 sm:mb-8">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shadow-inner mt-0.5">
                      {categoryIcon(category.title)}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight flex-1">
                      {category.title}
                    </h3>
                  </div>

                  <ul className="space-y-2 sm:space-y-3">
                    {category.courses.map((course, idx) => (
                      <li key={idx} className="flex items-start text-gray-700 text-sm sm:text-base">
                        <FaCheckCircle className="text-emerald-600 mr-3 mt-1 flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="leading-relaxed">{course}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-white border border-emerald-100 p-6 rounded-2xl mt-12 max-w-4xl mx-auto shadow-sm">
              <p className="text-gray-800 text-base sm:text-lg text-center">
                <strong className="text-emerald-700">Custom Training Available:</strong> All courses can be tailored to meet your specific needs.
                <Link
                  to="/contact"
                  className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline ml-1 inline-block"
                >
                  Contact us →
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Simple Process Section */}
        <section className="py-16 sm:py-20 px-4 bg-white border-y border-gray-100">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-10 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                How It Works
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
                A simple path from learning to real-world results.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {steps.map((item, index) => (
                <div
                  key={index}
                  className="relative bg-gray-50 rounded-2xl border border-gray-200 p-5 sm:p-6 hover:border-emerald-200 hover:bg-white hover:shadow-md transition-all duration-200"
                >
                  <div className="absolute -top-3 left-4 inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-semibold shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2 mt-2 text-sm sm:text-base">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Training Delivery */}
        <section className="py-16 sm:py-20 px-4 bg-white">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12 sm:mb-14">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                How We Train
              </h2>
              <p className="text-gray-600 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
                Flexible delivery methods to suit your learning style.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
              {trainingFormats.map((format, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-white border border-emerald-100 shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-emerald-200 transition-all duration-300 group"
                >
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {format.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-900 tracking-tight">
                    {format.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {format.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-tight">
                Our Approach
              </h2>
              <p className="text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto">
                Practical, learner-centered, and focused on measurable impact.
              </p>
            </div>

            <div className="bg-emerald-900/40 rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
              <p className="text-base sm:text-lg leading-relaxed text-emerald-50/95">
                Our approach to training is practical, learner-centered, and results-driven. We blend expert instruction with real-world case studies, hands-on demonstrations, and interactive discussions to ensure knowledge translates into action. By tailoring programs to diverse agricultural contexts, we empower farmers, entrepreneurs, and professionals with skills that enhance productivity, sustainability, and long-term business success.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 sm:py-20 px-4 bg-gray-950 text-white">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Ready to Get Started?
            </h2>
            <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Join our training programs and enhance your farming and agribusiness skills.
            </p>
            <Link
              to="/training-events"
              className="inline-flex items-center justify-center bg-emerald-500 text-white px-8 py-3.5 sm:px-10 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-emerald-600 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
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