import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';

const AUTH_KEY = 'user_session';
const REMEMBER_KEY = 'remember_credentials';

// Mock user data
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@student.edu',
  schoolName: 'Tech University',
  studentId: 'TU2024001',
  class: 'Computer Science',
  section: 'A',
};

export const authService = {
  async login(email: string, password: string, rememberMe: boolean = false): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'john.doe@student.edu' && password === 'password123') {
      const user = { ...mockUser, email };
      
      // Store session
      await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(user));
      
      // Store credentials if remember me is checked
      if (rememberMe) {
        await SecureStore.setItemAsync(REMEMBER_KEY, JSON.stringify({ email, password }));
      } else {
        await SecureStore.deleteItemAsync(REMEMBER_KEY);
      }
      
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  },

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_KEY);
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await SecureStore.getItemAsync(AUTH_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  async getRememberedCredentials(): Promise<{ email: string; password: string } | null> {
    try {
      const credentials = await SecureStore.getItemAsync(REMEMBER_KEY);
      return credentials ? JSON.parse(credentials) : null;
    } catch (error) {
      return null;
    }
  },

  async checkAuthStatus(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return user !== null;
  }
};