import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { Search, Filter, ChevronRight, Mail, Phone } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { mockFaculty } from '@/services/mockData';
import Card from '@/components/Card';

export default function FacultyScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const router = useRouter();

  const departments = ['all', ...Array.from(new Set(mockFaculty.map(f => f.department)))];
  
  const filteredFaculty = mockFaculty.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faculty.subjects.some(subject => subject.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || faculty.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const handleFacultyPress = (facultyId: string) => {
    router.push(`/faculty/${facultyId}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-secondary-500 pt-12 pb-6 px-6 rounded-b-3xl">
        <Text className="text-white text-2xl font-inter-bold mb-2">
          Faculty Directory
        </Text>
        <Text className="text-white/90 text-sm font-inter-regular">
          Connect with your professors
        </Text>
      </View>

      {/* Search and Filter */}
      <View className="px-6 mt-6">
        <View className="flex-row items-center space-x-3 mb-4">
          <View className="flex-1 bg-white rounded-lg border border-gray-200 flex-row items-center px-4">
            <Search size={20} color="#6B7280" />
            <TextInput
              placeholder="Search faculty or subjects..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 ml-3 py-3 text-base font-inter-regular"
            />
          </View>
          <Pressable className="bg-white p-3 rounded-lg border border-gray-200">
            <Filter size={20} color="#6B7280" />
          </Pressable>
        </View>

        {/* Department Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
          <View className="flex-row space-x-3">
            {departments.map((dept) => (
              <Pressable
                key={dept}
                onPress={() => setSelectedDepartment(dept)}
                className={`px-4 py-2 rounded-full ${
                  selectedDepartment === dept
                    ? 'bg-secondary-500'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <Text className={`text-sm font-inter-medium capitalize ${
                  selectedDepartment === dept ? 'text-white' : 'text-gray-700'
                }`}>
                  {dept}
                </Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {filteredFaculty.map((faculty) => (
          <Pressable
            key={faculty.id}
            onPress={() => handleFacultyPress(faculty.id)}
            className="mb-4"
          >
            <Card variant="elevated" className="active:scale-98">
              <View className="flex-row items-center">
                <View className="w-16 h-16 bg-secondary-100 rounded-full items-center justify-center mr-4">
                  <Text className="text-secondary-600 text-xl font-inter-bold">
                    {faculty.name.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                
                <View className="flex-1">
                  <Text className="text-lg font-inter-semibold text-gray-900 mb-1">
                    {faculty.name}
                  </Text>
                  <Text className="text-sm font-inter-medium text-secondary-600 mb-1">
                    {faculty.designation} • {faculty.department}
                  </Text>
                  <Text className="text-xs font-inter-regular text-gray-600 mb-2">
                    {faculty.subjects.join(', ')}
                  </Text>
                  
                  <View className="flex-row items-center space-x-4">
                    <View className="flex-row items-center">
                      <Mail size={14} color="#6B7280" />
                      <Text className="text-xs font-inter-regular text-gray-600 ml-1">
                        Available
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Phone size={14} color="#6B7280" />
                      <Text className="text-xs font-inter-regular text-gray-600 ml-1">
                        {faculty.experience}
                      </Text>
                    </View>
                  </View>
                </View>
                
                <ChevronRight size={20} color="#9CA3AF" />
              </View>
            </Card>
          </Pressable>
        ))}

        <View className="mb-6" />
      </ScrollView>
    </View>
  );
}