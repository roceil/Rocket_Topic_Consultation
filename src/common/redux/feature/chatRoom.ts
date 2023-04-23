import { createSlice } from '@reduxjs/toolkit';

export const chatRoomSlice = createSlice({
  name: 'chatRoom',
  initialState: { value: 'hidden' },
  reducers: {
    chatRoomAlert: (state, action) => {
      const newState = { ...state };
      if (action.payload === true) {
        newState.value = 'hidden';
        return newState;
      } if (action.payload === false) {
        newState.value = 'block';
        return newState;
      }
      return newState;
    },
  },
});

export const { chatRoomAlert } = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
