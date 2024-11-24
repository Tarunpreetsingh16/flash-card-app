import { Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
    <StatusBar barStyle="dark-content" backgroundColor="white" />
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    </>
  );
}
