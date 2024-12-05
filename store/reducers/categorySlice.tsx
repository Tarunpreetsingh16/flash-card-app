import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '@/data/Category';
import CategoryUtility from '@/utils/CategoryUtility';

interface CategoryState {
    categories: Category[];
    count: number;
}

const initialState: CategoryState = {
    categories: [],
    count: 0,
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
            state.categories.push(category);
            CategoryUtility.saveCategories(state.categories);

        },
        setCategories: (state, action: PayloadAction<Category[]>) => {
            state.categories = action.payload.reverse();
            state.count = state.categories.length > 0 ? state.categories[state.categories.length - 1].id + 1 : 1
            console.log("loaded categories to redux store")
        },
        updateCategory: (state, action: PayloadAction<Category>) => {
            const category = action.payload;
            for (let i = 0; i < state.categories.length; i++) {
                if (state.categories[i].id === category.id) {
                    state.categories[i].count =
                        state.categories[i].count
                            ? state.categories[i].count + 1
                            : 1;
                }
            }
            console.log(`Successfully update category with id ${category.id}`);
            CategoryUtility.saveCategories(state.categories);
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


export const { setCategories, addCategory, updateCategory, deleteCategory, clearCategories } = categorySlice.actions;
export default categorySlice.reducer;
