import { View, Text, Image, Pressable } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="flex">
      <View className="px-6 flex items-center justify-center h-screen w-full gap-5">
        <View className="w-full">
          <Text className="text-2xl font-regular">Welcome to</Text>
          <Text className="text-4xl font-medium">Expenzo</Text>
        </View>
        {/* <View className="flex w-full items-center justify-center">
          <Image
            source={require("../assets/images/cash.png")}
            className="w-[100px] h-auto object-contain"
            width={100}
            height={200}
          />
        </View> */}
        <View className="flex-1"></View>
        <Link href={"/(tabs)/home"} asChild>
          <Pressable className="p-3 mb-5 rounded-2xl w-full bg-[#014b1c] text-center flex items-center justify-center">
            <Text className="font-regular text-lg text-white">
              Start Saving Money
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
