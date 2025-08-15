import React from 'react';
import { View, Text } from 'react-native';

interface BadgeProps {
  count: number;
  className?: string;
}

export default function Badge({ count, className = '' }: BadgeProps) {
  if (count <= 0) return null;

  return (
    <View className={`absolute -top-1 -right-1 bg-red-500 rounded-full min-w-5 h-5 items-center justify-center ${className}`}>
      <Text className="text-white text-xs font-inter-bold">
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
}