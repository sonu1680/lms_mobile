import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

export default function IndexScreen() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  
  useEffect(() => {
    if (!loading) {
      if (isAuthenticated) {
        router.replace('/studentList');
      } else {
        router.replace('/login');
      }
    }
  }, [isAuthenticated, loading, router]);

  return (
    <View className="flex-1 bg-gray-50 items-center justify-center">
      <ActivityIndicator size="large" color="#3B82F6" />
    </View>
  );
}