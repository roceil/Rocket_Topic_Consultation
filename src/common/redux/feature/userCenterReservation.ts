import { createSlice } from '@reduxjs/toolkit';

export const userCenterReservationSlice = createSlice({
  name: 'userCenter',
  initialState: { value: '待預約' },
  reducers: {
    reservationTab: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { reservationTab } = userCenterReservationSlice.actions;
export default userCenterReservationSlice.reducer;

