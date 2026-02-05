const About = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-[#2C3E50]">About F.a.C.T LTD</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-emerald-600">Who We Are</h2>
          <p className="text-gray-700 mb-4">
            Farming and Community Training Limited (F.a.C.T LTD) is a leading organization dedicated 
            to empowering communities through sustainable agriculture, innovative training programs, 
            and comprehensive support services.
          </p>
          <p className="text-gray-700">
            Our mission is to bridge the gap between traditional farming practices and modern 
            agricultural technology, ensuring food security and economic growth across Africa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">Our Vision</h3>
            <p className="text-gray-700">
              To be the leading catalyst for agricultural transformation and community development 
              across Africa through knowledge, technology, and sustainable practices.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3 text-emerald-600">Our Mission</h3>
            <p className="text-gray-700">
              Empowering farmers, youth, and entrepreneurs with the tools, training, and support 
              needed to build thriving agricultural enterprises and sustainable communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
