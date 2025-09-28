import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Card from '@/components/Card';
import axios from 'axios';
import { SubjectInfo } from '@/types';
import { EXPO_BACKEND_URL } from '@/contant';
import LoadingUI from '@/components/LoadingUi';
import NavHeader from '@/components/NavHeader';

export default function FacultyScreen() {
  const [facultyList, setFacultyList] = useState<SubjectInfo[] | null>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { classId } = useLocalSearchParams();

  const handleFacultyPress = (facultyProfile: SubjectInfo) => {
    router.push({
      pathname: `/faculty/facultyProfile`,
      params: { profile: JSON.stringify(facultyProfile) },
    });
  };
  const getFaculty = async () => {
    try {
      setIsLoading(true);
      const data = await axios.get(
        `${EXPO_BACKEND_URL}/student/facultyTeachesToStudentList?classId=${classId}`
      );
      setFacultyList(data.data[0].subjects);
      return;
    } catch (error) {
      throw new Error('Failed to fetch faculty list');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFaculty();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <NavHeader
        title="Faculty Directory"
        description="Faculty Directory Connect with your professors
"
      />
      {/* Search and Filter */}
      <View className="px-6 mt-4"></View>
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {!isLoading && facultyList && facultyList.length > 0 ? (
          facultyList.map((faculty) => (
            <Pressable
              key={faculty.teacherEmployeeId}
              onPress={() => handleFacultyPress(faculty)}
              className="mb-4"
            >
              <Card variant="elevated" className="active:scale-98">
                <View className="flex-row items-center">
                  <View className="w-16 h-16 bg-secondary-100 rounded-full items-center justify-center mr-4">
                    <Text className="text-secondary-600 text-xl font-inter-bold">
                      {faculty.teacherName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </Text>
                  </View>

                  <View className="flex-1">
                    <Text className="text-lg font-inter-semibold text-gray-900 mb-1">
                      {faculty.teacherName}
                    </Text>
                    <Text className="text-sm font-inter-medium text-secondary-600 mb-1">
                      Teacher • {faculty.subjectName}
                    </Text>
                  </View>

                  <ChevronRight size={20} color="#9CA3AF" />
                </View>
              </Card>
            </Pressable>
          ))
        ) : (
          <LoadingUI />
        )}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}
