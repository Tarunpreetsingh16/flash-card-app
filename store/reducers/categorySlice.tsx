import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/data/Category';
import CategoryUtility from '@/utils/CategoryUtility';

interface CategoryState {
    categories: Category[];
    nextId: number;
}

const initialState: CategoryState = {
    categories: [],
    nextId: 0,
}

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        addCategory: (state, action: PayloadAction<Category>) => {
            if (!state.categories) {
                state.categories = [];
            }
            const category = action.payload;
            category.id = state.nextId;
            state.categories.push(category);
            state.nextId = state.categories.length > 0 ? state.categories[state.categories.length - 1].id + 1 : 0
            console.log(`Successfully created new category with id ${category.id}, next id=${state.nextId}`);
            CategoryUtility.saveCategories(state.categories);
        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload;
            state.nextId = state.categories.length > 0 ? state.categories[state.categories.length - 1].id + 1 : 0
            console.log("loaded categories to redux store")
        },
        deleteCategory: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            state.categories = state.categories.filter((category) => category.id !== id);
            console.log(`Successfully deleted category with id ${id}`)
            CategoryUtility.saveCategories(state.categories);
        },
        clearCategories: (state) => {
            state.categories = []
            CategoryUtility.saveCategories(state.categories);
        }
    }
});


export const { setCategories, addCategory, deleteCategory, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
