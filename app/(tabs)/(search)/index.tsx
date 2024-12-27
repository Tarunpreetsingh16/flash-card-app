import CustomAppBar from "@/components/CustomAppBar";
import LabelTextInput from "@/components/LabelTextInput";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";


const Search: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const searchCards = () => {
        if (searchText && searchText.trim().length != 0) {
            router.push(`/searchResult?keyword=${searchText}`);
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