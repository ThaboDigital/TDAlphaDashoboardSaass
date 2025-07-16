import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Edit, Trash2, Home, Users, BarChart, Settings } from 'lucide-react';
import { useServices } from '../context/ServiceContext';
import { Service } from '../types';
import ServiceModal from '../components/Dashboard/ServiceModal';

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('services');
  const { services, categories, addService, updateService, deleteService } = useServices();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [serviceToEdit, setServiceToEdit] = useState<Service | null>(null);

  const tabs = [
    { id: 'services', name: 'Services', icon: Settings },
    { id: 'orders', name: 'Orders', icon: BarChart },
    { id: 'users', name: 'Users', icon: Users },
  ];

  const handleOpenAddModal = () => {
    setServiceToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (service: Service) => {
    setServiceToEdit(service);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setServiceToEdit(null);
  };

  const handleSubmitService = (serviceData: Omit<Service, 'id' | 'slug'> | Service) => {
    if ('id' in serviceData) {
      updateService(serviceData as Service);
    } else {
      addService(serviceData);
    }
    handleCloseModal();
  };

  const handleDeleteService = (serviceId: string) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      deleteService(serviceId);
    }
  };

  const mockOrders = [
    { id: '1', service: 'Basic Website', customer: 'John Doe', amount: 1800, status: 'pending' },
    { id: '2', service: 'Logo Design', customer: 'Jane Smith', amount: 500, status: 'completed' },
    { id: '3', service: 'E-commerce Website', customer: 'Bob Johnson', amount: 3500, status: 'processing' },
  ];

  const mockUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', role: 'user', joined: '2025-01-15' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'user', joined: '2025-01-10' },
    { id: '3', name: 'Admin User', email: 'admin@thabodigital.com', role: 'admin', joined: '2025-01-01' },
  ];

  return (
    <>
      <ServiceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitService}
        serviceToEdit={serviceToEdit}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <Link
                to="/"
                className="flex items-center space-x-2 text-red hover:text-red-600 transition-colors"
              >
                <Home className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red text-white rounded-md"><Settings className="w-6 h-6" /></div>
                <div className="ml-4"><p className="text-sm text-gray-600">Total Services</p><p className="text-2xl font-semibold text-gray-900">{services.length}</p></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-500 text-white rounded-md"><BarChart className="w-6 h-6" /></div>
                <div className="ml-4"><p className="text-sm text-gray-600">Active Orders</p><p className="text-2xl font-semibold text-gray-900">{mockOrders.filter(order => order.status !== 'completed').length}</p></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-500 text-white rounded-md"><Users className="w-6 h-6" /></div>
                <div className="ml-4"><p className="text-sm text-gray-600">Total Users</p><p className="text-2xl font-semibold text-gray-900">{mockUsers.length}</p></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-500 text-white rounded-md"><BarChart className="w-6 h-6" /></div>
                <div className="ml-4"><p className="text-sm text-gray-600">Revenue</p><p className="text-2xl font-semibold text-gray-900">R12,500</p></div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id ? 'border-red text-red' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                      <IconComponent className="w-4 h-4" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow">
            {activeTab === 'services' && (
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Services Management</h2>
                  <button onClick={handleOpenAddModal} className="bg-red text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-medium text-gray-700">Service</th><th className="text-left py-3 px-4 font-medium text-gray-700">Category</th><th className="text-left py-3 px-4 font-medium text-gray-700">Price</th><th className="text-left py-3 px-4 font-medium text-gray-700">Duration</th><th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th></tr></thead>
                    <tbody>
                      {services.map((service) => (
                        <tr key={service.id} className="border-b border-gray-100">
                          <td className="py-3 px-4"><div><div className="font-medium text-gray-900">{service.name}</div><div className="text-sm text-gray-500">{service.description.substring(0, 50)}...</div></div></td>
                          <td className="py-3 px-4 capitalize">{service.category.replace('-', ' ')}</td>
                          <td className="py-3 px-4 text-red font-semibold">R{service.price.toLocaleString()}</td>
                          <td className="py-3 px-4">{service.duration}</td>
                          <td className="py-3 px-4"><div className="flex space-x-2"><button onClick={() => handleOpenEditModal(service)} className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button><button onClick={() => handleDeleteService(service.id)} className="text-red hover:text-red-700"><Trash2 className="w-4 h-4" /></button></div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'orders' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Orders Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-medium text-gray-700">Order ID</th><th className="text-left py-3 px-4 font-medium text-gray-700">Service</th><th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th><th className="text-left py-3 px-4 font-medium text-gray-700">Amount</th><th className="text-left py-3 px-4 font-medium text-gray-700">Status</th><th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th></tr></thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-mono text-sm">#{order.id}</td><td className="py-3 px-4">{order.service}</td><td className="py-3 px-4">{order.customer}</td><td className="py-3 px-4 text-red font-semibold">R{order.amount.toLocaleString()}</td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' : order.status === 'processing' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>{order.status}</span></td>
                          <td className="py-3 px-4"><button className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {activeTab === 'users' && (
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Users Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead><tr className="border-b border-gray-200"><th className="text-left py-3 px-4 font-medium text-gray-700">Name</th><th className="text-left py-3 px-4 font-medium text-gray-700">Email</th><th className="text-left py-3 px-4 font-medium text-gray-700">Role</th><th className="text-left py-3 px-4 font-medium text-gray-700">Joined</th><th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th></tr></thead>
                    <tbody>
                      {mockUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-900">{user.name}</td><td className="py-3 px-4">{user.email}</td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-medium ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>{user.role}</span></td>
                          <td className="py-3 px-4">{user.joined}</td>
                          <td className="py-3 px-4"><button className="text-blue-600 hover:text-blue-800"><Edit className="w-4 h-4" /></button></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export export default Dashboard;
