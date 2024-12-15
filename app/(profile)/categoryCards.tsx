import CardList from "@/components/CardList";
import { Category } from "@/data/Category";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";
import { useNavigation } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryCards() {
    const navigation = useNavigation();
    const params = useSearchParams();
    const categoryIdString: string = params.get('id') ?? '';
    const userId = 0;
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)
    const categories = useAppSelector((state: RootState) => state.categories.categories)
    const [categoryFlashcards, setCategoryFlashcards] = useState(flashcards);
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        if (flashcards && categoryIdString && !isNaN(parseInt(categoryIdString.trim()))) {
            const categoryId: number = parseInt(categoryIdString.trim());
            const category = categories.find((category) => category.id === categoryId);
            setCategory(category);
            const filteredFlashcards = flashcards.filter((card) => card.userId == userId && card.categoryId == category?.id);
            setCategoryFlashcards(filteredFlashcards.reverse());
        }
    }, [])    

    useLayoutEffect(() => {
        navigation.setOptions({
            title: category?.name
        });
    }, [navigation, category]);

    return (
        <>
            {
                flashcards.length > 0
                    ? <CardList flashcards={categoryFlashcards} />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage}>
                            No cards for the category.
                        </Text>
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    noCardView: {
        height: '100%',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    noCardMessage: {
        fontSize: 20,
        fontStyle: 'italic',
    },
})