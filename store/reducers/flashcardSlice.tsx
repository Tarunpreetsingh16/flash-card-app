import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flashcard } from '@/data/FlashCard';
import FlashcardUtility from '@/utils/FlashcardUtility';

interface FlashcardsState {
    flashcards: Flashcard[];
    count: number
}

const initialState: FlashcardsState = {
    flashcards: [],
    count: 0,
}

const flashcardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addFlashcard: (state, action: PayloadAction<Flashcard>) => {
            if (!state.flashcards) {
                state.flashcards = [];
            }
            const flashcard = action.payload;
            flashcard.id = state.count;
            state.flashcards.push(flashcard)
            state.count = state.flashcards.length > 0 ? state.flashcards[state.flashcards.length - 1].id + 1 : 1
            console.log(`Successfully created new card with id ${flashcard.id}, next id=${state.count}`);
            FlashcardUtility.saveCards(state.flashcards);

        },
        setFlashcards: (state, action: PayloadAction<Flashcard[]>) => {
            state.flashcards = action.payload.reverse();
            state.count = state.flashcards.length > 0 ? state.flashcards[state.flashcards.length - 1].id + 1 : 1
            console.log("loaded to redux store")
        },
        updateFlashcard: (state, action: PayloadAction<Flashcard>) => {
            const flashcard = action.payload;
            for (let i = 0; i < state.flashcards.length; i++) {
                if (state.flashcards[i].id === flashcard.id) {
                    state.flashcards[i] = { ...flashcard };
                }
            }
            console.log(`Successfully update card with id ${flashcard.id}`);
            FlashcardUtility.saveCards(state.flashcards);
        },
        deleteFlashcard: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.flashcards = state.flashcards.filter((card) => card.id !== id);
            console.log(`Successfully deleted card with id ${id}`)
            FlashcardUtility.saveCards(state.flashcards);
        },
        clearCards: (state) => {
            state.flashcards = []
            FlashcardUtility.saveCards(state.flashcards);
        }
    }
});


export const { setFlashcards, addFlashcard, updateFlashcard, deleteFlashcard, clearCards } = flashcardSlice.actions;
export default flashcardSlice.reducer;
