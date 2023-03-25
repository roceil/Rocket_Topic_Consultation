import { createSlice } from '@reduxjs/toolkit';

export const userCenterSlice = createSlice({
  name: 'userCenter',
  initialState: { value: '個人資料' },
  reducers: {
    userCenterPosition: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});
export const { userCenterPosition } = userCenterSlice.actions;
export default userCenterSlice.reducer;
