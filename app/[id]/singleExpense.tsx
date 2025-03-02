import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import formatCurrency from "@/utils/formatCurrency";

export default function SingleExpense() {
  const { category, title, price, date } = useLocalSearchParams();
  return (
    <View className="p-4">
      <Text className="text-2xl font-bold">{title}</Text>
      <Text className="text-lg">Category: {category}</Text>
      <Text className="text-lg">Price: {formatCurrency(Number(price))}</Text>
      <Text className="text-lg">
        Date: {new Date(date as string).toDateString()}
      </Text>
    </View>
  );
}
