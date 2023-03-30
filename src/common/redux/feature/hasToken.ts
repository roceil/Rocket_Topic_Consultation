import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState = { value: {} };

export const hasTokenSlice = createSlice({
  name: 'hasToken',
  initialState,
  reducers: {
    hasToken: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload.hasTokenSlice.value;
      return newState;
    },
  },
});

export const { hasToken } = hasTokenSlice.actions;
export const selectHasToken = (state: { hasTokenSlice: { value: any }; }) => state.hasTokenSlice.value;
export default hasTokenSlice.reducer;
