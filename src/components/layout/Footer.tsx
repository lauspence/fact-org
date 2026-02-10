import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white">
      <div className="container mx-auto px-4 py-6 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mb-6 md:mb-8">
          {/* About - Compact on Mobile */}
          <div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 md:mb-4 font-serif italic">F.a.C.T LTD</h3>
            <p className="text-emerald-50 leading-relaxed mb-2 md:mb-4 text-sm md:text-base">
              Farming and Community Training Limited - Empowering communities through sustainable agriculture.
            </p>
            <p className="text-xs md:text-sm text-emerald-200">Technology for Progress</p>
          </div>

          {/* Quick Links - Horizontal on Mobile */}
          <div>
            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-yellow-400">Quick Links</h3>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 md:flex-col md:space-y-3">
              <li>
                <Link to="/about" className="text-emerald-100 hover:text-yellow-400 transition text-sm md:text-base">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-emerald-100 hover:text-yellow-400 transition text-sm md:text-base">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-emerald-100 hover:text-yellow-400 transition text-sm md:text-base">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-emerald-100 hover:text-yellow-400 transition text-sm md:text-base">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect - Smaller Icons on Mobile */}
          <div>
            <h3 className="text-base md:text-xl font-bold mb-2 md:mb-4 text-yellow-400">Connect</h3>
            <div className="flex space-x-3 md:space-x-4">
              <a 
                href="#" 
                className="text-emerald-100 hover:text-yellow-400 transition text-xl md:text-2xl"
                aria-label="Facebook"
              >
                <FaFacebook />
              </a>
              <a 
                href="#" 
                className="text-emerald-100 hover:text-yellow-400 transition text-xl md:text-2xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
              <a 
                href="#" 
                className="text-emerald-100 hover:text-yellow-400 transition text-xl md:text-2xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href="#" 
                className="text-emerald-100 hover:text-yellow-400 transition text-xl md:text-2xl"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - Smaller on Mobile */}
        <div className="border-t border-emerald-700 pt-4 md:pt-6 text-center">
          <p className="text-emerald-200 text-xs md:text-sm">
            © {new Date().getFullYear()} F.a.C.T LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
