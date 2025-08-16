import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { Chrome as Home, Calendar, Users, Bell } from 'lucide-react-native';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="attendance" />
      <Stack.Screen name="faculty" />
      <Stack.Screen name="timeTable" />
      <Stack.Screen name="notices" />
      <Stack.Screen name="examResult" />
    </Stack>
  );
}