import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const hasTokenSlice = createSlice({
  name: 'hasToken',
  initialState: { value: false },
  reducers: {
    hasToken: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      console.log('HYDRATE', action);
      const newState = { ...state };
      newState.value = action.payload.hasTokenSlice.value;
      return newState;
    },
  },
});

export const { hasToken } = hasTokenSlice.actions;
export const selectHasToken = (state: { hasTokenSlice: { value: boolean } }) => state.hasTokenSlice.value;
export default hasTokenSlice.reducer;
