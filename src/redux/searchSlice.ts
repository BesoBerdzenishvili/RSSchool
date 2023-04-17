import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = '';

export const searchSlice = createSlice({
  name: 'seatch-text',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;
