import PressableOptionItem from "@/components/PressableOptionItem";
import { useAppSelector } from "@/hooks/useAppSelector";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Categories = () => {
    const categories = useAppSelector((state) => state.categories.categories)

    return (
        <ScrollView style={styles.container}>
            {
                categories.map((category) => {
                    return (
                        <View style={styles.optionContainer}
                            key={category.id}
                        >
                            <PressableOptionItem
                                label={`${category.name}`}
                                onPress={() => console.log({ category })} />
                        </View>
                    )
                })
            }
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    container: {
        padding: 15,
        backgroundColor: 'white',
    },
    optionContainer: {
        borderBottomWidth: 0.2,
        borderColor: 'rgba(0,0,0,0.2)'
    }
})

export default Categories;
