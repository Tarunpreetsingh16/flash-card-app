import * as React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LabelTextInput from './LabelTextInput';

type SearchableDropdownProps = {
    searchKey: string;
    onChange: (val: string) => void;
    label: string;
    placeholder: string;
    hits: SearchableDropdownItem[]
};

const SearchableDropdown = ({
    searchKey,
    onChange,
    label,
    placeholder,
    hits
}: SearchableDropdownProps) => {
    const [optionsContainerVisible, setOptionsContainerVisible] = React.useState(false);
    console.log({ hits, searchKey, optionsContainerVisible });

    React.useEffect(() => {
        if (hits && hits.length > 0) {
            setOptionsContainerVisible(true);
        }
        else {
            setOptionsContainerVisible(false);
        }
    }, [hits])

    return (
        <View style={styles.container}>
            <LabelTextInput
                placeholder={placeholder}
                value={searchKey}
                onChange={onChange}
                label={label}
            />
            {optionsContainerVisible
                &&
                <ScrollView style={styles.optionsContainer}>
                    {
                        hits.map((hit) => {
                            return (
                                <Text
                                    style={styles.optionText}
                                    key={hit.id}
                                    onPress={() =>  {
                                        onChange(hit.name);
                                        setOptionsContainerVisible(false)
                                    }}>
                                    {hit.name}
                                </Text>
                            )
                        })
                    }
                </ScrollView>
            }

        </View >
    );
};

const styles = StyleSheet.create({
    optionsContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        top: '90%',
        left: 0,
        right: 0,
        zIndex: 10,
        borderWidth: 0.3,
        elevation: 5,
        height: 120
    },
    optionText: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
});
export interface SearchableDropdownItem {
    id: number,
    name: string
}
export default SearchableDropdown;
