import { createSlice } from '@reduxjs/toolkit';

export const userCenterSlice = createSlice({
  name: 'userCenter',
  initialState: { value: '個人資料' },
  reducers: {
    userCenterPosition: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.value = action.payload;
    },
  },
});
export const { userCenterPosition } = userCenterSlice.actions;
export default userCenterSlice.reducer;
