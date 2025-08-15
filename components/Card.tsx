import React from 'react';
import { View, Pressable } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onPress?: () => void;
  variant?: 'default' | 'elevated' | 'outline';
}

export default function Card({ children, className = '', onPress, variant = 'default' }: CardProps) {
  const baseClasses = 'rounded-xl p-4';
  
  const variantClasses = {
    default: 'bg-white',
    elevated: 'bg-white shadow-sm',
    outline: 'bg-white border border-gray-200'
  };

  const Component = onPress ? Pressable : View;

  return (
    <Component
      onPress={onPress}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${onPress ? 'active:scale-95' : ''}`}
    >
      {children}
    </Component>
  );
}