import React from 'react';
import { View, Text, ScrollView, Pressable, Linking } from 'react-native';
import { Mail, Phone, Clock, BookOpen, Award } from 'lucide-react-native';
import { useLocalSearchParams } from 'expo-router';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { SubjectInfo } from '@/types';
import NavHeader from '@/components/NavHeader';

export default function facultyProfileProfileScreen() {
  const {profile} = useLocalSearchParams();
  const facultyProfile:SubjectInfo=JSON.parse(profile as string);
  if (!facultyProfile) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-gray-500">facultyProfile not found</Text>
      </View>
    );
  }

  const handleEmailPress = () => {
    Linking.openURL(`mailto:${facultyProfile.teacherEmail}`);
  };

  const handlePhonePress = () => {
    if (facultyProfile.teacherPhone) {
      Linking.openURL(`tel:${facultyProfile.teacherPhone}`);
    }
  };

  return (
    <View className="flex-1 bg-gray-50">
      <NavHeader title="Faculty Profile" description='Contact information' ></NavHeader>
      <ScrollView
        className="flex-1 px-6 pt-6"
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <Card variant="elevated" className="items-center mb-6">
          <View className="w-24 h-24 bg-secondary-100 rounded-full items-center justify-center mb-4">
            <Text className="text-secondary-600 text-3xl font-inter-bold">
              {facultyProfile.teacherName.slice(0, 2).toUpperCase()}
            </Text>
          </View>

          <Text className="text-2xl font-inter-bold text-gray-900 text-center mb-1">
            {facultyProfile.teacherName}
          </Text>
          <Text className="text-base font-inter-medium text-secondary-600 mb-2">
            {facultyProfile.subjectName}
          </Text>
        </Card>

        {/* Contact Information */}
        <Card variant="elevated" className="mb-6">
          <Text className="text-lg font-inter-bold text-gray-900 mb-4">
            Contact Information
          </Text>

          <Pressable
            onPress={handleEmailPress}
            className="flex-row items-center py-3 border-b border-gray-100"
          >
            <View className="w-10 h-10 bg-blue-50 rounded-full items-center justify-center mr-4 ">
              <Mail size={20} color="#3B82F6" />
            </View>
            <View>
              <Text className="text-sm font-inter-medium text-gray-900">
                Email Address
              </Text>
              <Text className="text-sm font-inter-regular text-blue-600">
                {facultyProfile.teacherEmail}
              </Text>
            </View>
          </Pressable>

          {facultyProfile.teacherPhone && (
            <Pressable
              onPress={handlePhonePress}
              className="flex-row items-center py-3"
            >
              <View className="w-10 h-10 bg-green-50 rounded-full items-center justify-center mr-4">
                <Phone size={20} color="#10B981" />
              </View>
              <View>
                <Text className="text-sm font-inter-medium text-gray-900">
                  Phone Number
                </Text>
                <Text className="text-sm font-inter-regular text-green-600">
                  {facultyProfile.teacherPhone}
                </Text>
              </View>
            </Pressable>
          )}
        </Card>

        {/* Office Hours */}
        <Card variant="elevated" className="mb-6">
          <Text className="text-lg font-inter-bold text-gray-900 mb-4">
            Office Hours
          </Text>
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center mr-4">
              <Clock size={20} color="#F59E0B" />
            </View>
            <View>
              <Text className="text-sm font-inter-medium text-gray-900">
                Available Hours
              </Text>
              <Text className="text-sm font-inter-regular text-gray-600">
                8:00 AM - 5:00 PM, Monday to Saturday
              </Text>
            </View>
          </View>
        </Card>

     

        {/* Experience */}
        <Card variant="elevated" className="mb-6">
          <Text className="text-lg font-inter-bold text-gray-900 mb-4">
            Experience
          </Text>
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-yellow-50 rounded-full items-center justify-center mr-4">
              <Award size={20} color="#F59E0B" />
            </View>
            <View>
              <Text className="text-sm font-inter-medium text-gray-900">
                Teaching Experience
              </Text>
              <Text className="text-sm font-inter-regular text-gray-600">
                4 year of dedicated teaching
              </Text>
            </View>
          </View>
        </Card>

        {/* Action Buttons */}
        <View className="flex-row  gap-x-6 mb-6">
          <Button
            title="Send Email"
            onPress={handleEmailPress}
            className="flex-1"
          />
          {facultyProfile.teacherPhone && (
            <Button
              title="Call"
              onPress={handlePhonePress}
              variant="outline"
              className="flex-1"
            />
          )}
        </View>

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}