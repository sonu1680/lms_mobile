import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import * as Progress from 'react-native-progress';
import NavHeader from '@/components/NavHeader';
import axios from 'axios';
import { EXPO_BACKEND_URL } from '@/contant';
import LoadingUI from '@/components/LoadingUi';
import { StudentFee } from '@/types';
import FeeList from '@/components/FeeList';

export default function FeeScreen() {
  const [feeData, setFeeReport] = useState<StudentFee | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //@ts-ignore
  const getFeeReport = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${EXPO_BACKEND_URL}/admin/getDueFee?enrollment=2530002`
      );
      setFeeReport(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFeeReport();
  }, []);

  return (
    <View className="flex-1 bg-gradient-to-b from-blue-50 to-purple-100 ">
      <NavHeader description="View and manage fee report" title="Fee Report" />

      {isLoading || !feeData ? <LoadingUI /> : <FeeList feeData={feeData} />}
    </View>
  );
}
