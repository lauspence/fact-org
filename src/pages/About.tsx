import { FaEye, FaBullseye, FaUsers, FaHandshake, FaLeaf, FaAward } from 'react-icons/fa';

const About = () => {
  const values = [
    {
      icon: <FaHandshake className="w-12 h-12 text-emerald-600" />,
      title: "Collaboration",
      description: "Building strong partnerships with communities, institutions, and stakeholders."
    },
    {
      icon: <FaLeaf className="w-12 h-12 text-emerald-600" />,
      title: "Sustainability",
      description: "Promoting environmentally responsible and economically viable agricultural practices."
    },
    {
      icon: <FaAward className="w-12 h-12 text-emerald-600" />,
      title: "Excellence",
      description: "Delivering high-quality training, services, and solutions that create real impact."
    },
    {
      icon: <FaUsers className="w-12 h-12 text-emerald-600" />,
      title: "Empowerment",
      description: "Equipping communities with knowledge and tools to achieve self-sufficiency."
    }
  ];

  const team = [
    { name: "Leadership Team", role: "Strategic direction and oversight" },
    { name: "Training Experts", role: "Curriculum development and delivery" },
    { name: "Agricultural Specialists", role: "Technical advisory and field support" },
    { name: "Business Advisors", role: "Enterprise development and partnerships" }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About F.a.C.T LTD</h1>
          <p className="text-xl text-emerald-50">
            Transforming communities through agricultural knowledge, innovation, and sustainable practices.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Who We Are</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Farming and Community Training Limited (F.a.C.T LTD) is a leading agricultural development 
              organization dedicated to empowering farmers, youth, entrepreneurs, and communities across Kenya 
              and beyond. Since our establishment, we have been at the forefront of bridging the gap between 
              traditional farming practices and modern agricultural technology.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              We serve as a comprehensive platform for agricultural training, advisory services, and sustainable 
              solutions. Our approach combines practical knowledge, innovative technology, and community engagement 
              to create lasting impact in the agricultural sector.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Through our four core focus areas—Knowledge & Training, Agricultural Inputs, Enterprise Building, 
              and Analytical Services—we provide end-to-end support for individuals and organizations looking to 
              thrive in agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-emerald-50 rounded-xl p-8 border-l-4 border-emerald-600">
              <div className="flex items-center mb-4">
                <FaEye className="w-10 h-10 text-emerald-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To be the leading catalyst for agricultural transformation and community development across 
                Africa through knowledge, technology, and sustainable practices that ensure food security 
                and economic prosperity.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-teal-50 rounded-xl p-8 border-l-4 border-teal-600">
              <div className="flex items-center mb-4">
                <FaBullseye className="w-10 h-10 text-teal-600 mr-4" />
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Empowering farmers, youth, and entrepreneurs with practical training, quality inputs, expert 
                advisory services, and business support needed to build thriving agricultural enterprises and 
                sustainable communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Our Core Values
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            The principles that guide everything we do at F.a.C.T LTD.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all text-center">
                <div className="flex justify-center mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Our Team
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Experienced professionals dedicated to agricultural excellence and community development.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-6 border-l-4 border-emerald-600">
                <h3 className="text-xl font-bold mb-2 text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 bg-emerald-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose F.a.C.T LTD?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
