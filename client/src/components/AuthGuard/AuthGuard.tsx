import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks';
import Spinner from '@/components/Spinner';


const AuthGuard: React.FC = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  if (!user) {
    window.location.href = 'http://localhost:3000/auth/google/login';
  }

  return <Outlet />;
};

export default AuthGuard;