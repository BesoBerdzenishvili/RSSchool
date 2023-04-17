import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { characterApi } from './characterApi';
import { cardsSlice } from './formApi';
import { searchSlice } from './searchSlice';

const rootReducer = combineReducers({
  [characterApi.reducerPath]: characterApi.reducer,
  form: cardsSlice.reducer,
  search: searchSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(characterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
