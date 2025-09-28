import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '@/types';
import { authService } from '@/services/authService';

interface AuthContextType extends AuthState {
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: true,
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await authService.getCurrentUser();
      setState({
        isAuthenticated: !!user,
        user,
        loading: false,
      });
    } catch (error) {
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    }
  };

  const login = async (phone: string, password: string, rememberMe: boolean = false) => {
    try {

      setState(prev => ({ ...prev, loading: true }));
      const user = await authService.login(phone, password, rememberMe);
      setState({
        isAuthenticated: true,
        user,
        loading: false,
      });
    } catch (error) {
      setState(prev => ({ ...prev, loading: false }));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}