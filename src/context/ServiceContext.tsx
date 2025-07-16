import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Service, ServiceCategory } from '../types';
import { mockServices, mockCategories } from '../data/mockData';

interface ServiceContextType {
  services: Service[];
  categories: ServiceCategory[];
  getServiceById: (id: string) => Service | undefined;
  addService: (service: Omit<Service, 'id' | 'slug'>) => void;
  updateService: (service: Service) => void;
  deleteService: (serviceId: string) => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const useServices = () => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
};

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<Service[]>(mockServices);
  
  const categories = useMemo<ServiceCategory[]>(() => {
    const updatedCategories = mockCategories.map(category => ({
      ...category,
      services: services.filter(s => s.category === category.slug),
    }));
    return updatedCategories;
  }, [services]);

  const getServiceById = (id: string) => {
    return services.find(s => s.id === id);
  };

  const addService = (service: Omit<Service, 'id' | 'slug'>) => {
    const newService: Service = {
      ...service,
      id: uuidv4(),
      slug: service.name.toLowerCase().replace(/\s+/g, '-'),
    };
    setServices(prevServices => [...prevServices, newService]);
  };

  const updateService = (updatedService: Service) => {
    setServices(prevServices =>
      prevServices.map(service =>
        service.id === updatedService.id ? { ...updatedService, slug: updatedService.name.toLowerCase().replace(/\s+/g, '-') } : service
      )
    );
  };

  const deleteService = (serviceId: string) => {
    setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  };

  const value = {
    services,
    categories,
    getServiceById,
    addService,
    updateService,
    deleteService,
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};
