import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className = ''
}: ButtonProps) {
  const baseClasses = 'rounded-lg items-center justify-center flex-row';
  
  const variantClasses = {
    primary: 'bg-primary-500 active:bg-primary-600',
    secondary: 'bg-secondary-500 active:bg-secondary-600',
    outline: 'border-2 border-primary-500 active:bg-primary-50'
  };

  const sizeClasses = {
    small: 'px-3 py-2',
    medium: 'px-4 py-3',
    large: 'px-6 py-4'
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-primary-500'
  };

  const textSizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg'
  };

  const disabledClasses = disabled ? 'opacity-50' : '';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {loading && (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' ? '#3B82F6' : 'white'} 
          className="mr-2"
        />
      )}
      <Text className={`${textColorClasses[variant]} ${textSizeClasses[size]} font-inter-semibold`}>
        {title}
      </Text>
    </Pressable>
  );
}