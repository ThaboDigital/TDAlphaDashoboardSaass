import React, { useState, useEffect } from 'react';
import { Service } from '../../types';
import { X } from 'lucide-react';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (service: any) => void;
  serviceToEdit?: Service | null;
}

const ServiceModal: React.FC<ServiceModalProps> = ({ isOpen, onClose, onSubmit, serviceToEdit }) => {
  const initialFormState = {
    name: '',
    description: '',
    price: 0,
    category: 'web-design',
    features: '',
    duration: '',
    popular: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (serviceToEdit) {
      setFormData({
        ...serviceToEdit,
        features: serviceToEdit.features.join(', '),
      });
    } else {
      setFormData(initialFormState);
    }
  }, [serviceToEdit, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const serviceData = {
      ...formData,
      price: Number(formData.price),
      features: formData.features.split(',').map(f => f.trim()),
    };
    onSubmit(serviceData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {serviceToEdit ? 'Edit Service' : 'Add New Service'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (R)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Duration</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md">
              <option value="web-design">Web Design</option>
              <option value="graphic-design">Graphic Design</option>
              <option value="branding">Branding</option>
              <option value="business-consulting">Business Consulting</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Features (comma-separated)</label>
            <input type="text" name="features" value={formData.features} onChange={handleChange} required className="w-full mt-1 p-2 border rounded-md"/>
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="popular" name="popular" checked={formData.popular} onChange={handleChange} className="h-4 w-4 text-red border-gray-300 rounded focus:ring-red"/>
            <label htmlFor="popular" className="ml-2 block text-sm text-gray-900">Mark as Popular</label>
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-red text-white rounded-md hover:bg-red-600">
              {serviceToEdit ? 'Update Service' : 'Add Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceModal;
