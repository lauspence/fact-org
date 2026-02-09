import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/about', label: 'ABOUT US' },
    { path: '/knowledge-training', label: 'TRAINING' },
    { path: '/agricultural-inputs', label: 'INPUTS' },
    { path: '/enterprise-building', label: 'ENTERPRISES' },
    { path: '/analytical-services', label: 'SERVICES' },
    { path: '/gallery', label: 'GALLERY' },
    { path: '/contact', label: 'CONTACT' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <Link to="/" className="flex flex-col hover:opacity-90 transition">
            <span className="text-3xl lg:text-4xl font-serif italic font-bold">FaCT Ltd</span>
            <span className="text-xs tracking-wider text-emerald-100">Technology for Progress</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2.5 text-sm font-semibold tracking-wide transition-all rounded ${
                  isActive(link.path)
                    ? 'bg-yellow-400 text-gray-900'
                    : 'text-emerald-50 hover:text-white hover:bg-emerald-800'
                }`}
              >
                {link.label}
              </Link>
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
              <Link
                key={link.path}
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
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
