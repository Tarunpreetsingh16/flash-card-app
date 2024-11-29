import { Stack } from "expo-router";
import { Alert, Button, Text, TouchableOpacity } from "react-native";

export default function CardManipulationLayout() {
  return (
    <Stack>
      <Stack.Screen name="updateCard"
        options={{
          title: "Update Card"
        }} />
    </Stack>
  );
}
