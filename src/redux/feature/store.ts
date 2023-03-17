import { configureStore } from '@reduxjs/toolkit';
import userCenterSlice from './userCenter';

const store = configureStore({
  reducer: {
    userCenterSlice,
  },
});

export default store;
