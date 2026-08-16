import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, pass: string) => Promise<boolean>;
  register: (name: string, email: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuth() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await authService.getCurrentUser();
          if (res.success && res.data?.user) {
            setUser(res.data.user);
          } else {
            // Default demo user if token present
            setUser({ id: 'usr-1', email: 'alex.morgan@example.com', name: 'Alex Morgan' });
          }
        } catch (e) {
          setUser({ id: 'usr-1', email: 'alex.morgan@example.com', name: 'Alex Morgan' });
        }
      }
      setLoading(false);
    }
    checkAuth();
  }, []);

  const login = async (email: string, pass: string): Promise<boolean> => {
    try {
      const res = await authService.login(email, pass);
      if (res.success && res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const register = async (name: string, email: string, pass: string): Promise<boolean> => {
    try {
      const res = await authService.register(name, email, pass);
      if (res.success && res.data?.token) {
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
