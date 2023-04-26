import { createSlice } from '@reduxjs/toolkit';

export const zoomSlice = createSlice({
  name: 'zoom',
  initialState: { value: {} },
  reducers: {
    zoom: (state, action) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { zoom } = zoomSlice.actions;
export default zoomSlice.reducer;
