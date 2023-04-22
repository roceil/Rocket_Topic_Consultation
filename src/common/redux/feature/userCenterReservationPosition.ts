import { createSlice } from '@reduxjs/toolkit';

export const userCenterReservationPositionSlice = createSlice({
  name: 'userCenterReservationPosition',
  initialState: { value: 1 },
  reducers: {
    reservationPageNum: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { reservationPageNum } = userCenterReservationPositionSlice.actions;
export default userCenterReservationPositionSlice.reducer;

