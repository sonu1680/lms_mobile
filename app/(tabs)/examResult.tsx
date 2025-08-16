import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ExamResultsScreen() {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedExam, setSelectedExam] = useState('Mid-Term');

  const grades = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const exams = ['Mid-Term', 'Final', 'Unit Test'];

  const results = [
    { subject: 'Mathematics', marks: '85/100', grade: 'A' },
    { subject: 'Science', marks: '78/100', grade: 'B+' },
    { subject: 'English', marks: '92/100', grade: 'A+' },
    { subject: 'History', marks: '88/100', grade: 'A' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Exam Results
        </Text>

        {/* Filter Section */}
        <View className="bg-white p-4 rounded-2xl shadow mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">
            Filters
          </Text>

          <View className="flex-row">
            {/* Grade Picker */}
            <View className="flex-1 mr-2">
              <Text className="text-sm text-gray-500 mb-1">Select Grade</Text>
              <View className="border border-gray-300 rounded-lg overflow-hidden">
                <Picker
                  selectedValue={selectedGrade}
                  onValueChange={(itemValue) => setSelectedGrade(itemValue)}
                  dropdownIconColor="#4B5563"
                >
                  {grades.map((g, idx) => (
                    <Picker.Item key={idx} label={g} value={g} />
                  ))}
                </Picker>
              </View>
            </View>

            {/* Exam Type Picker */}
            <View className="flex-1 ml-2">
              <Text className="text-sm text-gray-500 mb-1">Exam Type</Text>
              <View className="border border-gray-300 rounded-lg overflow-hidden">
                <Picker
                  selectedValue={selectedExam}
                  onValueChange={(itemValue) => setSelectedExam(itemValue)}
                  dropdownIconColor="#4B5563"
                >
                  {exams.map((e, idx) => (
                    <Picker.Item key={idx} label={e} value={e} />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {/* Results Section */}
        <View className="bg-white p-4 rounded-2xl shadow">
          <Text className="text-lg font-semibold text-gray-700 mb-4">
            Results ({selectedExam}, {selectedGrade})
          </Text>

          {results.map((res, idx) => (
            <View
              key={idx}
              className={`flex-row justify-between items-center py-3 ${
                idx < results.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <Text className="text-gray-700 font-medium">{res.subject}</Text>
              <View className="items-end">
                <Text className="text-gray-600">{res.marks}</Text>
                <Text
                  className={`text-sm font-semibold ${
                    res.grade === 'A+' || res.grade === 'A'
                      ? 'text-green-600'
                      : res.grade.startsWith('B')
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                >
                  {res.grade}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
