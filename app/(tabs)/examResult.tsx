import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import NavHeader from '@/components/NavHeader';
import axios from 'axios';
import { EXPO_BACKEND_URL } from '@/contant';
import { Clock } from 'lucide-react-native';
import LoadingUI from '@/components/LoadingUi';

export default function ExamResultsScreen() {
  const [selectedGrade, setSelectedGrade] = useState('Grade 10');
  const [selectedExam, setSelectedExam] = useState('Mid-Term');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [examList, setExamList] = useState<
    { examType: string; id: string }[] | null
  >(null);
  const [result, setResult] = useState<
    | {
        marksObtained: number;
        subjectCode: string;
        subjectName: string;
        totalMarks: number;
      }[]
    | null
  >(null);

  const grades = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  const getExamList = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${EXPO_BACKEND_URL}/student/getStudentExamList?classId=a0964ff0-9f6c-4dad-9a03-7c6e8d5e2fca`
      );
      setExamList(res.data.exam);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getResult = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${EXPO_BACKEND_URL}/student/getStudentResult?examId=${selectedExam}&enrollment=${'2530010'}`
      );
      setResult(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getExamList();
  }, []);

  useEffect(() => {
    getResult();
  }, [selectedExam]);

  return (
    <View className="flex-1 bg-gray-50">
      <NavHeader title="Exam Result" description="See all your exam results" />

      <ScrollView
        className="flex-1 px-4 py-6"
        contentContainerStyle={{ paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Filter Section */}
        <View className="bg-white p-4 rounded-2xl shadow mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Filters
          </Text>

          <View className="flex-row">
            {/* Grade Picker */}
            <View className="flex-1 mr-2">
              <Text className="text-sm text-gray-500 mb-2">Select Grade</Text>
              <View className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
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
              <Text className="text-sm text-gray-500 mb-2">Exam Type</Text>
              <View className="border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                <Picker
                  selectedValue={selectedExam}
                  onValueChange={(itemValue) => setSelectedExam(itemValue)}
                  dropdownIconColor="#4B5563"
                >
                  {examList && examList.length > 0 ? (
                    examList.map((e, idx) => (
                      <Picker.Item key={idx} label={e.examType} value={e.id} />
                    ))
                  ) : (
                    <Picker.Item key={1} label="Loading..." value="loading" />
                  )}
                </Picker>
              </View>
            </View>
          </View>
        </View>

        {/* Results Section */}
        <View className="bg-white p-4 rounded-2xl shadow">
          {isLoading ? (
            <LoadingUI />
          ) : result && result.length > 0 ? (
            result.map((res, idx) => (
              <View
                key={idx}
                className={`flex-row justify-between items-center py-4 ${
                  idx < result.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                {/* Subject Info */}
                <View className="flex-1">
                  <Text className="text-base font-semibold text-gray-900">
                    {res.subjectName}
                  </Text>
                  <Text className="text-xs text-gray-500 mt-1">
                    {res.subjectCode}
                  </Text>
                </View>

                {/* Marks */}
                <View className="items-end">
                  <Text className="text-lg font-bold text-indigo-600">
                    {res.marksObtained}/{res.totalMarks}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            // Empty / Not Declared
            <View className="items-center py-10">
              <View className="flex-row items-center px-4 py-2 bg-yellow-50 rounded-full">
                <Clock size={18} color="#F59E0B" />
                <Text className="ml-2 text-yellow-700 font-medium">
                  Result not declared
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
