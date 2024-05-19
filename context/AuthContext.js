import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import jwt from 'jsonwebtoken'
import { getMetaUserData } from './getMetaUserData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [needOTP, setNeedOTP] = useState(false);
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
    const metaUserData = await getMetaUserData()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, password, metaUserData }),
    });

    if (res.ok) {
      const data = await res.json();

      if(data.needOTP) {
        return setNeedOTP(true)
      }

      window.localStorage.setItem('Authorization', `${data.token}`)
      setToken(data.token);
      router.push('/');
    } else {
      window.alert('User is not found. Please, try again.')
    }
  };

  const loginOTP = async (phoneNumber, password, otp) => {
    const res = await fetch('/api/auth/login-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phoneNumber, password, otp }),
    });

    if (res.ok) {
      const data = await res.json();
      window.localStorage.setItem('Authorization', `${data.token}`)
      setToken(data.token);
      setNeedOTP(false)
      router.push('/');
    } else {
      window.alert('Something went wrong. Please, try again.')
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
    <AuthContext.Provider value={{ token, login, loginOTP, logout, isAuthenticated, getToken, needOTP }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
