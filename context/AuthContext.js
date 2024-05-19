import React, { createContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getMetaUserData } from './getMetaUserData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();

  const [token, setToken] = useState(null);
  const [needOTP, setNeedOTP] = useState(false);

  useEffect(() => {
    //TODO: create an interceptor and verify only when res.status === 401
    const verifyToken = async () => {
      try {
        const storedToken = localStorage.getItem('Authorization');
        await fetch('/api/auth/jwt-verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': storedToken
          },
        });
        setToken(storedToken)
      } catch (error) {
        setToken(null)
        if (router.pathname !== '/login' && router.pathname !== '/about') {
          router.push('/login');
        }
      }
    }

    verifyToken()
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

      if (data.needOTP) {
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
