import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, TextInput } from "react-native";


const Search: React.FC = () => {
    const [searchText, setSearchText] = useState('');
    const router = useRouter();

    const searchCards = () => {
        console.log({searchText});
        console.log(searchText && searchText.trim().length != 0);
        if (searchText && searchText.trim().length != 0) {
        console.log("here", !searchText && searchText.trim().length != 0);
        router.push(`/searchResult?keyword=${searchText}`);
        }
    }

    return (
        <TextInput
            style={styles.inputField}
            value={searchText}
            placeholder="Search a tag"
            onChangeText={setSearchText}
            returnKeyType="search"
            onSubmitEditing={searchCards}
        />
    )
}

const styles = StyleSheet.create({
    inputField: {
        borderWidth: 1
    }
})

export default Search;