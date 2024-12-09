import * as React from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import LabelTextInput from './LabelTextInput';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

type SearchableDropdownProps = {
    searchKey: string;
    onValueChange: (val: string) => void;
    label: string;
    placeholder: string;
    hits: SearchableDropdownItem[];
    onOptionSelect: (id: number) => void
};

const SearchableDropdown = ({
    searchKey,
    onValueChange,
    label,
    placeholder,
    hits,
    onOptionSelect
}: SearchableDropdownProps) => {
    const [optionsContainerVisible, setOptionsContainerVisible] = React.useState(false);
    const optionsContainerHiddenRef = React.useRef(false);

    React.useEffect(() => {
        if (optionsContainerHiddenRef.current) {
            setOptionsContainerVisible(false);
            optionsContainerHiddenRef.current = false
        }
        else if (hits && hits.length > 0) {
            setOptionsContainerVisible(true);
        }
        else {
            setOptionsContainerVisible(false);
        }
    }, [hits])

    const onPress = (hit: SearchableDropdownItem) => {
        Keyboard.dismiss(); // Close the keyboard
        onValueChange(hit.name);
        onOptionSelect(hit.id);
        optionsContainerHiddenRef.current = true
    }

    return (
        <View>
            <LabelTextInput
                placeholder={placeholder}
                value={searchKey}
                onChange={onValueChange}
                label={label}
            />
            {optionsContainerVisible
                &&
                <ScrollView style={styles.optionsContainer}>
                    {
                        hits.map((hit) => {
                            return (
                                <GestureHandlerRootView key={hit.id}>
                                    <TouchableWithoutFeedback
                                        style={styles.optionText}
                                        onPress={() => onPress(hit)}>
                                        <Text>{hit.name}</Text>
                                    </TouchableWithoutFeedback>
                                </GestureHandlerRootView>
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
