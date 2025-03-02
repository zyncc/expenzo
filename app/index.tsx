import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RecentExpense from "@/components/recentExpense";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import { desc } from "drizzle-orm";
import * as schema from "@/db/schema";
import { db } from "@/lib/db";
import formatCurrency from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { Expense } from "@/constants/expenses";
import Feather from "@expo/vector-icons/Feather";

export default function Home() {
  const { data } = useLiveQuery(
    db
      .select()
      .from(schema.expensesSchema)
      .orderBy(desc(schema.expensesSchema.date))
  );

  const [expenses, setExpenses] = useState<Expense[]>();
  const [filterOn, setFilterOn] = useState(false);

  useEffect(() => {
    setExpenses(data);
  }, [data]);

  return (
    <ScrollView className="flex-1 px-4">
      <View className="flex-1 pb-5">
        {data.length === 0 ? (
          <View className="flex items-center justify-center">
            <Text numberOfLines={1} className="font-medium text-xl">
              No Expenses this month
            </Text>
          </View>
        ) : (
          <View className="flex gap-3">
            <View className="flex flex-row gap-2 mt-2">
              <Pressable
                onPress={() => {
                  setExpenses(
                    data.filter((expense) => expense.borrower === "Dad")
                  );
                  setFilterOn(true);
                }}
                className="p-3 bg-slate-200 rounded-2xl flex items-center justify-center"
              >
                <Text className="font-medium text-lg font-semiBold">
                  <Text className="font-medium text-xl">Dad: </Text>
                  {formatCurrency(
                    data
                      .filter((expense) => expense.borrower === "Dad")
                      .reduce((sum, expense) => sum + Number(expense.price), 0)
                  )}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setExpenses(
                    data.filter((expense) => expense.borrower === "Mom")
                  );
                  setFilterOn(true);
                }}
                className="p-3 bg-slate-200 rounded-2xl flex items-center justify-center"
              >
                <Text className="font-medium text-lg font-semiBold">
                  <Text className="font-medium text-xl">Mom: </Text>
                  {formatCurrency(
                    data
                      .filter((expense) => expense.borrower === "Mom")
                      .reduce((sum, expense) => sum + Number(expense.price), 0)
                  )}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setExpenses(
                    data.filter((expense) => expense.borrower === "Sister")
                  );
                  setFilterOn(true);
                }}
                className="p-3 bg-slate-200 rounded-2xl flex items-center justify-center"
              >
                <Text className="font-medium text-lg font-semiBold">
                  <Text className="font-medium text-xl">Sister: </Text>
                  {formatCurrency(
                    data
                      .filter((expense) => expense.borrower === "Sister")
                      .reduce((sum, expense) => sum + Number(expense.price), 0)
                  )}
                </Text>
              </Pressable>
              {filterOn && (
                <Pressable
                  onPress={() => {
                    setFilterOn((prev) => !prev);
                    setExpenses(data);
                  }}
                  className="p-3 bg-slate-200 rounded-2xl flex items-center justify-center"
                >
                  <Feather name="filter" size={24} color="black" />
                </Pressable>
              )}
            </View>
            <View className="mt-5 flex flex-col gap-3">
              {expenses?.map((expense) => (
                <RecentExpense key={expense.id} data={expense} />
              ))}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
