import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import formatCurrency from "@/utils/formatCurrency";
import RecentExpense from "@/components/recentExpense";
import { expenses } from "@/constants/expenses";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import * as schema from "@/db/schema";

export default function Home() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");

  const expo = openDatabaseSync("db.db", { enableChangeListener: true });
  const db = drizzle(expo, { schema });

  const { data } = useLiveQuery(db.select().from(schema.expensesSchema));

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        opacity={0.8}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    []
  );

  async function handleAddExpense() {
    await db.insert(schema.expensesSchema).values({
      title,
      category,
      price: parseInt(price),
      date: new Date().toISOString().split("T")[0],
    });
    bottomSheetModalRef.current?.close();
    setTitle("");
    setCategory("");
    setPrice("");
  }

  const month = new Date().toLocaleString("en-US", { month: "long" });

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex gap-5 px-4"
      >
        <View className="flex flex-row justify-between items-center mt-5">
          <Text className="text-3xl font-semiBold">{month}</Text>
          <Pressable
            onPress={() => handlePresentModalPress()}
            className="rounded-full w-[35px] h-[35px] bg-[#014b1c] flex items-center justify-center"
          >
            <Text className="font-medium text-xl text-white">+</Text>
          </Pressable>
        </View>
        <View className="bg-slate-200 p-3 my-5 rounded-3xl flex">
          <View>
            <Text className="font-medium text-lg">Total Expense</Text>
            <Text className="text-3xl font-semiBold">
              {formatCurrency(data.reduce((a, b) => a + b.price, 0))}
            </Text>
          </View>
          <View className="flex flex-row justify-between items-center mt-3">
            <View className="flex-1">
              <Text className="font-medium text-lg">Today</Text>
              <Text className="font-semiBold text-xl">
                {formatCurrency(
                  data
                    .filter(
                      (item) =>
                        item.date == new Date().toISOString().split("T")[0]
                    )
                    .reduce((a, b) => a + b.price, 0)
                )}
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
            {data.map((expense, index) => (
              <RecentExpense key={index} data={expense} />
            ))}
          </View>
        </View>
      </ScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        snapPoints={["50%"]}
      >
        <BottomSheetView className="px-4 flex-1 bg-[#f2f2f2]">
          <View className="mt-3 flex flex-col gap-5">
            <Text className="text-2xl font-bold">Add Expense</Text>
            <View className="flex flex-col gap-2">
              <Text className="font-medium">Title</Text>
              <TextInput
                textAlignVertical="center"
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
                className="p-3 border rounded-lg placeholder:font-medium"
                cursorColor={"black"}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="font-medium">Category</Text>
              <TextInput
                textAlignVertical="center"
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                className="p-3 border rounded-lg placeholder:font-medium"
                cursorColor={"black"}
              />
            </View>
            <View className="flex flex-col gap-2">
              <Text className="font-medium">Amount</Text>
              <TextInput
                textAlignVertical="center"
                placeholder="Amount"
                value={price.toString()}
                keyboardType="number-pad"
                onChangeText={(text) => setPrice(text)}
                className="p-3 border border-gray-300 rounded-lg placeholder:font-medium"
                cursorColor="black"
              />
            </View>
            <Pressable
              onPress={handleAddExpense}
              className="w-full bg-[#014b1c] p-3 rounded-lg"
            >
              <Text className="text-center text-white font-medium">
                Add Expense
              </Text>
            </Pressable>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
}
