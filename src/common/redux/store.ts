import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userCenterSlice from './feature/userCenter';
import loginTabs from './feature/loginTabs';
import { login } from './service/login';
import { forgetPassword } from './service/forgetPassword';
import { resetPassword } from './service/resetPassword';

const reducers = combineReducers({
  userCenterSlice,
  loginTabs,
  [login.reducerPath]: login.reducer,
  [forgetPassword.reducerPath]: forgetPassword.reducer,
  [resetPassword.reducerPath]: resetPassword.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(login.middleware)
    .concat(forgetPassword.middleware)
    .concat(resetPassword.middleware),
});

export default store;
