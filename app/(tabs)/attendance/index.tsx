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
import { AttendanceRecord } from '@/types';

export default function AttendanceScreen() {
  const router = useRouter();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
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
        `${process.env.BACKEND_URl}/attendance/getAttendance?studentId=2530003`
      );
      setAttendance(res.data);
    } catch (error) {
      console.error('Failed to fetch attendance data', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAttendance();
  }, []);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <Text className="text-lg font-inter-medium text-gray-700">
          Loading attendance...
        </Text>
      </View>
    );
  }

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
        {attendance.map((e) => {
          const styles = getStatusStyles(e.status);
          return (
            <Card
              key={e.id}
              variant="elevated"
              className="flex-row items-center justify-between p-4 mb-4 rounded-xl"
            >
              <View className="flex-row items-center space-x-3">
                {e.status === 'PRESENT' && (
                  <CheckCircle size={24} color={styles.color} />
                )}
                {e.status === 'ABSENT' && (
                  <XCircle size={24} color={styles.color} />
                )}
                {e.status === 'LATE' && (
                  <Clock size={24} color={styles.color} />
                )}

                <View>
                  <Text className="text-base font-inter-semibold text-gray-900">
                    {new Date(e.date).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Text>
                  <View
                    className={`mt-1 px-3 py-1 rounded-full ${styles.bg}`}
                    style={{ alignSelf: 'flex-start' }}
                  >
                    <Text
                      style={{ color: styles.color }}
                      className="text-sm font-inter-medium"
                    >
                      {e.status}
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          );
        })}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}
