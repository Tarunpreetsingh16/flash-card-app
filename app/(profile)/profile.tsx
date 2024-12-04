import { StyleSheet, View } from "react-native";
import ProfileHeader from "./components/ProfileHeader";
import Tabs from "./components/Tabs";

export default function ProfileScreen() {

    return (
        <View style={styles.container}>
            <ProfileHeader />
            <Tabs />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
});

