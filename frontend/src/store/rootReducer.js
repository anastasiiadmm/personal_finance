import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import notifierSlice from "./slices/notifierSlice";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  notifier: notifierSlice.reducer,
});

export default rootReducer;