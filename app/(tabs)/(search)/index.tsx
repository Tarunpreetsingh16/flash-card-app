import CustomAppBar from "@/components/CustomAppBar";
import LabelTextInput from "@/components/LabelTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Snackbar } from "react-native-paper";


const Search: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const [visible, setVisible] = useState(false);

    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);

    const searchCards = () => {
        if (searchText && searchText.trim().length != 0) {
            router.push(`/searchResult?keyword=${searchText}`);
        }
        else {
            onToggleSnackBar()
        }
    }

    return (
        <>
            <CustomAppBar title="Search" />
            <SafeAreaView style={styles.container}>
                <LabelTextInput
                    placeholder="e.g. Planets"
                    value={searchText}
                    onChange={setSearchText}
                    returnKeyType="search"
                    onSubmitEditing={searchCards} >
                    <Ionicons name="search" size={24} color="black" onPress={searchCards} />
                </LabelTextInput>
            </SafeAreaView>
            <Snackbar
                visible={visible}
                onDismiss={onDismissSnackBar}
                duration={3000}>
                Please enter a search term
            </Snackbar>
        </>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1
    },
    container: {
        paddingHorizontal: 5,
        margin: 8
    },
})

export default Search;