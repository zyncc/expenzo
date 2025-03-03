import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { useEffect } from "react";
import Header from "@/components/Header";
import { db } from "@/lib/db";
import * as Updates from "expo-updates";
import { Alert } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-BlackItalic": require("../assets/fonts/Poppins-BlackItalic.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-BoldItalic": require("../assets/fonts/Poppins-BoldItalic.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraBoldItalic": require("../assets/fonts/Poppins-ExtraBoldItalic.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-ExtraLightItalic": require("../assets/fonts/Poppins-ExtraLightItalic.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-LightItalic": require("../assets/fonts/Poppins-LightItalic.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-MediumItalic": require("../assets/fonts/Poppins-MediumItalic.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-SemiBoldItalic": require("../assets/fonts/Poppins-SemiBoldItalic.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
    "Poppins-ThinItalic": require("../assets/fonts/Poppins-ThinItalic.ttf"),
  });

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          "An Update is Available",
          "Click Install to Update",
          [
            {
              text: "Install",
              onPress: async () => {
                await Updates.fetchUpdateAsync();
                await Updates.reloadAsync();
              },
              style: "default",
            },
          ],
          {
            cancelable: true,
          }
        );
      }
    } catch (error) {
      alert(`${error}`);
    }
  }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onFetchUpdateAsync();
  }, []);

  const { success, error } = useMigrations(db, migrations);

  return (
    <ThemeProvider value={DefaultTheme}>
      <Stack screenOptions={{ animation: "ios_from_right" }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            header: () => {
              return <Header />;
            },
          }}
        />
        <Stack.Screen
          name="createExpense/create"
          options={{
            headerShown: true,
            title: "Add Expense",
            headerTitleStyle: {
              fontFamily: "Poppins-SemiBold",
            },
            headerStyle: {
              backgroundColor: "#f2f2f2",
            },
          }}
        />
        <Stack.Screen
          name="[id]/singleExpense"
          options={({ route }) => ({
            headerShown: true,
            title: String(route.params?.title) || "Expense",
            headerTitleStyle: {
              fontFamily: "Poppins-SemiBold",
            },
            headerStyle: {
              backgroundColor: "#f2f2f2",
            },
          })}
        />
      </Stack>
      <StatusBar style="dark" />
    </ThemeProvider>
  );
}
