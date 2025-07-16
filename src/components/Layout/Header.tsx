import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useServices } from '../../context/ServiceContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { categories } = useServices();
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-navy shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-white font-bold text-xl">
              Thabo Digital
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.hasDropdown ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsServicesOpen(true)}
                    onMouseLeave={() => setIsServicesOpen(false)}
                  >
                    <button
                      className={`text-white hover:text-red transition-colors duration-200 flex items-center space-x-1 ${
                        isActivePath(item.path) ? 'text-red' : ''
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {isServicesOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-md shadow-lg py-2 z-50">
                        <Link
                          to="/services"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                        >
                          All Services
                        </Link>
                        <div className="border-t border-gray-200 my-1"></div>
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            to={`/services/${category.slug}`}
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`text-white hover:text-red transition-colors duration-200 ${
                      isActivePath(item.path) ? 'text-red' : ''
                    }`}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Auth/Dashboard Links */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to="/dashboard"
                    className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-white hover:text-red transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-red transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-navy-light">
              {navItems.map((item) => (
                <div key={item.name}>
                  <Link
                    to={item.path}
                    className={`block px-3 py-2 text-white hover:text-red transition-colors ${
                      isActivePath(item.path) ? 'text-red' : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.hasDropdown && (
                    <div className="pl-6 space-y-1">
                      {categories.map((category) => (
                        <Link
                          key={category.id}
                          to={`/services/${category.slug}`}
                          className="block px-3 py-2 text-gray-300 hover:text-red transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="border-t border-gray-600 pt-2">
                {isAuthenticated ? (
                  <>
                    {isAdmin && (
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 text-white hover:text-red transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block px-3 py-2 text-white hover:text-red transition-colors w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-white hover:text-red transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
