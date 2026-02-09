import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaChevronDown, FaShoppingCart } from 'react-icons/fa';

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
    { path: '/marketplace', label: 'Marketplace', icon: FaShoppingCart },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Bar - Sleek & Minimal */}
      <div className="bg-gray-900 text-gray-300 py-2.5 px-4 border-b border-gray-800">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-xs">
          {/* Social Icons */}
          <div className="flex space-x-5 mb-2 md:mb-0">
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Facebook">
              <FaFacebook className="text-sm" />
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Twitter">
              <FaTwitter className="text-sm" />
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="text-sm" />
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors" aria-label="Instagram">
              <FaInstagram className="text-sm" />
            </a>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col md:flex-row items-center space-y-1 md:space-y-0 md:space-x-6">
            <a href="tel:+254759509615" className="flex items-center hover:text-emerald-400 transition-colors">
              <FaPhone className="mr-2 text-xs" />
              <span className="font-medium">+254 759 509615</span>
            </a>
            <a href="mailto:info@factltd.co.ke" className="flex items-center hover:text-emerald-400 transition-colors">
              <FaEnvelope className="mr-2 text-xs" />
              <span className="font-medium">info@factltd.co.ke</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header - Clean & Modern */}
      <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo - Refined */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="flex flex-col">
                <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                  Fa<span className="text-emerald-600">C</span>T Ltd
                </span>
                <span className="text-[10px] tracking-widest text-gray-500 uppercase font-semibold">
                  Technology for Progress
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Minimalist */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  {link.dropdown ? (
                    <>
                      <button
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-emerald-600 transition-colors rounded-lg hover:bg-gray-50"
                        onMouseEnter={() => setActiveDropdown(link.path)}
                      >
                        {link.label}
                        <FaChevronDown className="ml-1.5 text-xs" />
                      </button>
                      
                      {/* Dropdown Menu - Modern Card Style */}
                      {activeDropdown === link.path && (
                        <div 
                          className="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          <div className="py-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`block px-4 py-3 text-sm transition-colors ${
                                  isActive(item.path) 
                                    ? 'bg-emerald-50 text-emerald-700 font-semibold border-l-3 border-emerald-600' 
                                    : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                                }`}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                        isActive(link.path)
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'text-gray-700 hover:text-emerald-600 hover:bg-gray-50'
                      }`}
                    >
                      {link.icon && <link.icon className="text-base" />}
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Mobile Menu Button - Clean */}
            <button
              className="lg:hidden text-2xl text-gray-700 hover:text-emerald-600 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile Navigation - Refined */}
          {isOpen && (
            <nav className="lg:hidden pb-4 space-y-1 border-t border-gray-100 pt-4">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.dropdown ? (
                    <>
                      <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {link.label}
                      </div>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block py-3 pl-8 pr-4 text-sm font-medium transition-colors rounded-lg mx-2 ${
                            isActive(item.path)
                              ? 'bg-emerald-600 text-white'
                              : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
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
                      className={`flex items-center gap-2 py-3 px-4 text-sm font-medium transition-colors rounded-lg mx-2 ${
                        isActive(link.path)
                          ? 'bg-emerald-600 text-white'
                          : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.icon && <link.icon className="text-base" />}
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
