import { StyleSheet, View } from "react-native";
import CustomAppBar from "@/components/CustomAppBar";
import Tabs from "./components/Tabs";
import ProfileHeader from "./components/ProfileHeader";

export default function ProfileScreen() {

    return (
        <>
            <CustomAppBar title="Profile"/>
            <View style={styles.container}>
                <ProfileHeader />
                <Tabs />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
});

