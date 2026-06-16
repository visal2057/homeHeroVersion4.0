import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // On initial app boot, check if user data is stored locally
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user_data');

    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Use this function inside your Login page code upon getting a 200 response
  const login = (token, userData, redirectPath) => {
    const normalizedRole = String(userData.role || '').toLowerCase();
    const normalizedUserData = { ...userData, role: normalizedRole };

    localStorage.setItem('token', token);
    localStorage.setItem('user_data', JSON.stringify(normalizedUserData));
    localStorage.setItem('loginTime', Date.now().toString());
    setUser(normalizedUserData);

    if (redirectPath) {
      navigate(redirectPath);
      return;
    }

    // Redirect automatically to the correct interface based on normalized roles
    if (normalizedRole === 'provider' || normalizedRole === 'service_provider') {
      navigate('/provider/dashboard');
    } else if (normalizedRole === 'customer' || normalizedRole === 'client') {
      navigate('/dashboard');
    } else if (normalizedRole === 'system_admin') {
      navigate('/admin/system');
    } else if (normalizedRole === 'verification_admin') {
      navigate('/admin/verify');
    } else {
      navigate('/');
    }
  };

  // Universal logout execution
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('loginTime');
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);