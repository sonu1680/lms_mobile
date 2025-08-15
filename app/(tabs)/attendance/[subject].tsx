import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { mockAttendanceRecords, mockSubjects, mockAttendanceSummary } from '@/services/mockData';
import Card from '@/components/Card';

export default function SubjectAttendanceScreen() {
  const { subject: subjectId, name } = useLocalSearchParams();
  
  const subject = mockSubjects.find(s => s.id === subjectId);
  const summary = mockAttendanceSummary.find(s => s.subjectId === subjectId);
  const records = mockAttendanceRecords.filter(r => r.subjectId === subjectId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'present': return '#10B981';
      case 'absent': return '#EF4444';
      case 'late': return '#F59E0B';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return '✓';
      case 'absent': return '✗';
      case 'late': return '⏰';
      default: return '?';
    }
  };

  if (!subject || !summary) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">Subject not found</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6 pt-6" showsVerticalScrollIndicator={false}>
        {/* Summary Card */}
        <Card variant="elevated" className="mb-6">
          <View className="items-center mb-4">
            <Text className="text-2xl font-inter-bold text-gray-900 mb-1">
              {subject.name}
            </Text>
            <Text className="text-base font-inter-medium text-gray-600">
              {subject.teacher} • {subject.code}
            </Text>
          </View>

          <View className="flex-row justify-around">
            <View className="items-center">
              <Text className="text-2xl font-inter-bold text-secondary-600">
                {summary.presentClasses}
              </Text>
              <Text className="text-sm font-inter-medium text-gray-500">
                Present
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-inter-bold text-red-500">
                {summary.absentClasses}
              </Text>
              <Text className="text-sm font-inter-medium text-gray-500">
                Absent
              </Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-inter-bold text-yellow-500">
                {summary.lateClasses}
              </Text>
              <Text className="text-sm font-inter-medium text-gray-500">
                Late
              </Text>
            </View>
            <View className="items-center">
              <Text 
                className="text-2xl font-inter-bold"
                style={{ color: summary.percentage >= 85 ? '#10B981' : summary.percentage >= 75 ? '#F59E0B' : '#EF4444' }}
              >
                {summary.percentage.toFixed(1)}%
              </Text>
              <Text className="text-sm font-inter-medium text-gray-500">
                Attendance
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View className="mt-4">
            <View className="bg-gray-200 rounded-full h-3">
              <View 
                className="h-3 rounded-full"
                style={{ 
                  backgroundColor: summary.percentage >= 85 ? '#10B981' : summary.percentage >= 75 ? '#F59E0B' : '#EF4444',
                  width: `${summary.percentage}%`
                }}
              />
            </View>
          </View>
        </Card>

        {/* Recent Attendance */}
        <Text className="text-lg font-inter-bold text-gray-900 mb-4">
          Recent Attendance
        </Text>

        {records.map((record) => (
          <Card key={record.id} variant="outline" className="mb-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-base font-inter-semibold text-gray-900 mb-1">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </Text>
                <Text className="text-sm font-inter-medium text-gray-600">
                  Period {record.period}
                </Text>
              </View>
              
              <View className="flex-row items-center">
                <View 
                  className="w-8 h-8 rounded-full items-center justify-center mr-3"
                  style={{ backgroundColor: `${getStatusColor(record.status)}15` }}
                >
                  <Text style={{ color: getStatusColor(record.status) }}>
                    {getStatusIcon(record.status)}
                  </Text>
                </View>
                <Text 
                  className="text-sm font-inter-semibold capitalize"
                  style={{ color: getStatusColor(record.status) }}
                >
                  {record.status}
                </Text>
              </View>
            </View>
          </Card>
        ))}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}