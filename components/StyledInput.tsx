import type React from "react";
import { View, Text, TextInput } from "react-native";

interface StyledTextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const StyledTextInput: React.FC<StyledTextInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View className={`mb-4`}>
      <Text className={`text-sm font-medium text-gray-600 mb-1`}>{label}</Text>
      <TextInput
        className={`w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={"black"}
      />
    </View>
  );
};

export default StyledTextInput;
