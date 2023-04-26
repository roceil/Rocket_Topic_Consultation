import { createSlice } from '@reduxjs/toolkit';

export const counselorReservationPageSlice = createSlice({
  name: 'counselorReservationPage',
  initialState: { value: 1 },
  reducers: {
    counselorReservationPage: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { counselorReservationPage } = counselorReservationPageSlice.actions;
export default counselorReservationPageSlice.reducer;
