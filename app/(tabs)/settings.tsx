import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Text } from "react-native";

export default function Settings() {
    const deleteCards = async () => {
        await AsyncStorage.clear();
        Alert.alert(
            '',
            'Memory wiped!'
        )
    }

    return (
        <Text onPress={deleteCards}>Delete Cards</Text>
    )
}