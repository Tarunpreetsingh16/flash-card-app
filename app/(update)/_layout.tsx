import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function UpdateStackLayout() {
    return (
        <Stack>
            <Stack.Screen name="index"
                options={{
                    headerShown: false
                }} />
            <Stack.Screen name="changeCategory"
                options={{
                    headerShown: false,
                    gestureEnabled: true,
                }} />
        </Stack>
    )
}
