// File: client/src/components/dontDie/HNTDPrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useHNTDAuth } from '../../context/HNTDAuthContext';

const HNTDPrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useHNTDAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/hntd-home" replace />;
};

export default HNTDPrivateRoute;
