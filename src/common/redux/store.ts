import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import signUpSlice from './feature/signUp';
import userCenterReservationPosition from './feature/userCenterReservationPosition';
import loginTabs from './feature/loginTabs';
import loadingSlice from './feature/loading';
import hasTokenSlice from './feature/hasToken';
import userCenterSlice from './feature/userCenter';
import counselorListSlice from './feature/counselorList';
import userCenterReservation from './feature/userCenterReservation';
import counselorReservationTab from './feature/counselorReservationTab';
import counselorReservationPage from './feature/counselorReservationPage';

import { login } from './service/login';
import { signUp } from './service/signUp';
import { userCenter } from './service/userCenter';
import { shoppingCart } from './service/shoppingCart';
import { counselorList } from './service/counselorList';
import { counselorPage } from './service/counselorPage';
import { resetPassword } from './service/resetPassword';
import { forgetPassword } from './service/forgetPassword';
import { counselorCenter } from './service/counselorCenter';
import { counselorReservation } from './service/counselorReservation';
import { timetableBrowser } from './service/timetableBrowser';

const reducers = combineReducers({
  loginTabs,
  signUpSlice,
  loadingSlice,
  hasTokenSlice,
  userCenterSlice,
  counselorListSlice,
  userCenterReservation,
  userCenterReservationPosition,
  counselorReservationTab,
  counselorReservationPage,
  [login.reducerPath]: login.reducer,
  [signUp.reducerPath]: signUp.reducer,
  [userCenter.reducerPath]: userCenter.reducer,
  [shoppingCart.reducerPath]: shoppingCart.reducer,
  [counselorPage.reducerPath]: counselorPage.reducer,
  [counselorList.reducerPath]: counselorList.reducer,
  [resetPassword.reducerPath]: resetPassword.reducer,
  [forgetPassword.reducerPath]: forgetPassword.reducer,
  [counselorCenter.reducerPath]: counselorCenter.reducer,
  [counselorReservation.reducerPath]: counselorReservation.reducer,
  [timetableBrowser.reducerPath]: timetableBrowser.reducer,
});

// 註冊

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(login.middleware)
    .concat(signUp.middleware)
    .concat(userCenter.middleware)
    .concat(shoppingCart.middleware)
    .concat(resetPassword.middleware)
    .concat(counselorPage.middleware)
    .concat(counselorList.middleware)
    .concat(forgetPassword.middleware)
    .concat(counselorCenter.middleware)
    .concat(counselorReservation.middleware)
    .concat(shoppingCart.middleware)
    .concat(timetableBrowser.middleware),
});

const wrapper = createWrapper(() => store, { debug: false });
export default wrapper;
