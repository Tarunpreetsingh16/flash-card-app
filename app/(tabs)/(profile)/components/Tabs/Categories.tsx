import PressableOptionItem from "@/components/PressableOptionItem";
import { Category } from "@/data/Category";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Divider } from "react-native-paper";

const Categories = () => {
    const categories = useAppSelector((state) => state.categories.categories)
    const router = useRouter();

    const onCategoryPress = (category: Category) => {
        router.push(`/(tabs)/(profile)/categoryCards?id=${category.id}`)
    }

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
                                onPress={() => onCategoryPress(category)} />
                                <Divider />
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
