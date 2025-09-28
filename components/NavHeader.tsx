import React from 'react';
import { View, Text } from 'react-native';
import BackButton from './BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NavHeader({title,description}:{title:string,description:string}) {
  return (

    <View className="bg-secondary-500 pt-12 pb-6 px-6 rounded-b-3xl flex flex-row ">
      <View>
        <BackButton />
      </View>
      <View>
        <Text className="text-white text-2xl font-inter-bold mb-2">
          {title}
        </Text>
        <Text className="text-white/90 text-sm font-inter-regular">
        {description}
        </Text>
      </View>
    </View>
  );
}
