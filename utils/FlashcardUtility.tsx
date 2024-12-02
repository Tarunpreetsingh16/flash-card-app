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

    static deleteCard = async (id: number) => {
        const storedFlashcards = await this.loadFlashcards();
        if (storedFlashcards) {
            const updatedCards = storedFlashcards?.filter((card) => card.id != id)
            await this.saveCards(updatedCards);
            console.log(`Successfully deleted card with id ${id}`);
        }
    }

    static saveCards = async (flashcards: Flashcard[]) => {
        await AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
    }
}