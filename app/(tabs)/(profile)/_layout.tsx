import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function ProfileStackLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>

            <Stack>
                <Stack.Screen name="index"
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="userCards"
                    options={{
                        headerShown: false
                    }} />
                <Stack.Screen name="categoryCards"
                    options={{
                        headerShown: false
                    }} />
            </Stack>
        </GestureHandlerRootView>
    );
}
