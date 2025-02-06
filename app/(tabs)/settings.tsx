import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddExpense from "@/components/AddExpense";

export default function Settings() {
  return (
    <SafeAreaView className="h-screen">
      <Text>Settings</Text>
    </SafeAreaView>
  );
}
