import { useAuth } from '@/context/AuthContext';
import { Link, useNavigation, useRouter } from 'expo-router';
import React from 'react';
import { View, Text, FlatList, Pressable, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StudentList() {
  const router = useRouter();

  const { user } = useAuth();
  if (!user || user.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-white p-4">
        <Text className="text-center text-gray-500">No studnet available</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white p-4">
      {/* School Name */}
      <View className="items-center mb-6">
        <Text className="text-2xl font-bold text-blue-600">
          {user[0].institutionName}
        </Text>
      </View>

      {/* Student List */}
      {user && (
        <FlatList
          data={user}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: `/(tabs)`,
                  params: { student: JSON.stringify(item) },
                })
              }
            >
              <View className="p-4 mb-3 bg-blue-100 rounded-lg">
                <Text className="text-lg font-medium text-gray-800">
                  {item.name}
                </Text>
              </View>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
