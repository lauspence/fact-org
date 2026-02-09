import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaChevronDown } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  const navLinks = [
    { path: '/about', label: 'About Us' },
    { 
      path: '/services', 
      label: 'Our Services',
      dropdown: [
        { path: '/knowledge-training', label: 'Knowledge & Training' },
        { path: '/agricultural-inputs', label: 'Agricultural Inputs' },
        { path: '/enterprise-building', label: 'Enterprise Building' },
        { path: '/analytical-services', label: 'Analytical Services' },
      ]
    },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Social Icons */}
          <div className="flex space-x-4 mb-2 md:mb-0">
            <a href="#" className="hover:text-yellow-400 transition" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="#" className="hover:text-yellow-400 transition" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-yellow-400 transition" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-yellow-400 transition" aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-6">
            <a href="tel:+254759509615" className="flex items-center hover:text-yellow-400 transition">
              <FaPhone className="mr-2 text-xs" />
              +254 759 509615
            </a>
            <a href="mailto:info@factltd.co.ke" className="flex items-center hover:text-yellow-400 transition">
              <FaEnvelope className="mr-2 text-xs" />
              info@factltd.co.ke
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
              <div className="flex flex-col">
                <span className="text-3xl lg:text-4xl font-serif italic font-bold">FaCT Ltd</span>
                <span className="text-xs tracking-wider text-emerald-100">Technology for Progress</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  {link.dropdown ? (
                    <>
                      <button
                        className="flex items-center px-5 py-3 text-sm font-semibold text-emerald-50 hover:text-white hover:bg-emerald-800 transition-all rounded"
                        onMouseEnter={() => setActiveDropdown(link.path)}
                      >
                        {link.label}
                        <FaChevronDown className="ml-2 text-xs" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === link.path && (
                        <div 
                          className="absolute top-full left-0 mt-0 w-64 bg-white shadow-xl rounded-b-lg overflow-hidden"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              className={`block px-5 py-3 text-sm text-gray-700 hover:bg-emerald-50 hover:text-emerald-700 transition ${
                                isActive(item.path) ? 'bg-emerald-100 text-emerald-700 font-semibold' : ''
                              }`}
                            >
                              {item.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`px-5 py-3 text-sm font-semibold transition-all rounded ${
                        isActive(link.path)
                          ? 'bg-yellow-400 text-gray-900'
                          : 'text-emerald-50 hover:text-white hover:bg-emerald-800'
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-2xl hover:text-yellow-400 transition"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <nav className="lg:hidden pb-4 space-y-1">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.dropdown ? (
                    <>
                      <div className="px-4 py-3 text-sm font-semibold text-emerald-100">
                        {link.label}
                      </div>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block py-3 pl-8 pr-4 text-sm transition ${
                            isActive(item.path)
                              ? 'bg-yellow-400 text-gray-900 font-semibold'
                              : 'text-emerald-50 hover:text-white hover:bg-emerald-800'
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`block py-3 px-4 text-sm font-semibold transition rounded ${
                        isActive(link.path)
                          ? 'bg-yellow-400 text-gray-900'
                          : 'text-emerald-50 hover:text-white hover:bg-emerald-800'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
