import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import ProfileHeader from "./components/ProfileHeader";
import TabScreen from "./components/Tabs";

export default function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ProfileHeader />
            <TabScreen />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
});

