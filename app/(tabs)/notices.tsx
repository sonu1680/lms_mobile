import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const notices = [
  {
    date: '16 Aug 2025',
    time: '09:00 AM',
    title: 'Independence Day Celebration',
    reason: 'Students to gather at the auditorium for flag hoisting.',
  },
  {
    date: '18 Aug 2025',
    time: '02:00 PM',
    title: 'Parent-Teacher Meeting',
    reason: 'Discussion about academic progress for Term 1.',
  },
  {
    date: '20 Aug 2025',
    time: '11:00 AM',
    title: 'Holiday Announcement',
    reason: 'School closed on account of Raksha Bandhan.',
  },
];

export default function Notice() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#2563eb', '#1e40af']}
        className="rounded-b-3xl px-6 py-10 mb-6 shadow-md"
      >
        <View className="items-center">
          <View className="bg-white rounded-full p-4 shadow-lg mb-3">
            <MaterialIcons name="campaign" size={42} color="#2563eb" />
          </View>
          <Text className="text-2xl font-extrabold text-white text-center">
            Greenwood High School
          </Text>
          <Text className="text-base text-blue-100 mt-1">Notice Board</Text>
        </View>
      </LinearGradient>

      {/* Notices */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 36, paddingHorizontal: 16 }}
      >
        {notices.map((notice, index) => (
          <View
            key={index}
            className="bg-white rounded-2xl px-5 py-6 mb-5 shadow-sm border border-gray-100"
          >
            {/* Date & Time */}
            <View className="flex-row items-center mb-3">
              <MaterialIcons name="event" size={20} color="#2563eb" />
              <Text className="ml-2 text-sm text-gray-500">
                {notice.date} • {notice.time}
              </Text>
            </View>

            {/* Title */}
            <Text className="text-lg font-semibold text-gray-800 mb-2">
              {notice.title}
            </Text>

            {/* Reason */}
            <Text className="text-sm text-gray-600">{notice.reason}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
