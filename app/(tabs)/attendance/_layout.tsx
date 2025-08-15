import React from 'react';
import { Stack } from 'expo-router';

export default function AttendanceLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
          headerShown: false
        }} 
      />
      <Stack.Screen 
        name="[subject]" 
        options={{ 
          title: 'Subject Details',
          headerStyle: { backgroundColor: '#3B82F6' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
    </Stack>
  );
}