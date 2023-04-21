import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userCenterSlice from './feature/userCenter';
import loginTabs from './feature/loginTabs';
import signUpSlice from './feature/signUp';
import hasTokenSlice from './feature/hasToken';
import userCenterReservation from './feature/userCenterReservation';
import loadingSlice from './feature/loading';
import chatRoomSlice from './feature/chatRoom';

import { login } from './service/login';
import { forgetPassword } from './service/forgetPassword';
import { resetPassword } from './service/resetPassword';
import { signUp } from './service/signUp';
import { counselorList } from './service/counselorList';
import { userCenter } from './service/userCenter';
import counselorListSlice from './feature/counselorList';
import { counselorPage } from './service/counselorPage';
import { shoppingCart } from './service/shoppingCart';
import { chatRoom } from './service/chatRoom';

const reducers = combineReducers({
  userCenterSlice,
  signUpSlice,
  loginTabs,
  hasTokenSlice,
  counselorListSlice,
  userCenterReservation,
  loadingSlice,
  chatRoomSlice,
  [login.reducerPath]: login.reducer,
  [forgetPassword.reducerPath]: forgetPassword.reducer,
  [resetPassword.reducerPath]: resetPassword.reducer,
  [signUp.reducerPath]: signUp.reducer,
  [counselorList.reducerPath]: counselorList.reducer,
  [userCenter.reducerPath]: userCenter.reducer,
  [counselorPage.reducerPath]: counselorPage.reducer,
  [shoppingCart.reducerPath]: shoppingCart.reducer,
  [chatRoom.reducerPath]: chatRoom.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(login.middleware)
    .concat(forgetPassword.middleware)
    .concat(resetPassword.middleware)
    .concat(signUp.middleware)
    .concat(counselorList.middleware)
    .concat(userCenter.middleware)
    .concat(counselorPage.middleware)
    .concat(shoppingCart.middleware)
    .concat(chatRoom.middleware),
});

const wrapper = createWrapper(() => store, { debug: false });
export default wrapper;
