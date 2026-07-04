import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('temple_font_size') || 'medium';
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Remove existing font-size classes
    document.documentElement.classList.remove('font-size-medium', 'font-size-large', 'font-size-xlarge');
    // Add current font-size class
    document.documentElement.classList.add(`font-size-${fontSize}`);
    localStorage.setItem('temple_font_size', fontSize);
  }, [fontSize]);

  const login = async (email, password) => {
    const userData = await AuthService.login(email, password);
    setUser(userData);
    return userData;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const register = (name, email, password, phone) => {
    return AuthService.register(name, email, password, phone);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading, fontSize, setFontSize }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
