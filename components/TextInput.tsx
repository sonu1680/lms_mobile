import React from 'react';
import { TextInput as RNTextInput, View, Text } from 'react-native';

interface TextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  className?: string;
}

export default function TextInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'sentences',
  className = ''
}: TextInputProps) {
  return (
    <View className={`mb-4 ${className}`}>
      {label && (
        <Text className="text-sm font-inter-medium text-gray-700 mb-2">
          {label}
        </Text>
      )}
      <RNTextInput
        className={`border rounded-lg px-4 py-3 text-base font-inter-regular ${
          error ? 'border-red-500' : 'border-gray-300'
        } focus:border-primary-500`}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
      />
      {error && (
        <Text className="text-red-500 text-xs font-inter-regular mt-1">
          {error}
        </Text>
      )}
    </View>
  );
}