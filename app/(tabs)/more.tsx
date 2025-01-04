import CustomAppBar from "@/components/CustomAppBar";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { clearCategories } from "@/store/reducers/categorySlice";
import { clearCards } from "@/store/reducers/flashcardSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import {
    View,
    Text,
    SectionList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";

const MoreScreen = () => {
    const dispatch = useAppDispatch();
    const settingsData = [
        {
            title: "Account Settings",
            data: [
                { label: "Edit Profile", onPress: () => Alert.alert("Edit Profile") },
                { label: "Change Password", onPress: () => Alert.alert("Change Password") },
                {
                    label: "Clear memory", onPress: () => {
                        dispatch(clearCards())
                        dispatch(clearCategories())
                    }
                },
            ],
        },
        {
            title: "Preferences",
            data: [
                { label: "Notifications", onPress: () => Alert.alert("Notifications") },
                { label: "Theme", onPress: () => Alert.alert("Theme") },
            ],
        },
        {
            title: "About",
            data: [
                { label: "Privacy Policy", onPress: () => Alert.alert("Privacy Policy") },
                { label: "Terms of Service", onPress: () => Alert.alert("Terms of Service") },
                { label: "App Version", onPress: () => Alert.alert("App Version: 1.0.0") },
                { label: "Contact Us", onPress: () => Alert.alert("Contact us") },
            ],
        },
    ];

    return (
        <>
            <CustomAppBar title="More"/>

            <View style={styles.container}>
                <SectionList
                    sections={settingsData}
                    keyExtractor={(item, index) => item.label + index}
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.sectionHeader}>{title}</Text>
                    )}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={item.onPress} style={styles.option}>
                            <Text style={styles.optionText}>{item.label}</Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    sectionHeader: {
        padding: 10,
        fontWeight: "bold",
        backgroundColor: "#eaeaea",
    },
    option: {
        padding: 15,
        backgroundColor: "#fff",
    },
    optionText: {
    },
    separator: {
        height: 1,
        backgroundColor: "#ccc",
    },
});

export default MoreScreen;
