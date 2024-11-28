import CardList from "@/components/CardList";
import { Flashcard } from "@/data/FlashCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export default function UserCards() {
    const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
    const userId = 0;

    useEffect(() => {
        const loadFlashcards = async () => {
            try {
                const storedFlashcards = await AsyncStorage.getItem('flashcards');
                setFlashcards(null);
                if (storedFlashcards != null) {
                    let flashcardsFromStorage: Flashcard[] = JSON.parse(storedFlashcards);
                    flashcardsFromStorage = flashcardsFromStorage.filter((card) => card.userId == userId);
                    setFlashcards(flashcardsFromStorage.length > 0 ? flashcardsFromStorage.reverse() : null);
                }
            } catch (error) {
                console.error('Error loading flashcards:', error);
            }
        };

        loadFlashcards();
    }, [])

    return (
        <>
            {
                flashcards
                    ? <CardList flashcards={flashcards} />
                    : <View style={styles.noCardView}>
                        <Text style={styles.noCardMessage}>
                            Let's create my first card!
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