import {  } from "expo-router";
import {  } from "react";
import { StyleSheet, View } from "react-native";
import ProfileHeader from "./components/ProfileHeader";
import TabScreen from "./components/Tabs";

export default function ProfileScreen() {

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

