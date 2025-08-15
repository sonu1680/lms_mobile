import React from 'react';
import { View, Text, ScrollView, Pressable, Image, TouchableOpacity } from 'react-native';
import { LogOut, Calendar, Users, Award, Clock, Bell, BookOpen } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { mockQuickLinks } from '@/services/mockData';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useRouter } from 'expo-router';

const iconMap = {
  'calendar-check': Calendar,
  'users': Users,
  'award': Award,
  'clock': Clock,
  'bell': Bell,
  'book-open': BookOpen
};

export default function DashboardScreen() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleQuickLinkPress = (route: string) => {
    console.log("sonu")
    if (route === 'attendance') {
      router.push('/attendance');
    } else if (route === 'faculty') {
      router.push('/faculty');
    }
    // Other routes can be implemented as needed
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 pt-12 pb-6 px-6 rounded-b-3xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <View className="w-12 h-12 bg-white/20 rounded-full items-center justify-center mr-4">
              <Text className="text-white text-lg font-inter-bold">
                {user?.name?.charAt(0) || 'U'}
              </Text>
            </View>
            <View>
              <Text className="text-white text-lg font-inter-semibold">
                Good Morning!
              </Text>
              <Text className="text-white/90 text-sm font-inter-regular">
                {user?.name || 'Student'}
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
                <Text className="text-sm font-inter-medium text-gray-500">Name</Text>
                <Text className="text-lg font-inter-semibold text-gray-900">
                  {user?.name}
                </Text>
              </View>
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">Student ID</Text>
                <Text className="text-lg font-inter-semibold text-gray-900">
                  {user?.studentId}
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="elevated">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">Email</Text>
                <Text className="text-base font-inter-regular text-gray-900">
                  {user?.email}
                </Text>
              </View>
            </View>
          </Card>

          <Card variant="elevated">
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">School</Text>
                <Text className="text-lg font-inter-semibold text-gray-900">
                  {user?.schoolName}
                </Text>
              </View>
              <View>
                <Text className="text-sm font-inter-medium text-gray-500">Class & Section</Text>
                <Text className="text-lg font-inter-semibold text-gray-900">
                  {user?.class} - {user?.section}
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
                <Pressable
                  key={link.id}
                
                  className="w-[48%] mb-4"
                >
                  <Card variant="elevated" className="items-center p-6 active:scale-95 " onPress={()=>handleQuickLinkPress(link.route)} >
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