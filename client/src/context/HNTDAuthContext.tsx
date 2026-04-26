// File: client/src/context/hntdAuthContext.tsx

import React, { createContext, useContext, useState } from 'react';

const TOKEN_KEY = 'hntd_token';
const USER_KEY  = 'hntd_user';

interface HNTDUser { id: number; username: string; characterName: string; }

interface HNTDAuthContextType {
  user: HNTDUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login:      (user: HNTDUser, token: string) => void;
  logout:     () => void;
  updateUser: (user: HNTDUser, token: string) => void;
}

const HNTDAuthContext = createContext<HNTDAuthContextType | null>(null);

export const HNTDAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user,  setUser]  = useState<HNTDUser | null>(() => {
    const stored = localStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));

  const login = (user: HNTDUser, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(USER_KEY,  JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const updateUser = (user: HNTDUser, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem(USER_KEY,  JSON.stringify(user));
    localStorage.setItem(TOKEN_KEY, token);
  };

  return (
    <HNTDAuthContext.Provider value={{ user, token, isAuthenticated: !!user, login, logout, updateUser }}>
      {children}
    </HNTDAuthContext.Provider>
  );
};

export const useHNTDAuth = () => {
  const ctx = useContext(HNTDAuthContext);
  if (!ctx) throw new Error('useHNTDAuth must be used within HNTDAuthProvider');
  return ctx;
};
