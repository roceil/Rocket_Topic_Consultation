import { createSlice } from '@reduxjs/toolkit';

export const signUpSlice = createSlice({
  name: 'signUpTabs',
  initialState: { value: '用戶' },
  reducers: {
    signUpTabs: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { signUpTabs } = signUpSlice.actions;
export default signUpSlice.reducer;
