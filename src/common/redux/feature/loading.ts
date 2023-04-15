import { createSlice } from '@reduxjs/toolkit';

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: { value: 'none' },
  reducers: {
    loadingStatus: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { loadingStatus } = loadingSlice.actions;
export default loadingSlice.reducer;
