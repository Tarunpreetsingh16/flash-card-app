import CardList from "@/components/CardList";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store";
import { useSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CategoryCards() {
    const params = useSearchParams();
    const categoryIdString: string = params.get('id') ?? '';
    const userId = 0;
    const flashcards = useAppSelector((state: RootState) => state.flashcards.flashcards)
    const [categoryFlashcards, setCategoryFlashcards] = useState(flashcards);

    useEffect(() => {
        if (flashcards && categoryIdString && !isNaN(parseInt(categoryIdString.trim()))) {
            const categoryId: number = parseInt(categoryIdString.trim());
            console.log({categoryIdString, categoryId});

            const filteredFlashcards = flashcards.filter((card) => card.userId == userId && card.categoryId == categoryId);
            setCategoryFlashcards(filteredFlashcards.reverse());
        }
    }, [])

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