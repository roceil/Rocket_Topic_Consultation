import { configureStore } from "@reduxjs/toolkit";
import  userCenterSlice  from "./userCenter";


export const store = configureStore({
  reducer: {
    userCenterSlice
  }
})