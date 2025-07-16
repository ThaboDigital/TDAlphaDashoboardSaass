import { ServiceCategory, Service, User } from '../types';

export const mockServices: Service[] = [
  {
    id: '1',
    name: 'Basic Website',
    slug: 'basic-website',
    description: 'Professional business website with responsive design, contact forms, and basic SEO optimization.',
    price: 1800,
    category: 'web-design',
    features: ['Responsive Design', 'Contact Forms', 'Basic SEO', '5 Pages', 'Mobile Optimized'],
    duration: '5-7 business days',
    popular: true,
  },
  {
    id: '2',
    name: 'E-commerce Website',
    slug: 'ecommerce-website',
    description: 'Full-featured online store with payment integration, inventory management, and customer accounts.',
    price: 3500,
    category: 'web-design',
    features: ['Payment Integration', 'Inventory Management', 'Customer Accounts', 'Order Management', 'Analytics'],
    duration: '10-14 business days',
    popular: true,
  },
  {
    id: '3',
    name: 'Logo Design',
    slug: 'logo-design',
    description: 'Professional logo design with multiple concepts, revisions, and file formats.',
    price: 500,
    category: 'graphic-design',
    features: ['3 Concepts', 'Unlimited Revisions', 'Multiple File Formats', 'Brand Guidelines', 'Commercial Rights'],
    duration: '3-5 business days',
  },
  {
    id: '4',
    name: 'Company Registration',
    slug: 'company-registration',
    description: 'Complete company registration service with CIPC filing and documentation.',
    price: 450,
    category: 'business-consulting',
    features: ['CIPC Filing', 'Company Documents', 'Tax Registration', 'Bank Letter', 'Legal Compliance'],
    duration: '7-10 business days',
  },
];

export const mockCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Web Design',
    slug: 'web-design',
    description: 'Professional websites that convert visitors into customers',
    icon: 'Globe',
    services: mockServices.filter(s => s.category === 'web-design'),
  },
  {
    id: '2',
    name: 'Graphic Design',
    slug: 'graphic-design',
    description: 'Eye-catching designs that represent your brand perfectly',
    icon: 'Palette',
    services: mockServices.filter(s => s.category === 'graphic-design'),
  },
  {
    id: '3',
    name: 'Branding',
    slug: 'branding',
    description: 'Complete brand identity solutions for your business',
    icon: 'Award',
    services: mockServices.filter(s => s.category === 'branding'),
  },
  {
    id: '4',
    name: 'Business Consulting',
    slug: 'business-consulting',
    description: 'Expert guidance to grow and formalize your business',
    icon: 'Briefcase',
    services: mockServices.filter(s => s.category === 'business-consulting'),
  },
];

export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  isAuthenticated: false,
};

export const mockAdmin: User = {
  id: 'admin',
  name: 'Admin User',
  email: 'admin@thabodigital.com',
  role: 'admin',
  isAuthenticated: true,
};
