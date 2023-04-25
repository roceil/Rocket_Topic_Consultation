import { createSlice } from '@reduxjs/toolkit';

export const headerAlertSlice = createSlice({
  name: 'headerAlert',
  initialState: { value: false },
  reducers: {
    hasHeaderAlert: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { hasHeaderAlert } = headerAlertSlice.actions;
export default headerAlertSlice.reducer;
