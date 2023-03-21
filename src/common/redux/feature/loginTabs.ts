import { createSlice } from '@reduxjs/toolkit';

export const loginTabsSlice = createSlice({
  name: 'loginTabs',
  initialState: { value: '用戶' },
  reducers: {
    loginTabs: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { loginTabs } = loginTabsSlice.actions;
export default loginTabsSlice.reducer;
