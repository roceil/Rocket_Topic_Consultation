import { createSlice } from '@reduxjs/toolkit';

export const counselorCasePageSlice = createSlice({
  name: 'counselorCasePage',
  initialState: { value: 1 },
  reducers: {
    counselorCasePage: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { counselorCasePage } = counselorCasePageSlice.actions;
export default counselorCasePageSlice.reducer;
