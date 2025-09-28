import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import {
  Calendar,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import Card from '@/components/Card';
import { attendanceOptions, EXPO_BACKEND_URL } from '@/contant';
import NavHeader from '@/components/NavHeader';
import LoadingUI from '@/components/LoadingUi';
import SelectCard from '@/components/Select';
import { DAILY_ATTENDANCE, mockAttendanceSummary } from '@/services/mockData';
import { DailyAttendace, SubjectAttendace } from '@/types';
export default function AttendanceScreen() {
  const [subjectAttendance, setSubjectAttendance] = useState<
    SubjectAttendace[]
  >([]);
    const [dailyAttendance, setDailyAttendance] = useState<DailyAttendace[]>(
      []
    );

  const [isLoading, setIsLoading] = useState(false);



  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'PRESENT':
        return { color: '#10B981', bg: 'bg-green-100' };
      case 'ABSENT':
        return { color: '#EF4444', bg: 'bg-red-100' };
      case 'LATE':
        return { color: '#F59E0B', bg: 'bg-yellow-100' };
      default:
        return { color: '#6B7280', bg: 'bg-gray-100' };
    }
  };

  const getAttendance = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${EXPO_BACKEND_URL}/attendance/getAttendance?studentId=2530003`
      );
      setSubjectAttendance(res.data.class);
      setDailyAttendance(res.data.school);
    } catch (error) {
      console.error('Failed to fetch attendance data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);


  const [selected, setSelected] = useState<string | null>("daily");
    const getColor = (percentage: number) => {
      if (percentage >= 90) return '#10B981'; // Green
      if (percentage >= 80) return '#F59E0B'; // Yellow
      return '#EF4444'; // Red
    };
  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <NavHeader title="Attendance" description="View your attendance" />

      {/* Date Filter */}
      <View className="px-6 mt-6">
        <SelectCard
          title="Choose Attendance Type"
          options={attendanceOptions}
          value={selected}
          onChange={setSelected}
        />
        <View className="flex-row items-center justify-between mb-4 mt-4">
          <Text className="text-lg font-inter-bold text-gray-900">
            Your Records
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

      {/* Attendance List */}
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {selected == 'daily' ? (
          !isLoading && dailyAttendance && dailyAttendance.length > 0 ? (
            dailyAttendance.map((e:DailyAttendace) => {
              const styles = getStatusStyles(e.status);
              return (
                <Card
                  key={e.id}
                  variant="elevated"
                  className="flex-row items-center justify-between p-4 mb-4 rounded-xl bg-white shadow-sm"
                >
                  {/* Left Section: Status Icon + Info */}
                  <View className="flex-row items-center space-x-3">
                    {/* Status Icon */}
                    {e.status === 'PRESENT' && (
                      <CheckCircle size={24} color={styles.color} />
                    )}
                    {e.status === 'ABSENT' && (
                      <XCircle size={24} color={styles.color} />
                    )}
                    {e.status === 'LATE' && (
                      <Clock size={24} color={styles.color} />
                    )}

                    {/* Info */}
                    <View className="flex-col justify-center ml-4 ">
                      <Text className="text-base font-semibold text-gray-900">
                        {new Date(e.date).toLocaleDateString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </Text>

                      <View
                        className={`mt-1 px-3 py-1 rounded-full`}
                        style={{
                          backgroundColor: styles.bg,
                          alignSelf: 'flex-start',
                        }}
                      >
                        <Text
                          style={{ color: styles.color }}
                          className="text-sm font-medium"
                        >
                          {e.status}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Right Section: Check-in / Check-out */}
                  <View className="flex-col items-end space-y-1">
                    <Text className="text-sm text-gray-500">
                      Check-in:{' '}
                      {new Date(e.checkin).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                    <Text className="text-sm text-gray-500">
                      Check-out:{' '}
                      {new Date(e.checkout).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>
                  </View>
                </Card>
              );
            })
          ) : (
            <LoadingUI />
          )
        ) : subjectAttendance && subjectAttendance.length > 0 ? (
          subjectAttendance.map((item) => (
            <Card
              key={item.subjectCode}
              variant="elevated"
              className="mb-4 p-4 rounded-2xl bg-white shadow-lg"
            >
              {/* Header */}
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-900">
                  {item.subjectName}
                </Text>
                <Text
                  className="text-sm font-bold"
                  style={{ color: getColor(item.percentage) }}
                >
                  {item.percentage.toFixed(1)}%
                </Text>
              </View>

              {/* Stats badges */}
              <View className="flex-row space-x-6 mt-3 flex-wrap">
                <View className="px-2 py-1 bg-gray-200 rounded-full">
                  <Text className="text-xs text-gray-700">
                    Total: {item.total}
                  </Text>
                </View>
                <View className="px-2 py-1 bg-green-100 rounded-full">
                  <Text className="text-xs text-green-800">
                    Present: {item.present}
                  </Text>
                </View>
                <View className="px-2 py-1 bg-red-100 rounded-full">
                  <Text className="text-xs text-red-800">
                    Absent: {item.absent}
                  </Text>
                </View>
              </View>

              {/* Progress Bar */}
              <View className="mt-4 h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                <View
                  className="h-3 rounded-full"
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: getColor(item.percentage),
                  }}
                />
              </View>
            </Card>
          ))
        ) : (
          <LoadingUI />
        )}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}
