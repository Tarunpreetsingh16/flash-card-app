import { Stack } from "expo-router";

export default function SearchStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="searchResult" options={{ headerShown: false }} />
    </Stack>
  );
}
