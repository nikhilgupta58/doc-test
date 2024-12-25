import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/lib/axios';
import { useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  tier: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export function useAuth() {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('auth_token')
  );
  console.log(localStorage.getItem('auth_token'))
  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await axiosInstance.post('/api/auth/login', credentials);
      localStorage.setItem('auth_token', data.token);
      setIsAuthenticated(true);
      return data;
    },
  });

  const register = useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await axiosInstance.post('/api/auth/register', credentials);
      return data;
    },
  });

  const logout = () => {
    localStorage.removeItem('auth_token');
    setIsAuthenticated(false);
    queryClient.clear();
  };

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('/api/auth/tier');
      return data as User;
    },
    enabled: isAuthenticated,
  });

  return {
    user,
    login,
    register,
    logout,
    isAuthenticated,
  };
}