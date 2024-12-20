import CustomAppBar from "@/components/CustomAppBar";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";


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

            <TextInput
                style={styles.inputField}
                value={searchText}
                placeholder="Search a tag"
                onChangeText={setSearchText}
                returnKeyType="search"
                onSubmitEditing={searchCards}
            />
        </>
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1
    }
})

export default Search;