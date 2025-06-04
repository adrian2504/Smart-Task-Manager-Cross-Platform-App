// src/hooks/useAuth.tsx
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config/api';

type AuthContextType = {
  user: string | null;
  loading: boolean;
  error: string | null;
  /** return the username (or null) instead of a boolean */
  login(email: string, password: string): Promise<string | null>;
  signup(username: string, email: string, password: string): Promise<string | null>;
  logout(): void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser]       = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  // src/hooks/useAuth.tsx
const login = async (email: string, password: string) => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    // server must return { username: "...", token: "..." }
    setUser(res.data.username);
    return true;
  } catch (err: any) {
    setError(err.response?.data?.error || "Login failed");
    return false;
  } finally {
    setLoading(false);
  }
};


  const signup = async (username: string, email: string, password: string) => {
  setLoading(true);
  setError(null);
  try {
    const res = await axios.post(`${BASE_URL}/auth/signup`, {
      username,
      email,
      password,
    });                                     // ⬇️ return it
    setUser(res.data.username);
    return res.data.username as string;     //  ← username
  } catch (err: any) {
    setError(err.response?.data?.error || 'Signup failed');
    return null;
  } finally {
    setLoading(false);
  }
};


  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
};
