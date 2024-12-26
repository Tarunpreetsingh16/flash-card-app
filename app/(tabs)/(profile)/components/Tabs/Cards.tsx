import PressableOptionItem from "@/components/PressableOptionItem";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Vibration, View } from "react-native";

export default function Cards() {
    const router = useRouter();

    const routeToUserCards = () => {
        Vibration.vibrate(50)
        router.push('/(tabs)/(profile)/userCards')
    }

    const routeToFavoriteCards = () => {
        Vibration.vibrate(50)
        router.push('/(tabs)/(profile)/userCards?favorite=true')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.optionContainer}>
                <PressableOptionItem label="My Cards" onPress={routeToUserCards} />
            </View>
            <View style={styles.optionContainer}>
                <PressableOptionItem label="Favorite Cards" onPress={routeToFavoriteCards} />
            </View>
            <View style={styles.optionContainer}>
                <PressableOptionItem label="Saved Cards" onPress={() => console.log("saved cards")} />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
    },
    optionContainer: {
        borderBottomWidth: 0.2,
        borderColor: 'rgba(0,0,0,0.2)'
    }
})
