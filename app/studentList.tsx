import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function StudentList() {
  const router = useRouter();
  const { user } = useAuth();

  if (!user || user.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white p-4 justify-center items-center">
        <MaterialIcons name="group-off" size={72} color="#94a3b8" />
        <Text className="mt-4 text-center text-gray-500 text-lg font-semibold">
          No students available
        </Text>
        <Text className="text-center text-gray-400 mt-2">
          Please check back later.
        </Text>
      </SafeAreaView>
    );
  }

  const institution = user[0].institutionName;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <LinearGradient
        colors={['#2563eb', '#1e40af']}
        className="rounded-b-3xl px-6 py-10 mb-6 shadow-md"
      >
        <View className="items-center">
          <View className="bg-white rounded-full p-4 shadow-lg mb-3">
            <MaterialIcons name="school" size={42} color="#2563eb" />
          </View>
          <Text className="text-2xl font-extrabold text-white text-center">
            {institution}
          </Text>
          <Text className="text-base text-blue-100 mt-1">
            Student Directory
          </Text>
        </View>
      </LinearGradient>

      {/* Student List */}
      <FlatList
        data={user}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: 36, paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: `/(tabs)`,
                params: { student: JSON.stringify(item) },
              })
            }
            className="mb-4"
          >
            <View className="flex-row items-center bg-white rounded-2xl px-4 py-5 shadow-sm border border-gray-100">
              {/* Icon */}
              <View className="bg-blue-100 rounded-full p-3 mr-4">
                <MaterialIcons name="person" size={30} color="#2563eb" />
              </View>

              {/* Student Info */}
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">
                  {item.name}
                </Text>
                {item.grade && (
                  <Text className="text-sm text-gray-500 mt-1">
                    Grade: {item.grade}
                  </Text>
                )}
              </View>

              {/* Arrow */}
              <MaterialIcons name="chevron-right" size={28} color="#2563eb" />
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}
