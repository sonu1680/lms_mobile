import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingUI() {
  return (
    <SafeAreaView className="flex-1 ">

        {/* Skeleton Faculty Cards */}
          {[1, 2, 3, 4,5,6,7].map((item) => (
            <View
              key={item}
              className="flex-row w-full items-center space-x-8 p-4 bg-white rounded-2xl shadow-md border border-gray-100"
            >
              {/* Profile Picture Placeholder */}
              <View className="h-16 w-16 mr-4 bg-gray-300 rounded-full animate-pulse" />

              {/* Faculty Info Placeholder */}
              <View className="flex-1 space-y-3">
                <View className="h-6 w-full bg-gray-300 rounded-md animate-pulse mb-4" />
                <View className="h-3 w-full bg-gray-200 rounded-md animate-pulse mb-2" />
              </View>

            </View>
          ))}
    </SafeAreaView>
  );
}
