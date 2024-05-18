import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import jwt from 'jsonwebtoken'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  // TODO: get token from BE
  useEffect(() => {
    const storedToken = localStorage.getItem('Authorization');
    const secretKey = 'your-secret-key'

    try {
      jwt.verify(storedToken, secretKey)
      setToken(storedToken)
    } catch (error) {
      setToken(null)
      if (router.pathname !== '/login' && router.pathname !== '/about') {
        router.push('/login');
      }
    }

  }, [router])

  const login = async (phoneNumber, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, password }),
    });

    if (res.ok) {
      const data = await res.json();
      window.localStorage.setItem('Authorization', `${data.token}`)

      setToken(data.token);
      router.push('/');
    } else {
      console.error('Login failed');
    }
  };

  const logout = () => {
    setToken(null);
    router.push('/login');
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  const getToken = () => {
    return token;
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
