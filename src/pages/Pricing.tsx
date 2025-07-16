import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Star } from 'lucide-react';
import { useServices } from '../context/ServiceContext';

const Pricing: React.FC = () => {
  const { services } = useServices();
  const popularServices = services.filter(service => service.popular);
  const allServices = [...services].sort((a, b) => a.price - b.price);

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
              Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-300 max-w-2xl mx-auto"
            >
              Professional services at competitive prices. No hidden fees, no surprises.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Most Popular Services
            </h2>
            <p className="text-xl text-gray-600">
              Our clients' favorite choices
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow relative"
              >
                <div className="absolute top-0 left-0 right-0 bg-red text-white text-center py-2">
                  <div className="flex items-center justify-center">
                    <Star className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">Most Popular</span>
                  </div>
                </div>
                
                <div className="p-8 pt-16">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {service.name}
                    </h3>
                    <div className="text-4xl font-bold text-red mb-2">
                      R{service.price.toLocaleString()}
                    </div>
                    <p className="text-gray-600">One-time payment</p>
                  </div>
                  
                  <p className="text-gray-600 mb-6 text-center">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Link
                    to={`/services/${service.category}/${service.slug}`}
                    className="w-full bg-red text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center justify-center"
                  >
                    Order Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Services Table */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              All Services
            </h2>
            <p className="text-xl text-gray-600">
              Complete pricing overview
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
              <thead className="bg-navy text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Service</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Duration</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {allServices.map((service, index) => (
                  <motion.tr
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div>
                          <div className="font-semibold text-gray-900 flex items-center">
                            {service.name}
                            {service.popular && (
                              <Star className="w-4 h-4 text-yellow-400 ml-2" />
                            )}
                          </div>
                          <div className="text-gray-600 text-sm">
                            {service.description.length > 60 
                              ? service.description.substring(0, 60) + '...' 
                              : service.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="capitalize text-gray-700">
                        {service.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {service.duration}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-2xl font-bold text-red">
                        R{service.price.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/services/${service.category}/${service.slug}`}
                        className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
                      >
                        View Details
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Are there any hidden fees?
              </h3>
              <p className="text-gray-600">
                No hidden fees. The price you see is the price you pay. All our services are transparently priced with no surprises.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you offer payment plans?
              </h3>
              <p className="text-gray-600">
                Yes, we offer flexible payment options including installment plans for larger projects. Contact us to discuss your needs.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major payment methods including PayFast, Yoco, Paystack, and EFT transfers for your convenience.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Do you offer refunds?
              </h3>
              <p className="text-gray-600">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied with our service, we'll make it right or refund your money.
              </p>
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
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
              Get started today with our professional services. No commitment, no hidden fees.
            </p>
            <Link
              to="/contact"
              className="bg-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center"
            >
              Get Free Quote
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
