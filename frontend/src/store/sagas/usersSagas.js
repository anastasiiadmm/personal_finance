import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
  cleanUserErrors,
  cleanUserErrorsRequest,
  googleLoginRequest,
  loginFailure,
  loginRequest,
  loginSuccess,
  logoutRequest,
  logoutSuccess,
  registerFailure,
  registerRequest,
  registerSuccess,
  updateFailure,
  updateRequest,
  updateSuccess
} from "../actions/usersActions";
import {historyPush} from "../actions/historyActions";
import {addNotification} from "../actions/notifierActions";

export function* registerUser({payload: userData}) {
  try {
    const data = new FormData();

    Object.keys(userData).forEach(key => {
      data.append(key, userData[key]);
    });
    const response = yield axiosApi.post('/users/signup', data);
    yield put(registerSuccess(response.data));
    yield put(historyPush('/'));
  } catch (error) {
    yield put(registerFailure(error.response.data));
  }
}

export function* updateUser({payload: userData}) {
  try {
    const data = new FormData();

    Object.keys(userData).forEach(key => {
      data.append(key, userData[key]);
    });
    const response = yield axiosApi.put('/users/sessions', data);
    yield put(updateSuccess(response.data));
  } catch (error) {
    yield put(updateFailure(error.response.data));
  }
}

export function* loginUser({payload: userData}) {
  try {
    const response = yield axiosApi.post('/users/sessions', userData);
    yield put(loginSuccess(response.data));
    yield put(historyPush('/'));
    yield put(addNotification({message: 'Login successful', options: {variant: 'success'}}));
  } catch (error) {
    yield put(loginFailure(error.response.data));
  }
}

export function* googleLogin({payload: {tokenId, googleId}}) {
  try {
    const body = {tokenId, googleId};
    const response = yield axiosApi.post('/users/googleLogin', body);
    yield put(loginSuccess(response.data));
    yield put(historyPush('/'));
    yield put(addNotification({message: 'Login successful', options: {variant: 'success'}}));
  } catch (error) {
    yield put(loginFailure(error.response.data));
  }
}

export function* logout() {
  try {
    yield axiosApi.delete('/users/sessions');
    yield put(logoutSuccess());
    yield put(historyPush('/'));
    yield put(addNotification({message: 'Logged out', options: {variant: 'success'}}));
  } catch (e) {
    yield put(addNotification({message: 'Could not logout', options: {variant: 'error'}}));
  }
}

const usersSagas = [
  takeEvery(registerRequest, registerUser),
  takeEvery(loginRequest, loginUser),
  takeEvery(googleLoginRequest, googleLogin),
  takeEvery(logoutRequest, logout),
  takeEvery(updateRequest, updateUser),
  takeEvery(cleanUserErrorsRequest, function* () {
    yield  put(cleanUserErrors());
  })

];

export default usersSagas;