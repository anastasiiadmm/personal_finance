import {loadFromLocalStorage, saveToLocalStorage} from "./localStorage";
import {initialState} from "./slices/usersSlice";
import axiosApi from "../axiosApi";
import createSagaMiddleware from 'redux-saga';
import rootSaga from "./rootSaga";
import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {logoutRequest} from "./actions/usersActions";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  devTools: true,
  preloadedState: loadFromLocalStorage(),
});

sagaMiddleware.run(rootSaga);

store.subscribe(() => {
  saveToLocalStorage({
    users: {
      ...initialState,
      user: store.getState().users.user,
    }
  });
});

axiosApi.interceptors.request.use(config => {
  try {
    config.headers['Authorization'] = store.getState().users.user.token.token;
  } catch (e) {
    // do nothing, no token exists
  }

  return config;
});

axiosApi.interceptors.response.use(res => res, e => {
  if (!e.response) {
    e.response = {data: {global: 'No internet'}};
  }
  if (e.response.data.error === 'Outdated token') {
      store.dispatch(logoutRequest('outdated'))
  }
  throw e;
})

export default store;