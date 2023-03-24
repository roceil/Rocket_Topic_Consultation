import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userCenterSlice from './feature/userCenter';
import loginTabs from './feature/loginTabs';
import signUpSlice from './feature/signUp';
import { login } from './service/login';
import { forgetPassword } from './service/forgetPassword';
import { resetPassword } from './service/resetPassword';
import { signUp } from './service/signUp';

const reducers = combineReducers({
  userCenterSlice,
  signUpSlice,
  loginTabs,
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

export default store;
