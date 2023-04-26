import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ChatRoomSwitchPayload = {
  isChatRoomOpen: boolean;
  clickUserId: number;
  clickCounselorId: number;
};

type ChatRoomSwitchState = {
  value: ChatRoomSwitchPayload;
};

type ChatRoomSwitchAction = PayloadAction<ChatRoomSwitchPayload>;

const chatRoomSwitchSlice = createSlice({
  name: 'chatRoomSwitch',
  initialState: {
    value: {
      isChatRoomOpen: false,
      clickUserId: 0,
      clickCounselorId: 0,
    },
  } as ChatRoomSwitchState,
  reducers: {
    chatRoomSwitch: (state, action: ChatRoomSwitchAction) => {
      const newState = { ...state };
      newState.value = action.payload;
      return newState;
    },
  },
});

export const { chatRoomSwitch } = chatRoomSwitchSlice.actions;

export default chatRoomSwitchSlice.reducer;
