// File: client/src/components/ProtectedRoute.tsx

// React
import React from 'react';
import { Navigate } from 'react-router-dom';

// Auth
import { useAuth } from '../context/authContext';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
