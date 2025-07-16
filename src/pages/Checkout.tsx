import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Shield, Check, ArrowLeft } from 'lucide-react';
import { useServices } from '../context/ServiceContext';

const Checkout: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const { getServiceById } = useServices();
  const [selectedPayment, setSelectedPayment] = useState('payfast');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const service = getServiceById(serviceId || '');

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Service Not Found</h1>
          <p className="text-gray-600 mb-8">The service you're trying to order doesn't exist.</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors"
          >
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  const paymentMethods = [
    {
      id: 'payfast',
      name: 'PayFast',
      description: 'Secure online payment',
      logo: 'https://via.placeholder.com/80x40?text=PayFast'
    },
    {
      id: 'yoco',
      name: 'Yoco',
      description: 'Card payments',
      logo: 'https://via.placeholder.com/80x40?text=Yoco'
    },
    {
      id: 'paystack',
      name: 'Paystack',
      description: 'Multiple payment options',
      logo: 'https://via.placeholder.com/80x40?text=Paystack'
    },
    {
      id: 'eft',
      name: 'EFT',
      description: 'Direct bank transfer',
      logo: 'https://via.placeholder.com/80x40?text=EFT'
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setOrderComplete(true);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Complete!</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We'll start working on your project immediately and keep you updated on the progress.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order Details:</p>
            <p className="font-semibold text-gray-900">{service.name}</p>
            <p className="text-red font-bold">R{service.price.toLocaleString()}</p>
          </div>
          <button
            onClick={() => navigate('/')}
            className="bg-red text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors w-full"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-red hover:text-red-600 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red">R{service.price.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Included features:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-700">
                      <Check className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>R{service.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>VAT (15%)</span>
                  <span>R{(service.price * 0.15).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>R{(service.price * 1.15).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment</h2>
            
            <div className="space-y-4 mb-6">
              <h3 className="font-semibold text-gray-900">Select Payment Method</h3>
              
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedPayment === method.id 
                      ? 'border-red bg-red-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-3 flex items-center justify-center">
                        {selectedPayment === method.id && (
                          <div className="w-2 h-2 bg-red rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{method.name}</p>
                        <p className="text-sm text-gray-600">{method.description}</p>
                      </div>
                    </div>
                    <img 
                      src={method.logo} 
                      alt={method.name}
                      className="h-8 object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-sm text-gray-600">Secure payment processing</span>
              </div>
              
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full bg-red text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Pay R{(service.price * 1.15).toFixed(2)}
                  </>
                )}
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By completing this purchase, you agree to our Terms of Service and Privacy Policy.
                You will receive a confirmation email with project details.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
