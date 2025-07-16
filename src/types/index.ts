export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: string;
  features: string[];
  duration: string;
  image?: string;
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  services: Service[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  isAuthenticated: boolean;
}

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  amount: number;
  paymentMethod: 'payfast' | 'yoco' | 'paystack' | 'eft';
  createdAt: string;
}

export interface PaymentProvider {
  name: string;
  id: 'payfast' | 'yoco' | 'paystack' | 'eft';
  logo: string;
  isEnabled: boolean;
}
