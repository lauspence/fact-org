import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import {
  FaBars,
  FaTimes,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaChevronDown,
  FaShoppingCart,
} from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      setScrolled(scrollPosition > scrollThreshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  const openDropdown = (path: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setActiveDropdown(path);
  };

  const closeDropdownWithDelay = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 120);
  };

  const closeAllMenus = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

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
      ],
    },
    { path: '/marketplace', label: 'Marketplace', icon: FaShoppingCart },
    { path: '/articles', label: 'Articles' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact Us' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const isDropdownActive = (items: Array<{ path: string; label: string }>) =>
    items.some((item) => location.pathname === item.path);

  return (
    <>
      <div className="bg-gradient-to-r from-gray-900 via-emerald-950 to-gray-900 text-gray-300 py-1.5 sm:py-2 px-4 border-b border-emerald-900/30">
        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center text-xs">
          <div className="flex space-x-3 sm:space-x-4 mb-2 lg:mb-0 order-2 lg:order-1">
            <a href="#" className="hover:text-emerald-400 transition-colors p-1">
              <FaFacebook className="text-sm" />
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors p-1">
              <FaTwitter className="text-sm" />
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors p-1">
              <FaLinkedin className="text-sm" />
            </a>
            <a href="#" className="hover:text-emerald-400 transition-colors p-1">
              <FaInstagram className="text-sm" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 lg:space-x-6 order-1 lg:order-2">
            <a
              href="tel:+254759509615"
              className="flex items-center hover:text-emerald-400 text-xs sm:text-sm whitespace-nowrap"
            >
              <FaPhone className="mr-2" />
              <span className="font-medium">+254 706 624605</span>
            </a>
            <a
              href="mailto:info@factltd.co.ke"
              className="flex items-center hover:text-emerald-400 text-xs sm:text-sm whitespace-nowrap"
            >
              <FaEnvelope className="mr-2" />
              <span className="font-medium">infofact07@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      <header
        className={`shadow-sm sticky top-0 z-50 border-b-2 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-emerald-500/20 shadow-lg'
            : 'bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 border-emerald-400'
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex justify-between items-center py-3 sm:py-4 lg:py-5 h-16 sm:h-20 lg:h-24">
            <Link
              to="/"
              className="flex items-center group hover:opacity-90 transition-all duration-300"
              onClick={closeAllMenus}
            >
              <div className="flex items-center space-x-3">
                <img
                  src="/fact-logo.png"
                  alt="FACT Logo"
                  className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain transition-all duration-300"
                  loading="eager"
                  fetchPriority="high"
                />
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => link.dropdown && openDropdown(link.path)}
                  onMouseLeave={() => link.dropdown && closeDropdownWithDelay()}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown((prev) => (prev === link.path ? null : link.path))
                        }
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                          isDropdownActive(link.dropdown)
                            ? 'bg-emerald-600 text-white'
                            : scrolled
                            ? 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
                            : 'text-white hover:bg-white/20'
                        }`}
                        aria-haspopup="menu"
                        aria-expanded={activeDropdown === link.path}
                      >
                        {link.label}
                        <FaChevronDown
                          className={`ml-1 text-xs transition-transform ${
                            activeDropdown === link.path ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {activeDropdown === link.path && (
                        <>
                          <div className="absolute top-full left-0 h-3 w-64" />
                          <div
                            className="absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl overflow-hidden border z-50"
                            onMouseEnter={() => openDropdown(link.path)}
                            onMouseLeave={closeDropdownWithDelay}
                          >
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                className={`block px-4 py-3 text-sm transition-colors ${
                                  isActive(item.path)
                                    ? 'bg-emerald-50 text-emerald-700 font-semibold'
                                    : 'text-gray-700 hover:bg-emerald-50'
                                }`}
                                onClick={closeAllMenus}
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                        isActive(link.path)
                          ? 'bg-emerald-600 text-white'
                          : scrolled
                          ? 'text-gray-700 hover:bg-emerald-50'
                          : 'text-white hover:bg-white/20'
                      }`}
                      onClick={closeAllMenus}
                    >
                      {link.icon && <link.icon />}
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <button
              className={`lg:hidden text-2xl p-2 rounded-lg ${scrolled ? 'text-gray-700' : 'text-white'}`}
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {isOpen && (
            <nav className="lg:hidden pb-6 space-y-1 border-t pt-4 bg-white rounded-b-xl shadow-xl">
              {navLinks.map((link) => (
                <div key={link.path}>
                  {link.dropdown ? (
                    <>
                      <div className="px-4 py-3 text-xs font-bold uppercase text-emerald-700 bg-emerald-50 rounded-r-lg">
                        {link.label}
                      </div>
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block py-3 pl-8 pr-6 text-sm rounded-lg mx-2 transition-colors ${
                            isActive(item.path)
                              ? 'bg-emerald-50 text-emerald-700 font-semibold'
                              : 'text-gray-700 hover:bg-emerald-50'
                          }`}
                          onClick={closeAllMenus}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      to={link.path}
                      className={`flex items-center gap-2 py-3 px-4 text-sm rounded-lg mx-2 transition-colors ${
                        isActive(link.path)
                          ? 'bg-emerald-50 text-emerald-700 font-semibold'
                          : 'text-gray-700 hover:bg-emerald-50'
                      }`}
                      onClick={closeAllMenus}
                    >
                      {link.icon && <link.icon />}
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
