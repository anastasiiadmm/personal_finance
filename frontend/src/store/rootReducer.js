import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import notifierSlice from "./slices/notifierSlice";
import groupsSlice from "./slices/groupsSlice";
import accountsSlice from "./slices/accountsSlice";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  groups: groupsSlice.reducer,
  accounts: accountsSlice.reducer,
  notifier: notifierSlice.reducer,
});

export default rootReducer;