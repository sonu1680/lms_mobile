import React from 'react';
import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function FacultyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="facultyProfile"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
