import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import userCenterReservationPosition from './feature/userCenterReservationPosition';
import zoomSlice from './feature/zoom';
import signUpSlice from './feature/signUp';
import loginTabs from './feature/loginTabs';
import loadingSlice from './feature/loading';
import hasTokenSlice from './feature/hasToken';
import chatRoomSlice from './feature/chatRoom';
import userCenterSlice from './feature/userCenter';
import headerAlertSlice from './feature/headerAlert';
import counselorListSlice from './feature/counselorList';
import chatRoomSwitchSlice from './feature/chatRoomSwitch';
import counselorCasePage from './feature/counselorCasePage';
import userCenterReservation from './feature/userCenterReservation';
import counselorReservationTab from './feature/counselorReservationTab';
import counselorReservationPage from './feature/counselorReservationPage';

import { login } from './service/login';
import { header } from './service/header';
import { signUp } from './service/signUp';
import { userCenter } from './service/userCenter';
import { shoppingCart } from './service/shoppingCart';
import { counselorList } from './service/counselorList';
import { resentLicense } from './service/resentLicense';
import { counselorPage } from './service/counselorPage';
import { resetPassword } from './service/resetPassword';
import { forgetPassword } from './service/forgetPassword';
import { counselorCenter } from './service/counselorCenter';
import { timetableBrowser } from './service/timetableBrowser';
import { counselorReservation } from './service/counselorReservation';

const reducers = combineReducers({
  zoomSlice,
  loginTabs,
  signUpSlice,
  loadingSlice,
  hasTokenSlice,
  chatRoomSlice,
  userCenterSlice,
  headerAlertSlice,
  counselorCasePage,
  counselorListSlice,
  chatRoomSwitchSlice,
  userCenterReservation,
  counselorReservationTab,
  counselorReservationPage,
  userCenterReservationPosition,
  [login.reducerPath]: login.reducer,
  [signUp.reducerPath]: signUp.reducer,
  [header.reducerPath]: header.reducer,
  [userCenter.reducerPath]: userCenter.reducer,
  [shoppingCart.reducerPath]: shoppingCart.reducer,
  [resetPassword.reducerPath]: resetPassword.reducer,
  [counselorPage.reducerPath]: counselorPage.reducer,
  [resentLicense.reducerPath]: resentLicense.reducer,
  [counselorList.reducerPath]: counselorList.reducer,
  [forgetPassword.reducerPath]: forgetPassword.reducer,
  [counselorCenter.reducerPath]: counselorCenter.reducer,
  [timetableBrowser.reducerPath]: timetableBrowser.reducer,
  [counselorReservation.reducerPath]: counselorReservation.reducer,
});

// 註冊

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(login.middleware)
    .concat(signUp.middleware)
    .concat(header.middleware)
    .concat(userCenter.middleware)
    .concat(shoppingCart.middleware)
    .concat(shoppingCart.middleware)
    .concat(resetPassword.middleware)
    .concat(counselorPage.middleware)
    .concat(counselorList.middleware)
    .concat(resentLicense.middleware)
    .concat(forgetPassword.middleware)
    .concat(counselorCenter.middleware)
    .concat(timetableBrowser.middleware)
    .concat(counselorReservation.middleware),
});

const wrapper = createWrapper(() => store, { debug: false });
export default wrapper;
