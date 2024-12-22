import store from "@/store";
import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { Provider } from "react-redux";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(update)" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
