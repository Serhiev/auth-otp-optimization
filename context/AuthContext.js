import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const router = useRouter();

  // TODO: get token from BE
  useEffect(() => {
    const storedToken = localStorage.getItem('Authorization');

    if (storedToken) {
      setToken(storedToken)
    } else {
      if (router.pathname !== '/login' && router.pathname !== '/about') {
        router.push('/login');
      }
    }
  }, [router]);

  const login = async (username, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
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
