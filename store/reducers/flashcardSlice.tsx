import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Flashcard } from '@/data/FlashCard';

interface FlashcardsState {
    flashcards: Flashcard[];
    count: number
}

const initialState: FlashcardsState = {
    flashcards: [],
    count: 0
}

const flashcardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        addCard: (state, action: PayloadAction<Flashcard>) => {
            if (!state.flashcards) {
                state.flashcards = [];
            }
            state.flashcards.push(action.payload)
        },
        setFlashcards: (state, action: PayloadAction<Flashcard[]>) => {
            state.flashcards = action.payload.reverse();
            console.log("loaded to redux store")
        },
        updateCard: (state, action: PayloadAction<Flashcard>) => {
            const flashcard = action.payload;
            for (let i = 0; i < state.flashcards.length; i++) {
                if (state.flashcards[i].id === flashcard.id) {
                    state.flashcards[i] = { ...flashcard };
                    state.flashcards[i].imageUri = flashcard.imageUri ? encodeURI(flashcard.imageUri) : null;
                }
            }
        },
        id: (state) => {
            state.count = state.flashcards.length > 0 ? state.flashcards[state.flashcards.length - 1].id + 1 : 1
        }
    }
});

export const { setFlashcards, addCard, updateCard } = flashcardSlice.actions;
export default flashcardSlice.reducer;
