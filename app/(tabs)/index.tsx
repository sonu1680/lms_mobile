import React from 'react';
import { View, Text, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import { LogOut, Calendar, Users, Award, Clock, Bell, BookOpen } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { mockQuickLinks } from '@/services/mockData';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { User } from '@/types';

const iconMap = {
  'calendar-check': Calendar,
  'users': Users,
  'award': Award,
  'clock': Clock,
  'bell': Bell,
  'book-open': BookOpen
};

export default function DashboardScreen() {
  const {  logout } = useAuth();
  const router = useRouter();
  const {student} = useLocalSearchParams();
  const user:User=JSON.parse(student as string)
  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleQuickLinkPress = (route: string) => {
    if (route === 'attendance') {
      router.push('/attendance');
    } else if (route === 'faculty') {
      router.push('/faculty');
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 pt-12 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
              <Text className="text-white text-lg font-inter-bold">
                {user?.name?.toUpperCase().charAt(0) || 'U'}
              </Text>
            </View>
            <View>
              <Text className="text-white text-lg font-inter-semibold">
                Good Morning!
              </Text>
              <Text className="text-white/90 text-sm font-inter-regular">
                {user?.name?.toUpperCase() || 'Student'}
              </Text>
            </View>
          </View>
          <Pressable onPress={handleLogout} className="p-2">
            <LogOut size={24} color="white" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Summary Cards */}
        <View className="mt-6 space-y-4">
          <Text className="text-xl font-inter-bold text-gray-900 mb-2">
            Your Information
          </Text>

          <Card variant="elevated">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">
                  Name
                </Text>
                <Text className="text-md font-inter-semibold text-gray-900">
                  {user?.name.toUpperCase() || 'N/A'}
                </Text>
              </View>
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">
                  Enrollment No
                </Text>
                <Text className="text-lg font-inter-semibold text-gray-900">
                  {user?.enrollment}
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="elevated">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">
                  Grade
                </Text>
                <Text className="text-base font-inter-regular text-gray-900">
                  {user?.grade}
                </Text>
              </View>
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">
                  Section
                </Text>
                <Text className="text-base font-inter-regular text-gray-900">
                  {user?.section}
                </Text>
              </View>
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">
                  Roll No
                </Text>
                <Text className="text-base font-inter-regular text-gray-900">
                  {user?.rollNo || 'N/A'}
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="elevated">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">
                  Class Teacher
                </Text>
                <Text className="text-lg font-inter-semibold text-gray-900">
                  {user?.teacherName}
                </Text>
              </View>
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">
                  Teacher Phone
                </Text>
                <Text className="text-lg font-inter-semibold text-gray-900">
                  {user?.teacherPhone}
                </Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Quick Links */}
        <View className="mt-8 mb-6">
          <Text className="text-xl font-inter-bold text-gray-900 mb-4">
            Quick Access
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {mockQuickLinks.map((link) => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];

              return (
                <Pressable key={link.id} className="w-[48%] mb-4">
                  <Card
                    variant="elevated"
                    className="items-center p-6 active:scale-95 "
                    onPress={() => handleQuickLinkPress(link.route)}
                  >
                    <View className="relative">
                      <View
                        className="w-12 h-12 rounded-full items-center justify-center mb-3"
                        style={{ backgroundColor: `${link.color}15` }}
                      >
                        <IconComponent size={24} color={link.color} />
                      </View>
                      {link.badge && <Badge count={link.badge} />}
                    </View>
                    <Text className="text-base font-inter-semibold text-gray-900 text-center">
                      {link.title}
                    </Text>
                  </Card>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}