import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FormData } from '../types/DataTypes';

type CardsState = FormData[];

const initialState: CardsState = [];

export const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<FormData>) => {
      state.push({ ...action.payload });
    },
  },
});

export const { addCard } = cardsSlice.actions;
