import * as SecureStore from 'expo-secure-store';
import { User } from '@/types';
import axios from "axios"
const AUTH_KEY = 'user_session';
const REMEMBER_KEY = 'remember_credentials';

const getUserData=async(phone:string):Promise<User[]|null>=>{
try {
    const data = await axios.get(
      `${process.env.BACKEND_URL}/student/getStudentDahboard?parentPhone=${phone}&studentPhone=${phone}`
    );
    return data.data;
} catch (error) {
  return null
}

} 


export const authService = {
  async login(phone: string, password: string, rememberMe: boolean = false): Promise<User[]> {
    const studentData =await getUserData(phone);
    if(!studentData || studentData.length===0) {
      throw new Error('Invalid phone or password');}

      // Store session
      await SecureStore.setItemAsync(AUTH_KEY, JSON.stringify(studentData));

      // Store credentials if remember me is checked
      if (rememberMe) {
        await SecureStore.setItemAsync(
          REMEMBER_KEY,
          JSON.stringify({ phone, password })
        );
      } else {
        await SecureStore.deleteItemAsync(REMEMBER_KEY);
      }

      return studentData;
    
  },

  async logout(): Promise<void> {
    await SecureStore.deleteItemAsync(AUTH_KEY);
  },

  async getCurrentUser(): Promise<User[] | null> {
    try {
      const userData = await SecureStore.getItemAsync(AUTH_KEY);
      console.log("authservice",userData) 
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  },

  async getRememberedCredentials(): Promise<{ phone: string; password: string } | null> {
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