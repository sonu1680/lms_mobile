import React, { useState, useEffect } from 'react';
import { View, Text, Alert, KeyboardAvoidingView, ScrollView, Platform, Pressable } from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/authService';
import { useRouter } from 'expo-router';
import TextInput from '@/components/TextInput';
import Button from '@/components/Button';

export default function LoginScreen() {
  const [phone, setPhone] = useState('9724929634');
  const [password, setPassword] = useState('123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; password?: string }>({});

  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    loadRememberedCredentials();
  }, []);

  const loadRememberedCredentials = async () => {
    const credentials = await authService.getRememberedCredentials();
    if (credentials) {
      setPhone(credentials.phone);
      setPassword(credentials.password);
      setRememberMe(true);
    }
  };

  const validateForm = () => {
    const newErrors: { phone?: string; password?: string } = {};

    if (!phone) {
      newErrors.phone = 'Phone is required';
    } 

    if (!password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await login(phone, password, rememberMe);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-gray-50"
    >
      <ScrollView className="flex-1" contentContainerClassName="justify-center px-6 py-12">
        <View className="bg-white rounded-2xl p-8 shadow-sm">
          <Text className="text-3xl font-inter-bold text-gray-900 text-center mb-2">
            Welcome Back
          </Text>
          <Text className="text-base font-inter-regular text-gray-600 text-center mb-8">
            Sign in to your LMS account
          </Text>

          <TextInput
            label="Phone Number"
            placeholder="Enter your number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="numeric"
            autoCapitalize="none"
            error={errors.phone}
          />

          <View className="mb-4">
            <Text className="text-sm font-inter-medium text-gray-700 mb-2">
              Password
            </Text>
            <View className="relative">
              <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                error={errors.password}
                className="mb-0"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3"
              >
                {showPassword ? (
                  <EyeOff size={20} color="#6B7280" />
                ) : (
                  <Eye size={20} color="#6B7280" />
                )}
              </Pressable>
            </View>
            {errors.password && (
              <Text className="text-red-500 text-xs font-inter-regular mt-1">
                {errors.password}
              </Text>
            )}
          </View>

          <Pressable
            onPress={() => setRememberMe(!rememberMe)}
            className="flex-row items-center mb-6"
          >
            <View className={`w-5 h-5 rounded border-2 mr-3 items-center justify-center ${
              rememberMe ? 'bg-primary-500 border-primary-500' : 'border-gray-300'
            }`}>
              {rememberMe && (
                <Text className="text-white text-xs">✓</Text>
              )}
            </View>
            <Text className="text-sm font-inter-regular text-gray-700">
              Remember me
            </Text>
          </Pressable>

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={loading}
            className="mb-4"
          />

         
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}