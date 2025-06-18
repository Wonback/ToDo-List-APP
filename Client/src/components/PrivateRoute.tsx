import { Navigate } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }: { children: ReactElement }) => {

  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
