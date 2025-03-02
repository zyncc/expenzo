import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as schema from "@/db/schema";
import { Link } from "expo-router";
import { db } from "@/lib/db";
import { useState } from "react";
import Modal from "react-native-modal";

export default function Header() {
  const [isModalVisible, setModalVisible] = useState(false);

  async function handleDeleteAllExpenses() {
    try {
      await db.delete(schema.expensesSchema);
      setModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView>
      <View className="flex p-4 flex-row justify-between items-center mt-5">
        <View className="flex-1">
          <Text
            className="font-semiBold text-3xl"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Expenzo
          </Text>
        </View>
        <View className="flex gap-5 flex-row">
          <Pressable
            onPress={() => setModalVisible(true)}
            className="rounded-full w-[35px] h-[35px] bg-slate-200 flex items-center justify-center"
          >
            <Text className="font-medium text-xl text-white">🗑️</Text>
          </Pressable>
          <Link href={"/createExpense/create"} asChild>
            <Pressable className="rounded-full w-[35px] h-[35px] bg-[#014b1c] flex items-center justify-center">
              <Text className="font-medium text-xl text-white">+</Text>
            </Pressable>
          </Link>
        </View>
      </View>
      <Modal
        isVisible={isModalVisible}
        animationIn={"fadeIn"}
        animationOut={"fadeOut"}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View className="bg-white p-6 rounded-lg">
          <Text className="text-lg font-semibold mb-3">
            Delete all expenses?
          </Text>
          <Text className="text-gray-600 mb-5">
            This action cannot be undone.
          </Text>
          <View className="flex flex-row justify-end gap-3">
            <Pressable onPress={() => setModalVisible(false)}>
              <Text className="text-gray-500 text-lg">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleDeleteAllExpenses}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              <Text className="text-white text-lg">Delete</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
