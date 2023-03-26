import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userCenterSlice from './feature/userCenter';
import loginTabs from './feature/loginTabs';
import signUpSlice from './feature/signUp';
import hasTokenSlice from './feature/hasToken';
import { login } from './service/login';
import { forgetPassword } from './service/forgetPassword';
import { resetPassword } from './service/resetPassword';
import { signUp } from './service/signUp';

const reducers = combineReducers({
  userCenterSlice,
  signUpSlice,
  loginTabs,
  hasTokenSlice,
  [login.reducerPath]: login.reducer,
  [forgetPassword.reducerPath]: forgetPassword.reducer,
  [resetPassword.reducerPath]: resetPassword.reducer,
  [signUp.reducerPath]: signUp.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(login.middleware)
    .concat(forgetPassword.middleware)
    .concat(resetPassword.middleware)
    .concat(signUp.middleware),
});

const wrapper = createWrapper(() => store, { debug: false });
export default wrapper;
