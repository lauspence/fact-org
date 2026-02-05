const EnterpriseBuilding = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-[#2C3E50]">Enterprise Building & Sector Development</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <p className="text-lg text-gray-700 mb-6">
            We provide comprehensive business support services to help youth, entrepreneurs, and 
            organizations build sustainable agricultural enterprises.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-emerald-600">Business Support Services</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Business planning and strategy development</li>
                <li>• Market linkage and value chain integration</li>
                <li>• Financial management and record keeping</li>
                <li>• Regulatory compliance support</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-emerald-600">Youth Engagement</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Agripreneurship programs</li>
                <li>• Skills development workshops</li>
                <li>• Mentorship and coaching</li>
                <li>• Start-up support and incubation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 text-white rounded-lg shadow-lg p-8 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Build Your Enterprise?</h3>
          <p className="mb-6">Partner with us to transform your agricultural business idea into reality.</p>
          <button className="bg-white text-emerald-600 px-8 py-3 rounded font-semibold hover:bg-gray-100 transition">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterpriseBuilding;
