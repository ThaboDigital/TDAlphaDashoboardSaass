import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Clock, Star } from 'lucide-react';
import { useServices } from '../context/ServiceContext';

const ServiceCategory: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const { categories } = useServices();
  const categoryData = categories.find(cat => cat.slug === category);

  if (!categoryData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The service category you're looking for doesn't exist.</p>
          <Link
            to="/services"
            className="bg-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    );
  }

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
              {categoryData.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              {categoryData.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categoryData.services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-red transition-colors">
                        {service.name}
                      </h3>
                      {service.popular && (
                        <span className="bg-red text-white px-2 py-1 rounded-full text-xs font-medium">
                          Popular
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center mb-4">
                      <span className="text-3xl font-bold text-red">
                        R{service.price.toLocaleString()}
                      </span>
                      <div className="ml-4 flex items-center text-gray-500">
                        <Clock className="w-4 h-4 mr-1" />
                        <span className="text-sm">{service.duration}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-6">
                      {service.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">What's included:</h4>
                      <ul className="space-y-1">
                        {service.features.slice(0, 4).map((feature, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-700">
                            <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                        {service.features.length > 4 && (
                          <li className="text-sm text-gray-500">
                            +{service.features.length - 4} more features
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <Link
                      to={`/services/${categoryData.slug}/${service.slug}`}
                      className="bg-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors inline-flex items-center justify-center w-full group-hover:scale-105"
                    >
                      View Details
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Services Yet</h2>
                <p className="text-gray-600">There are currently no services available in this category. Please check back later.</p>
            </div>
          )}
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
              Need a Custom Solution?
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Don't see exactly what you need? We can create custom solutions tailored to your specific requirements.
            </p>
            <Link
              to="/contact"
              className="bg-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center"
            >
              Get Custom Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceCategory;
