import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LabelTextInput from './LabelTextInput';

type SearchableDropdownProps = {
    searchKey: string;
    onChange: (val: string) => void;
    label: string;
    placeholder: string;
};

const SearchableDropdown = ({
    searchKey,
    onChange,
    label,
    placeholder,
}: SearchableDropdownProps) => {
    return (
        <View style={styles.container}>
            <LabelTextInput
                placeholder={placeholder}
                value={searchKey}
                onChange={onChange}
                label={label}
            />
            <View style={styles.optionsContainer}>
                <Text style={styles.optionText}>Option 1</Text>
                <Text style={styles.optionText}>Option 2</Text>
                <Text style={styles.optionText}>Option 3</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    optionsContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '100%', // Start at the bottom of the LabelTextInput
        left: 0,
        right: 0,
        padding: 10,
        margin: 10,
        zIndex: 10, // Ensure it overlays other content
    },
    optionText: {
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
});

export default SearchableDropdown;
