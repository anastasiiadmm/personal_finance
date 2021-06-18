import usersSlice from "../slices/usersSlice";

export const {
  registerRequest,
  registerSuccess,
  registerFailure,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutSuccess,
  googleLoginRequest,
  logoutRequest,
  updateRequest,
  updateSuccess,
  updateFailure,
} = usersSlice.actions;

