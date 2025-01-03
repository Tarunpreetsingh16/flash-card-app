import PressableOptionItem from "@/components/PressableOptionItem";
import { Category } from "@/data/Category";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "expo-router";
import React from "react";
import { Divider } from "react-native-paper";
import { ScrollView, StyleSheet, Vibration, View } from "react-native";

const Categories = () => {
    const categories = useAppSelector((state) => state.categories.categories).filter((category) => category.userId === 0);
    const router = useRouter();

    const onCategoryPress = (category: Category) => {
        Vibration.vibrate(50);
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
