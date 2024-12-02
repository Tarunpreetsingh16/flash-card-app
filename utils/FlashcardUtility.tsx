import { Flashcard } from "@/data/FlashCard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class FlashcardUtility {
    static loadFlashcards = async (): Promise<Flashcard[] | null> => {
        try {
            const storedFlashcards = await AsyncStorage.getItem('flashcards');
            if (storedFlashcards !== null) {
                return JSON.parse(storedFlashcards);
            }
        } catch (error) {
            console.error('Error loading flashcards:', error);
        }
        return [];
    }

    static saveCards = async (flashcards: Flashcard[]) => {
        await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
        console.log("Successfully saved cards to async storage!")
    }
}