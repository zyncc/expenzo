import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { db } from "@/lib/db";
import * as schema from "@/db/schema";
import { Picker } from "@react-native-picker/picker";
import { z } from "zod";

type FormData = {
  title: string;
  category: string;
  amount: string;
  borrower: string;
};

const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  borrower: z.string().min(1, "Borrower is required"),
  amount: z.string().regex(/^\d+$/, "Amount must be a valid number"),
});

export default function Create() {
  const router = useRouter();
  const [data, setData] = useState<FormData>({
    title: "",
    category: "",
    amount: "",
    borrower: "",
  });

  const [error, setError] = useState<string | null>(null);
  const categories = ["Food", "Transport", "Shopping", "Bills"];
  const borrowers = ["Dad", "Mom", "Sister"];

  async function handleAddExpense() {
    try {
      expenseSchema.parse(data);
      await db.insert(schema.expensesSchema).values({
        title: data.title,
        category: data.category,
        borrower: data.borrower,
        price: parseInt(data.amount, 10),
        date: new Date().toISOString(),
      });
      router.replace("/");
    } catch (e) {
      if (e instanceof z.ZodError) {
        setError(e.errors[0]?.message);
      } else {
        console.log(e);
      }
    }
  }

  function handleAmountChange(text: string) {
    if (/^\d*$/.test(text)) {
      setData((prev) => ({ ...prev, amount: text }));
      setError(null);
    }
  }

  return (
    <View className="flex flex-col px-4 mt-10 gap-5">
      <TextInput
        selectionColor={"black"}
        placeholder="Title"
        className="p-3 border border-slate-300 rounded-2xl mb-3 text-base placeholder:font-extraBold"
        placeholderTextColor="#000000"
        value={data.title}
        onChangeText={(text) => setData({ ...data, title: text })}
      />
      <View className="border border-slate-300 rounded-2xl mb-3">
        <Picker
          selectedValue={data.category}
          onValueChange={(value) => setData({ ...data, category: value })}
          className="text-base"
        >
          <Picker.Item label="Select a category" value="" color="#000000" />
          {categories.map((category, index) => (
            <Picker.Item
              key={index}
              label={category}
              value={category}
              color="#111827"
            />
          ))}
        </Picker>
      </View>
      <View className="border border-slate-300 rounded-2xl mb-3">
        <Picker
          selectedValue={data.category}
          onValueChange={(value) => setData({ ...data, borrower: value })}
          className="text-base"
        >
          <Picker.Item label="Select a Lender" value="" color="#000000" />
          {borrowers.map((category, index) => (
            <Picker.Item
              key={index}
              label={category}
              value={category}
              color="#111827"
            />
          ))}
        </Picker>
      </View>
      <TextInput
        keyboardType="number-pad"
        placeholder="Amount"
        className="p-3 border border-slate-300 rounded-2xl mb-3 text-base"
        placeholderTextColor="#000000"
        selectionColor={"black"}
        value={data.amount}
        onChangeText={handleAmountChange}
      />
      {error && <Text className="text-red-500 mb-3">{error}</Text>}
      <Pressable
        onPress={handleAddExpense}
        className="rounded-2xl p-3 bg-[#014b1c] flex items-center justify-center"
      >
        <Text className="text-white font-semibold text-lg">Add Expense</Text>
      </Pressable>
    </View>
  );
}
