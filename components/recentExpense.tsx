import { View, Text } from "react-native";
import React from "react";
import { Expense } from "@/constants/expenses";
import formatCurrency from "@/utils/formatCurrency";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";

export default function RecentExpense({ data }: { data: Expense }) {
  return (
    <View className="rounded-3xl p-4 bg-slate-200 flex items-center flex-row gap-3">
      {data.category == "Food" ? (
        <Ionicons name="fast-food-outline" size={27} color="black" />
      ) : data.category == "Transport" ? (
        <Ionicons name="bus-outline" size={24} color="black" />
      ) : (
        <Feather name="shopping-bag" size={24} color="black" />
      )}
      <View className="flex-grow">
        <Text className="font-medium text-xl">{data.category}</Text>
        <Text className="font-regular text-base">{data.title}</Text>
      </View>
      <View className="justify-self-end flex-shrink-0">
        <View>
          <Text className="font-semiBold text-right text-lg">
            {formatCurrency(data.price)}
          </Text>
          <Text className="text-right font-medium">
            {new Date(data.date).toDateString().slice(4, 10)}
          </Text>
        </View>
      </View>
    </View>
  );
}
