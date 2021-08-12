import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  registerLoading: false,
  registerError: null,
  loginLoading: false,
  loginError: null,
  updateError: null,
  updateLoading: false,
  user: null,
};

const name = 'users';

const usersSlice = createSlice({
  name,
  initialState,
  reducers: {
    cleanUserErrorsRequest: () => {
    },
    cleanUserErrors: state => {
      state.registerError = null;
      state.loginError = null;
      state.updateError = null;
    }, registerRequest: state => {
      state.registerLoading = true;
    },
    registerSuccess: (state, {payload: user}) => {
      state.registerLoading = false;
      state.user = user;
    },
    registerFailure: (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error;
    },
    updateRequest: state => {
      state.updateLoading = true;
    },
    updateSuccess: (state, {payload: user}) => {
      state.updateLoading = false;
      state.updateError = null;
      state.user = user;
    },
    updateFailure: (state, {payload: error}) => {
      state.updateLoading = false;
      state.updateError = error;
    },
    loginRequest: state => {
      state.loginLoading = true;
    },
    loginSuccess: (state, {payload: user}) => {
      state.loginLoading = false;
      state.user = user;
    },
    loginFailure: (state, {payload: error}) => {
      state.loginLoading = false;
      state.loginError = error;
    },
    googleLoginRequest: state => {
      state.loginLoading = true;
    },
    logoutRequest: () => {
    },
    logoutSuccess: state => {
      state.user = null;
    },
    deleteUserRequest: () => {
    },
    deleteUserSuccess: state => {
      state.user = null;
    }
  }
});

export default usersSlice;