import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Spin } from 'antd';
import { ROUTES } from '../constants/routes';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isFetchingUserInfo } = useAuth();

  if (isFetchingUserInfo) {
    return <Spin size="large" className="spin-center" />;
  }

  if (!user?.username) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
