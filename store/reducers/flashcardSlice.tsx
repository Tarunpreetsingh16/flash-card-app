import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flashcard } from '@/data/FlashCard';
import FlashcardUtility from '@/utils/FlashcardUtility';

interface FlashcardsState {
    flashcards: Flashcard[];
    nextId: number
}

const initialState: FlashcardsState = {
    flashcards: [],
    nextId: 0,
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
            state.flashcards.push(flashcard)
            state.nextId = state.flashcards.length > 0 ? state.flashcards[state.flashcards.length - 1].id + 1 : 0
            console.log(`Successfully created new card with id ${flashcard.id}, next id=${state.nextId}`);
            FlashcardUtility.saveCards(state.flashcards);

        },
        setFlashcards: (state, action: PayloadAction<Flashcard[]>) => {
            state.flashcards = action.payload.reverse();
            state.nextId = state.flashcards.length > 0 ? state.flashcards[0].id + 1 : 0
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
        },
        toggleFavorite: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            for (let i = 0; i < state.flashcards.length; i++) {
                if (state.flashcards[i].id === id) {
                    state.flashcards[i].favorite = !state.flashcards[i].favorite;
                }
            }
            console.log(`Successfully (un)favorited card with id ${id}`)
            FlashcardUtility.saveCards(state.flashcards);
        }
    }
});


export const { setFlashcards, addFlashcard, updateFlashcard, deleteFlashcard, clearCards, toggleFavorite } = flashcardSlice.actions;
export default flashcardSlice.reducer;
