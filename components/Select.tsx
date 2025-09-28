import React, { useState } from 'react';
import { View, Text, Pressable, FlatList, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Option = {
  id: string;
  label: string;
};

interface DropdownSelectProps {
  options: Option[];
  value: string | null;
  onChange: (id: string) => void;
  placeholder?: string;
  title?: string;
}

export default function DropdownSelect({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  title,
}: DropdownSelectProps) {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find((o) => o.id === value);

  return (
    <View className="w-full">
      {title && (
        <Text className="text-base font-medium text-gray-700 mb-2">
          {title}
        </Text>
      )}

      {/* Trigger */}
      <Pressable
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between px-4 py-3 bg-white border border-gray-300 rounded-xl"
      >
        <Text
          className={`text-base ${
            selectedOption ? 'text-gray-900' : 'text-gray-400'
          }`}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#6b7280" />
      </Pressable>

      {/* Dropdown Modal */}
      <Modal visible={open} transparent animationType="fade">
        <Pressable
          className="flex-1 bg-black/40"
          onPress={() => setOpen(false)}
        >
          <View className="absolute bottom-0 w-full bg-white rounded-t-2xl p-6">
            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    onChange(item.id);
                    setOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg active:bg-gray-100 flex-row items-center justify-between"
                >
                  <Text className="text-base text-gray-900">{item.label}</Text>
                  {item.id === value && (
                    <Ionicons name="checkmark" size={20} color="#0284c7" />
                  )}
                </Pressable>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}
