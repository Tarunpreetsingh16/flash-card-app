import { Stack } from "expo-router";

export default function ProfileStackLayout() {
    return (
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
    );
}
