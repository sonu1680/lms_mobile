import {  Pressable, Text } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

export default function BackButton() {
    const router=useRouter()
  return (
    <Pressable onPress={router.back} className='pr-4' >
      <Ionicons
        name="arrow-back-outline"
        size={25}
        color={'white'}
        style={{ opacity: 0.95 }}
      />
    </Pressable>
  );
}