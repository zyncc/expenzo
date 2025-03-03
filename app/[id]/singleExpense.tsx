import { View, Text, Pressable } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import formatCurrency from "@/utils/formatCurrency";
import { db } from "@/lib/db";
import { expensesSchema } from "@/db/schema";
import { eq } from "drizzle-orm";

export default function SingleExpense() {
  const { id, category, title, price, date, lender } = useLocalSearchParams();
  const router = useRouter();
  const stringId = parseInt(id as string);
  async function handleDeleteExpense() {
    await db.delete(expensesSchema).where(eq(expensesSchema.id, stringId));
    router.replace("/");
  }
  return (
    <View className="p-4 flex flex-col gap-3">
      <View className="bg-slate-200 rounded-2xl p-3">
        <Text className="text-xl font-medium">{category}</Text>
        <Text className="text-xl font-medium">
          {formatCurrency(Number(price))}
        </Text>
        <Text className="text-xl font-medium">{lender}</Text>
        <Text className="text-xl font-medium">
          {new Intl.DateTimeFormat("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          }).format(new Date(date as string))}
        </Text>
      </View>
      <Pressable
        onPress={handleDeleteExpense}
        className="rounded-2xl p-3 bg-[#014b1c] flex items-center justify-center"
      >
        <Text className="text-white font-semibold text-lg">Delete Expense</Text>
      </Pressable>
    </View>
  );
}
