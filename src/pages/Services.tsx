import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Palette, Award, Briefcase } from 'lucide-react';
import { useServices } from '../context/ServiceContext';

const Services: React.FC = () => {
  const { categories } = useServices();

  const iconMap = {
    Globe,
    Palette,
    Award,
    Briefcase,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Professional digital services designed to help your business thrive in the digital world.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="text-red mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-16 h-16" />
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {category.description}
                  </p>
                  {category.services.length > 0 && (
                    <div className="mb-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {category.services.length} service{category.services.length !== 1 ? 's' : ''} available
                      </p>
                      <p className="text-lg font-semibold text-red">
                        Starting from R{Math.min(...category.services.map(s => s.price)).toLocaleString()}
                      </p>
                    </div>
                  )}
                  <Link
                    to={`/services/${category.slug}`}
                    className="bg-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors inline-flex items-center justify-center w-full group-hover:scale-105"
                  >
                    View Services
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Thabo Digital?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine creativity, technical expertise, and business insight to deliver exceptional results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Team</h3>
              <p className="text-gray-600">Our skilled professionals bring years of experience and cutting-edge knowledge to every project.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">We understand deadlines matter. Our efficient processes ensure timely delivery without compromising quality.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Ongoing Support</h3>
              <p className="text-gray-600">Our relationship doesn't end at delivery. We provide ongoing support to ensure your continued success.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Contact us today to discuss your project and get a free consultation.
            </p>
            <Link
              to="/contact"
              className="bg-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services;
