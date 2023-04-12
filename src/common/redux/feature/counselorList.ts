import { createSlice } from '@reduxjs/toolkit';

export const counselorListSlice = createSlice({
  name: 'counselorList',
  initialState: { value: '' },
  reducers: {
    searchCounselorKeyWords: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { searchCounselorKeyWords } = counselorListSlice.actions;
export default counselorListSlice.reducer;
