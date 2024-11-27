import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import ProfileHeader from "./components/ProfileHeader";
import TabScreen from "./components/Tabs";

export default function ProfileScreen() {
    const navigation = useNavigation();

    return (
        <ScrollView >
            <TabScreen />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    list: {
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    noCardView: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    noCardMessage: {
        fontSize: 20,
        fontStyle: 'italic',
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    profilePic: {
        width: 35,
        height: 35,
        resizeMode: 'cover',
        borderRadius: 75,
        borderWidth: 2,
        marginRight: 20
    },
    username: {
        fontWeight: 500,
        fontSize: 18
    }
});

