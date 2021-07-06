import {combineReducers} from "redux";
import usersSlice from "./slices/usersSlice";
import notifierSlice from "./slices/notifierSlice";
import groupsSlice from "./slices/groupsSlice";
import accountsSlice from "./slices/accountsSlice";
import categoriesSlice from "./slices/categoriesSlice";
import transactionsSlice from "./slices/transactionsSlice";

const rootReducer = combineReducers({
  users: usersSlice.reducer,
  groups: groupsSlice.reducer,
  accounts: accountsSlice.reducer,
  notifier: notifierSlice.reducer,
  categories: categoriesSlice.reducer,
  transactions: transactionsSlice.reducer
});

export default rootReducer;