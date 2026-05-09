import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase.ts';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, fullName: string) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('travelease_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // First try to find in admins table
    let { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', email)
      .eq('password', password)
      .single();

    // If not found in admins, try users table
    if (error || !data) {
      const userResult = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();
      
      data = userResult.data;
      error = userResult.error;
    }

    if (error || !data) {
      throw new Error('Invalid email or password');
    }

    const userData: User = {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      role: data.role || 'user',
    };

    setUser(userData);
    localStorage.setItem('travelease_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (email: string, password: string, fullName: string) => {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password, full_name: fullName, role: 'user' }])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    const userData: User = {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      role: data.role,
    };

    setUser(userData);
    localStorage.setItem('travelease_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('travelease_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
