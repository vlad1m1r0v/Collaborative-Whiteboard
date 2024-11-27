import React, { createContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
}

interface Props {
  user: User | undefined;
  isLoading: boolean;
  logout: () => void;
}

const initialContext: Props = {
  user: undefined,
  isLoading: false,
  logout: () => {
  },
};

const AuthContext = createContext<Props>(initialContext);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();

  const { isLoading, data: user } = useQuery<User>({
    queryKey: ['user'],
    queryFn: () => axiosInstance.get<User>('users/profile').then((res) => res.data),
    staleTime: Infinity,
  });

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = 'http://localhost:3000/auth/google/login';
  };

  const logoutMutation = useMutation({
    mutationFn: () => axiosInstance.post('auth/signout'),
    onSettled: async () => {
      handleLogout();
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      console.error('Failed to sign out:', error);
    },
  });

  const logout = () => {
    logoutMutation.mutate();
  };
  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export {
  AuthContext,
  AuthProvider,
};