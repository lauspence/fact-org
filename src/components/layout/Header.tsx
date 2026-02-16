import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaPhone, FaEnvelope, FaChevronDown, FaShoppingCart } from 'react-icons/fa';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();


  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100; // Adjust this value to control when transition happens
      setScrolled(scrollPosition > scrollThreshold);
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


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
    { path: '/articles', label: 'Articles' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' },
  ];


  const isActive = (path: string) => location.pathname === path;


  return (
    <>
      {/* Top Bar - Subtle Green Accent */}
      <div className="bg-gradient-to-r from-gray-900 via-emerald-950 to-gray-900 text-gray-300 py-2.5 px-4 border-b border-emerald-900/30">
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


      {/* Main Header - Transitions from Emerald to White on Scroll */}
      <header 
        className={`shadow-sm sticky top-0 z-50 border-b-2 transition-all duration-300 ${
          scrolled 
            ? 'bg-white border-emerald-500/20' 
            : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 border-emerald-400'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-4">
            {/* Logo - Color changes based on scroll */}
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity group">
              <div className="flex flex-col">
                <span className={`text-2xl lg:text-3xl font-bold transition-colors duration-300 ${
                  scrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Fa<span className={`group-hover:text-emerald-400 transition-colors `}>C</span>T Ltd
                </span>
                <span className={`text-[10px] tracking-widest uppercase font-semibold transition-colors duration-300 ${
                  scrolled ? 'text-gray-500' : 'text-emerald-100'
                }`}>
                  Knowledge for Progress 
                </span>
              </div>
            </Link>


            {/* Desktop Navigation - Colors adapt to background */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  {link.dropdown ? (
                    <>
                      <button
                        className={`flex items-center px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                          scrolled
                            ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
                            : 'text-white hover:text-emerald-100 hover:bg-white/10'
                        }`}
                        onMouseEnter={() => setActiveDropdown(link.path)}
                      >
                        {link.label}
                        <FaChevronDown className="ml-1.5 text-xs" />
                      </button>
                      
                      {/* Dropdown Menu */}
                      {activeDropdown === link.path && (
                        <div 
                          className="absolute top-full left-0 mt-1 w-64 bg-white shadow-xl rounded-lg overflow-hidden border-t-2 border-emerald-500 border-x border-b border-gray-100"
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
                                    : 'text-gray-700 hover:bg-emerald-50/30 hover:text-emerald-600'
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
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                        isActive(link.path)
                          ? scrolled
                            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                            : 'bg-white text-emerald-600 shadow-sm'
                          : scrolled
                            ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
                            : 'text-white hover:text-emerald-100 hover:bg-white/10'
                      }`}
                    >
                      {link.icon && <link.icon className="text-base" />}
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>


            {/* Mobile Menu Button */}
            <button
              className={`lg:hidden text-2xl transition-colors ${
                scrolled ? 'text-gray-700 hover:text-emerald-600' : 'text-white hover:text-emerald-100'
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>


          {/* Mobile Navigation */}
          {isOpen && (
            <nav className={`lg:hidden pb-4 space-y-1 border-t-2 pt-4 ${
              scrolled ? 'border-emerald-500/20' : 'border-white/20'
            }`}>
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.dropdown ? (
                    <>
                      <div className={`px-4 py-2 text-xs font-bold uppercase tracking-wider ${
                        scrolled ? 'text-emerald-700' : 'text-emerald-100'
                      }`}>
                        {link.label}
                      </div>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block py-3 pl-8 pr-4 text-sm font-medium transition-colors rounded-lg mx-2 ${
                            isActive(item.path)
                              ? scrolled
                                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                                : 'bg-white text-emerald-600 shadow-sm'
                              : scrolled
                                ? 'text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-600'
                                : 'text-white hover:bg-white/10'
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
                          ? scrolled
                            ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20'
                            : 'bg-white text-emerald-600 shadow-sm'
                          : scrolled
                            ? 'text-gray-700 hover:bg-emerald-50/50 hover:text-emerald-600'
                            : 'text-white hover:bg-white/10'
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
