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
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('travelease_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    // First try to find in admins table
    let isAdmin = false;
    let { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', trimmedEmail)
      .eq('password', trimmedPassword)
      .single();

    if (data && !error) {
      isAdmin = true;
    } else {
      // Not found in admins, try users table
      const userResult = await supabase
        .from('users')
        .select('*')
        .eq('email', trimmedEmail)
        .eq('password', trimmedPassword)
        .single();
      
      data = userResult.data;
      error = userResult.error;
    }

    if (error || !data) {
      throw new Error('Invalid email or password. Please check your credentials and try again.');
    }

    const userData: User = {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      role: isAdmin ? 'admin' : 'user',
    };

    setUser(userData);
    localStorage.setItem('travelease_user', JSON.stringify(userData));
    return userData;
  };

  const register = async (email: string, password: string, fullName: string) => {
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedName = fullName.trim();

    if (trimmedPassword.length < 6) {
      throw new Error('Password must be at least 6 characters long.');
    }

    if (!trimmedName) {
      throw new Error('Please enter your full name.');
    }

    // Check if email already exists
    const { data: existing } = await supabase
      .from('users')
      .select('id')
      .eq('email', trimmedEmail)
      .single();

    if (existing) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    // Also check admins table
    const { data: existingAdmin } = await supabase
      .from('admins')
      .select('id')
      .eq('email', trimmedEmail)
      .single();

    if (existingAdmin) {
      throw new Error('An account with this email already exists. Please sign in instead.');
    }

    const { data, error } = await supabase
      .from('users')
      .insert([{ email: trimmedEmail, password: trimmedPassword, full_name: trimmedName }])
      .select()
      .single();

    if (error) {
      // Handle common Supabase errors
      if (error.code === '23505') {
        throw new Error('An account with this email already exists.');
      }
      if (error.code === '42501' || error.message.includes('policy')) {
        throw new Error('Registration is temporarily unavailable. Please contact the administrator.');
      }
      throw new Error('Registration failed: ' + error.message);
    }

    if (!data) {
      throw new Error('Registration failed. Please try again.');
    }

    const userData: User = {
      id: data.id,
      email: data.email,
      full_name: data.full_name,
      role: 'user',
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
