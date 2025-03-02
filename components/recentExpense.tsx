import { View, Text } from "react-native";
import React from "react";
import { Expense } from "@/constants/expenses";
import formatCurrency from "@/utils/formatCurrency";
import Ionicons from "@expo/vector-icons/Ionicons";
import Feather from "@expo/vector-icons/Feather";
import { Link } from "expo-router";

export default function RecentExpense({ data }: { data: Expense }) {
  return (
    <Link
      href={{
        pathname: "/[id]/singleExpense",
        params: {
          id: data.id,
          category: data.category,
          title: data.title,
          price: data.price,
          date: data.date,
        },
      }}
    >
      <View className="rounded-3xl p-4 bg-slate-200 flex items-center flex-row gap-3 overflow-hidden">
        {data.category == "Food" ? (
          <Ionicons name="fast-food-outline" size={27} color="black" />
        ) : data.category == "Transport" ? (
          <Ionicons name="bus-outline" size={24} color="black" />
        ) : (
          <Feather name="shopping-bag" size={24} color="black" />
        )}
        <View className="flex-grow">
          <Text numberOfLines={1} className="font-medium text-xl">
            {data.title.length > 24
              ? data.title.slice(0, 25) + "..."
              : data.title}
          </Text>
          <Text numberOfLines={1} className="font-regular text-base">
            {data.category.length > 24
              ? data.category.slice(0, 25) + "..."
              : data.category}
          </Text>
        </View>
        <View className="justify-self-end flex-shrink-0">
          <View>
            <Text
              numberOfLines={1}
              className="font-semiBold text-right text-lg"
            >
              {formatCurrency(data.price)}
            </Text>
            <Text numberOfLines={1} className="text-right font-medium">
              {new Date(data.date).toDateString().slice(4, 10)}
            </Text>
          </View>
        </View>
      </View>
    </Link>
  );
}
