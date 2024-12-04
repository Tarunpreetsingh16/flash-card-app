import { Stack } from "expo-router";

export default function ProfileStackLayout() {
  return (
    <Stack>
      <Stack.Screen name="profile"
        options={{
          title: "Profile",
        }} />
      <Stack.Screen name="userCards"
        options={{
          title: "My Cards",
        }} />
    </Stack>
  );
}
