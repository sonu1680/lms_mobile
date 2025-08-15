import React from 'react';
import { Stack } from 'expo-router';

export default function FacultyLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
             <Stack.Screen name="facultyProfile" />
     
    </Stack>
  );
}