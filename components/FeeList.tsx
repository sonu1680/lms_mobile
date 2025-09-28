import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';

export default function FeeList({ feeData }: { feeData: any }) {
  const progress = feeData?.totalPaid / feeData?.totalPayable;

  return (
    <View className="flex-1 px-4">
      {/* Header Card */}
      <View className="rounded-2xl p-5 mb-4 shadow-lg bg-white mt-2">
        <Text className="text-2xl font-bold text-black">{feeData.name}</Text>
        <Text className="text-black text-lg mt-1">
          {feeData.grade} • {feeData.section}
        </Text>
        <Text className="text-sm text-black-200 mt-1">
          Enrollment: {feeData.enrollment}
        </Text>
      </View>

      {/* Fee Summary */}
      <View className="bg-white rounded-2xl shadow-lg p-5 mb-4">
        <Text className="text-xl font-bold text-gray-800 mb-3">
          Fee Summary
        </Text>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Total Payable</Text>
          <Text className="text-gray-800 font-semibold">
            ₹{feeData.totalPayable}
          </Text>
        </View>

        <View className="flex-row justify-between mb-2">
          <Text className="text-gray-600">Total Paid</Text>
          <Text className="text-green-600 font-semibold">
            ₹{feeData.totalPaid}
          </Text>
        </View>

        <View className="flex-row justify-between">
          <Text className="text-gray-600">Pending</Text>
          <Text
            className={`font-bold ${
              feeData.dueAmount > 0 ? 'text-red-600' : 'text-green-700'
            }`}
          >
            ₹{feeData.dueAmount}
          </Text>
        </View>

        {/* Progress Bar */}
        <View className="mt-4 items-center">
          <Progress.Bar
            progress={progress}
            width={250}
            color={feeData.dueAmount > 0 ? '#f43f5e' : '#10b981'}
            unfilledColor="#e5e7eb"
            borderWidth={0}
            height={12}
            borderRadius={10}
          />
          <Text className="text-xs text-gray-500 mt-2">
            {Math.round(progress * 100)}% Paid
          </Text>
        </View>

        {feeData.dueAmount > 0 && (
          <TouchableOpacity
            className="mt-5 bg-pink-500 py-3 rounded-2xl shadow"
            onPress={() => alert('Proceed to Payment')}
          >
            <Text className="text-white text-center font-semibold text-lg">
              Pay Pending Fee
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Transaction History */}
      <View className="bg-white rounded-2xl shadow-lg p-5 flex-1 mb-6">
        <Text className="text-xl font-bold text-gray-800 mb-3">
          Payment History
        </Text>

        {feeData.transcation.length === 0 ? (
          <Text className="text-gray-500">No payments yet</Text>
        ) : (
          <FlatList
            data={feeData.transcation}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-xl">
                <Text className="text-gray-800 font-semibold">
                  Amount: ₹{item.amount}
                </Text>
                <Text className="text-sm text-gray-600">
                  Mode: {item.paymentMode}
                </Text>
                <Text className="text-sm text-gray-600">
                  Transaction ID: {item.transactionId}
                </Text>
                <Text className="text-sm text-gray-500">
                  {new Date(item.paidAt).toLocaleDateString()} •{' '}
                  {new Date(item.paidAt).toLocaleTimeString()}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
}
