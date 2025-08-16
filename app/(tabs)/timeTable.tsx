import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';

const timetable = {
  Monday: [
    { time: '09:00 - 09:45', subject: 'Mathematics' },
    { time: '09:45 - 10:30', subject: 'Science' },
    { time: '10:30 - 11:00', subject: 'Recess', type: 'break' },
    { time: '11:00 - 11:45', subject: 'English' },
    { time: '11:45 - 12:30', subject: 'History' },
  ],
  Tuesday: [
    { time: '09:00 - 09:45', subject: 'Geography' },
    { time: '09:45 - 10:30', subject: 'Mathematics' },
    { time: '10:30 - 11:00', subject: 'Recess', type: 'break' },
    { time: '11:00 - 11:45', subject: 'Science' },
    { time: '11:45 - 12:30', subject: 'Computer' },
  ],
  Wednesday: [
    { time: '09:00 - 09:45', subject: 'Geography' },
    { time: '09:45 - 10:30', subject: 'Mathematics' },
    { time: '10:30 - 11:00', subject: 'Recess', type: 'break' },
    { time: '11:00 - 11:45', subject: 'Science' },
    { time: '11:45 - 12:30', subject: 'Computer' },
  ],
  Thrusday: [
    { time: '09:00 - 09:45', subject: 'Geography' },
    { time: '09:45 - 10:30', subject: 'Mathematics' },
    { time: '10:30 - 11:00', subject: 'Recess', type: 'break' },
    { time: '11:00 - 11:45', subject: 'Science' },
    { time: '11:45 - 12:30', subject: 'Computer' },
  ],
  Friday: [
    { time: '09:00 - 09:45', subject: 'Geography' },
    { time: '09:45 - 10:30', subject: 'Mathematics' },
    { time: '10:30 - 11:00', subject: 'Recess', type: 'break' },
    { time: '11:00 - 11:45', subject: 'Science' },
    { time: '11:45 - 12:30', subject: 'Computer' },
  ],
  Saturday: [
    { time: '09:00 - 09:45', subject: 'Geography' },
    { time: '09:45 - 10:30', subject: 'Mathematics' },
    { time: '10:30 - 11:00', subject: 'Recess', type: 'break' },
    { time: '11:00 - 11:45', subject: 'Science' },
    { time: '11:45 - 12:30', subject: 'Computer' },
  ],
};

export default function TimeTable() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#2563eb', '#1e40af']}
        className="rounded-b-3xl px-6 py-10 mb-6 shadow-md"
      >
        <View className="items-center">
          <View className="bg-white rounded-full p-4 shadow-lg mb-3">
            <MaterialIcons name="schedule" size={42} color="#2563eb" />
          </View>
          <Text className="text-2xl font-extrabold text-white text-center">
            ABC School
          </Text>
          <Text className="text-base text-blue-100 mt-1">Weekly Timetable</Text>
        </View>
      </LinearGradient>

      {/* Timetable */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 36, paddingHorizontal: 16 }}
      >
        {Object.entries(timetable).map(([day, slots]) => (
          <View key={day} className="mb-8">
            {/* Day Title */}
            <Text className="text-xl font-bold text-gray-800 mb-3">{day}</Text>

            {/* Slots */}
            {slots.map((slot, index) => (
              <View
                key={index}
                className={`flex-row items-center mb-3 p-4 rounded-2xl shadow-sm border 
                  ${
                    slot.type === 'break'
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-white border-gray-100'
                  }
                `}
              >
                {/* Time */}
                <View className="mr-4 items-center">
                  <MaterialIcons
                    name={slot.type === 'break' ? 'restaurant' : 'book'}
                    size={28}
                    color={slot.type === 'break' ? '#f59e0b' : '#2563eb'}
                  />
                  <Text className="text-xs text-gray-500 mt-1">
                    {slot.time}
                  </Text>
                </View>

                {/* Subject */}
                <View className="flex-1">
                  <Text
                    className={`text-lg font-semibold ${
                      slot.type === 'break'
                        ? 'text-yellow-700'
                        : 'text-gray-800'
                    }`}
                  >
                    {slot.subject}
                  </Text>
                  {slot.type !== 'break' && (
                    <Text className="text-sm text-gray-500 mt-1">Room 204</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
