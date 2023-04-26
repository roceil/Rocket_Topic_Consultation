import { createSlice } from '@reduxjs/toolkit';

export const counselorReservationTabSlice = createSlice({
  name: 'counselorReservationTab',
  initialState: { value: '待回覆' },
  reducers: {
    counselorReservationTab: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { counselorReservationTab } = counselorReservationTabSlice.actions;
export default counselorReservationTabSlice.reducer;
