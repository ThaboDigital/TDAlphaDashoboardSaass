import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { mockUser, mockAdmin } from '../data/mockData';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication logic
    if (email === 'admin@thabodigital.com' && password === 'admin123') {
      const adminUser = { ...mockAdmin, isAuthenticated: true };
      setUser(adminUser);
      localStorage.setItem('user', JSON.stringify(adminUser));
      return true;
    } else if (email === 'user@example.com' && password === 'user123') {
      const regularUser = { ...mockUser, isAuthenticated: true };
      setUser(regularUser);
      localStorage.setItem('user', JSON.stringify(regularUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = user?.isAuthenticated || false;
  const isAdmin = user?.role === 'admin' || false;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
