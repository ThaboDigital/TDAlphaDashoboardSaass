import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold mb-4">Thabo Digital</h3>
            <p className="text-gray-300 mb-4">
              Professional digital services to help your business grow online. From web design to business consulting, we have you covered.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-red transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-red transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/web-design" className="text-gray-300 hover:text-red transition-colors">
                  Web Design
                </Link>
              </li>
              <li>
                <Link to="/services/graphic-design" className="text-gray-300 hover:text-red transition-colors">
                  Graphic Design
                </Link>
              </li>
              <li>
                <Link to="/services/branding" className="text-gray-300 hover:text-red transition-colors">
                  Branding
                </Link>
              </li>
              <li>
                <Link to="/services/business-consulting" className="text-gray-300 hover:text-red transition-colors">
                  Business Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-red transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-red transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-red transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-red transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-red" />
                <span className="text-gray-300">info@thabodigital.com</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red" />
                <span className="text-gray-300">+27 11 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-red" />
                <span className="text-gray-300">Johannesburg, South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; 2025 Thabo Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
