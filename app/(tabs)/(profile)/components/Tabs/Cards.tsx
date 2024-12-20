import PressableOptionItem from "@/components/PressableOptionItem";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Cards() {
    const router = useRouter();

    const routeToUserCards = () => {
        router.push('/(tabs)/(profile)/userCards')
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.optionContainer}>
                <PressableOptionItem label="My Cards" onPress={routeToUserCards} />
            </View>
            <View style={styles.optionContainer}>
                <PressableOptionItem label="Starred Cards" onPress={() => console.log("starred cards")} />
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
