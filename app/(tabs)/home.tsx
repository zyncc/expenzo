import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useCallback, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import formatCurrency from "@/utils/formatCurrency";
import RecentExpense from "@/components/recentExpense";
import { expenses } from "@/constants/expenses";
import AddExpense from "@/components/AddExpense";
import BottomSheet from "@gorhom/bottom-sheet";

// <TextInput
//   style={{ paddingTop: 0, paddingBottom: 0 }}
//   cursorColor={"gray"}
//   placeholder="Add an Expense"
//   textAlignVertical="center"
//   className="flex text-xl h-16 rounded-2xl px-3 py-0 w-full border bg-transparent placeholder:text-muted-foreground disabled:opacity-50 font-regular"

export default function Home() {
  const sheetRef = useRef<BottomSheet>(null);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  return (
    <SafeAreaView className="px-4 relative">
      <ScrollView showsVerticalScrollIndicator={false} className="flex gap-5">
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-3xl font-semiBold">February</Text>
          <Pressable
            onPress={() => handleSnapPress(0)}
            className="rounded-full w-[35px] h-[35px] bg-[#014b1c] flex items-center justify-center"
          >
            <Text className="font-medium text-xl text-white">+</Text>
          </Pressable>
        </View>
        <View className="bg-slate-200 p-3 my-5 rounded-3xl flex">
          <View>
            <Text className="font-medium text-lg">Total Expense</Text>
            <Text className="text-3xl font-semiBold">
              {formatCurrency(5240)}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center mt-3">
            <View className="flex-1">
              <Text className="font-medium text-lg">Today</Text>
              <Text className="font-semiBold text-xl">
                {formatCurrency(300)}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="font-medium text-lg">This Week</Text>
              <Text className="font-semiBold text-xl">
                {formatCurrency(1370)}
              </Text>
            </View>
          </View>
        </View>
        <View className="mt-4">
          <Text className="font-semiBold text-3xl">Recent Expenses</Text>
          {expenses.length == 0 && (
            <View className="flex items-center justify-center">
              <Text className="font-medium text-2xl">
                No Expenses this month
              </Text>
            </View>
          )}

          <View className="flex gap-3 mt-4">
            {expenses.map((expense, index) => (
              <RecentExpense key={index} data={expense} />
            ))}
          </View>
        </View>
        <AddExpense sheetRef={sheetRef} />
      </ScrollView>
    </SafeAreaView>
  );
}
