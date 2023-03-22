import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userCenterSlice from './feature/userCenter';
import loginTabs from './feature/loginTabs';
import signUpSlice from './feature/signUp';
import { login } from './service/login';

const reducers = combineReducers({
  userCenterSlice,
  signUpSlice,
  loginTabs,
  [login.reducerPath]: login.reducer,
});

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(login.middleware),
});

export default store;
