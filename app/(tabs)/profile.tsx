import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { LogOut, User, Settings, Bell, CircleHelp as HelpCircle, Shield } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import Card from '@/components/Card';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Sign Out', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/login');
          }
        }
      ]
    );
  };

  const menuItems = [
    { icon: User, title: 'Edit Profile', subtitle: 'Update your personal information' },
    { icon: Settings, title: 'Settings', subtitle: 'App preferences and configuration' },
    { icon: Bell, title: 'Notifications', subtitle: 'Manage notification preferences' },
    { icon: Shield, title: 'Privacy', subtitle: 'Privacy and security settings' },
    { icon: HelpCircle, title: 'Help & Support', subtitle: 'Get help and contact support' },
  ];

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 pt-12 pb-6 px-6 rounded-b-3xl">
        <Text className="text-white text-2xl font-inter-bold mb-2">
          Profile
        </Text>
        <Text className="text-white/90 text-sm font-inter-regular">
          Manage your account settings
        </Text>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <Card variant="elevated" className="mt-6 mb-6">
          <View className="items-center">
            <View className="w-20 h-20 bg-primary-100 rounded-full items-center justify-center mb-4">
              <Text className="text-primary-600 text-2xl font-inter-bold">
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
            
            <Text className="text-xl font-inter-bold text-gray-900 mb-1">
              {user?.name}
            </Text>
            <Text className="text-sm font-inter-regular text-gray-600 mb-1">
              {user?.email}
            </Text>
            <Text className="text-sm font-inter-medium text-primary-600">
              {user?.studentId}
            </Text>

            <View className="w-full border-t border-gray-100 mt-4 pt-4">
              <View className="flex-row justify-around">
                <View className="items-center">
                  <Text className="text-lg font-inter-bold text-gray-900">
                    {user?.class}
                  </Text>
                  <Text className="text-xs font-inter-medium text-gray-500">
                    Class
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-inter-bold text-gray-900">
                    {user?.section}
                  </Text>
                  <Text className="text-xs font-inter-medium text-gray-500">
                    Section
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-lg font-inter-bold text-gray-900">
                    2024
                  </Text>
                  <Text className="text-xs font-inter-medium text-gray-500">
                    Year
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Card>

        {/* Menu Items */}
        <View className="space-y-3 mb-6">
          {menuItems.map((item, index) => (
            <Card key={index} variant="elevated">
              <Pressable className="flex-row items-center active:opacity-70">
                <View className="w-10 h-10 bg-gray-100 rounded-full items-center justify-center mr-4">
                  <item.icon size={20} color="#6B7280" />
                </View>
                <View className="flex-1">
                  <Text className="text-base font-inter-semibold text-gray-900">
                    {item.title}
                  </Text>
                  <Text className="text-sm font-inter-regular text-gray-500">
                    {item.subtitle}
                  </Text>
                </View>
              </Pressable>
            </Card>
          ))}
        </View>

        {/* Logout Button */}
        <Card variant="elevated" className="mb-6">
          <Pressable 
            onPress={handleLogout}
            className="flex-row items-center active:opacity-70"
          >
            <View className="w-10 h-10 bg-red-50 rounded-full items-center justify-center mr-4">
              <LogOut size={20} color="#EF4444" />
            </View>
            <Text className="text-base font-inter-semibold text-red-500">
              Sign Out
            </Text>
          </Pressable>
        </Card>

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}