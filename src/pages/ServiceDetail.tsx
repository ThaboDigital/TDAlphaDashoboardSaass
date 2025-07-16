import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight, Star, Shield } from 'lucide-react';
import { useServices } from '../context/ServiceContext';
import { useAuth } from '../context/AuthContext';

const ServiceDetail: React.FC = () => {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const { services } = useServices();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const service = services.find(s => s.slug === slug && s.category === category);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're looking for doesn't exist.</p>
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

  const handleOrderNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
    } else {
      navigate(`/checkout/${service.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-4">
                <Link
                  to={`/services/${category}`}
                  className="text-red hover:text-red-300 transition-colors capitalize"
                >
                  ← Back to {category?.replace('-', ' ')}
                </Link>
              </div>
              <div className="flex items-center mb-4">
                <h1 className="text-4xl md:text-5xl font-bold mr-4">
                  {service.name}
                </h1>
                {service.popular && (
                  <span className="bg-red px-3 py-1 rounded-full text-sm font-medium">
                    Popular
                  </span>
                )}
              </div>
              <p className="text-xl text-gray-300 mb-6">
                {service.description}
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-red mr-2" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-2" />
                  <span>4.9/5 rating</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white rounded-lg shadow-xl p-8 text-gray-900"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-red mb-2">
                  R{service.price.toLocaleString()}
                </div>
                <p className="text-gray-600">One-time payment</p>
              </div>
              
              <button
                onClick={handleOrderNow}
                className="w-full bg-red text-white py-4 rounded-lg font-semibold hover:bg-red-600 transition-colors mb-4"
              >
                Order Now
              </button>
              
              <div className="text-center text-sm text-gray-500">
                <div className="flex items-center justify-center mb-2">
                  <Shield className="w-4 h-4 mr-1" />
                  <span>Secure payment</span>
                </div>
                <p>30-day money-back guarantee</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                What's Included
              </h2>
              <div className="space-y-4">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Why Choose This Service?
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Professional Quality
                  </h3>
                  <p className="text-gray-600">
                    Every project is handled by our experienced team using industry best practices and latest technologies.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Fast Turnaround
                  </h3>
                  <p className="text-gray-600">
                    We understand your time is valuable. Our efficient processes ensure quick delivery without compromising quality.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ongoing Support
                  </h3>
                  <p className="text-gray-600">
                    We provide comprehensive support even after project completion to ensure your success.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Process
            </h2>
            <p className="text-xl text-gray-600">
              Simple, transparent, and efficient workflow
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Consultation', description: 'We discuss your requirements and goals' },
              { step: 2, title: 'Planning', description: 'Create detailed project plan and timeline' },
              { step: 3, title: 'Development', description: 'Our team brings your vision to life' },
              { step: 4, title: 'Delivery', description: 'Review, refine, and deliver your project' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-red text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
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
              Join hundreds of satisfied clients who have transformed their business with our services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleOrderNow}
                className="bg-red text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors inline-flex items-center justify-center"
              >
                Order Now - R{service.price.toLocaleString()}
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-navy transition-colors inline-flex items-center justify-center"
              >
                Have Questions?
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
