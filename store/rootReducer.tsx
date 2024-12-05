import { combineReducers } from '@reduxjs/toolkit';
import cardReducer from './reducers/flashcardSlice';
import categoryReducer from './reducers/categorySlice';

const rootReducer = combineReducers({
  flashcards: cardReducer,
  categories: categoryReducer
});

export default rootReducer;
