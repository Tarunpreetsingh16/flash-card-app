import { combineReducers } from '@reduxjs/toolkit';
import cardReducer from './reducers/flashcardSlice';

const rootReducer = combineReducers({
  flashcards: cardReducer,
});

export default rootReducer;
