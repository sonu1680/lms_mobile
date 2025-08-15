import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { Calendar, Filter, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { mockSubjects, mockAttendanceSummary } from '@/services/mockData';
import Card from '@/components/Card';

export default function AttendanceScreen() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const router = useRouter();

  const getStatusColor = (percentage: number) => {
    if (percentage >= 85) return '#10B981';
    if (percentage >= 75) return '#F59E0B';
    return '#EF4444';
  };

  const getStatusText = (percentage: number) => {
    if (percentage >= 85) return 'Excellent';
    if (percentage >= 75) return 'Good';
    return 'Poor';
  };

  const handleSubjectPress = (subjectId: string, subjectName: string) => {
    router.push(`/attendance/${subjectId}?name=${encodeURIComponent(subjectName)}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-primary-500 pt-12 pb-6 px-6 rounded-b-3xl">
        <Text className="text-white text-2xl font-inter-bold mb-2">
          Attendance
        </Text>
        <Text className="text-white/90 text-sm font-inter-regular">
          Track your class attendance
        </Text>
      </View>

      {/* Date Filter */}
      <View className="px-6 mt-6">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-lg font-inter-bold text-gray-900">
            Your Subjects
          </Text>
          <Pressable className="flex-row items-center bg-white px-4 py-2 rounded-lg border border-gray-200">
            <Calendar size={16} color="#6B7280" />
            <Text className="text-sm font-inter-medium text-gray-700 ml-2">
              This Month
            </Text>
            <Filter size={16} color="#6B7280" className="ml-2" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {mockSubjects.map((subject) => {
          const summary = mockAttendanceSummary.find(s => s.subjectId === subject.id);
          if (!summary) return null;

          return (
            <Pressable
              key={subject.id}
              onPress={() => handleSubjectPress(subject.id, subject.name)}
              className="mb-4"
            >
              <Card variant="elevated" className="active:scale-98">
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <View className="flex-row items-center mb-2">
                      <View 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: subject.color }}
                      />
                      <Text className="text-lg font-inter-semibold text-gray-900">
                        {subject.name}
                      </Text>
                    </View>
                    
                    <Text className="text-sm font-inter-medium text-gray-600 mb-2">
                      {subject.teacher} • {subject.code}
                    </Text>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row space-x-4">
                        <View>
                          <Text className="text-xs font-inter-medium text-gray-500">
                            Present
                          </Text>
                          <Text className="text-sm font-inter-semibold text-secondary-600">
                            {summary.presentClasses}/{summary.totalClasses}
                          </Text>
                        </View>
                        <View>
                          <Text className="text-xs font-inter-medium text-gray-500">
                            Percentage
                          </Text>
                          <Text 
                            className="text-sm font-inter-bold"
                            style={{ color: getStatusColor(summary.percentage) }}
                          >
                            {summary.percentage.toFixed(1)}%
                          </Text>
                        </View>
                        <View>
                          <Text className="text-xs font-inter-medium text-gray-500">
                            Status
                          </Text>
                          <Text 
                            className="text-sm font-inter-semibold"
                            style={{ color: getStatusColor(summary.percentage) }}
                          >
                            {getStatusText(summary.percentage)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    {/* Progress Bar */}
                    <View className="mt-3">
                      <View className="bg-gray-200 rounded-full h-2">
                        <View 
                          className="h-2 rounded-full"
                          style={{ 
                            backgroundColor: getStatusColor(summary.percentage),
                            width: `${summary.percentage}%`
                          }}
                        />
                      </View>
                    </View>
                  </View>
                  
                  <ChevronRight size={20} color="#9CA3AF" className="ml-4" />
                </View>
              </Card>
            </Pressable>
          );
        })}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}