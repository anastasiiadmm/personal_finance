import {all} from 'redux-saga/effects';
import history from "../history";
import historySagas from "./sagas/historySagas";
import usersSagas from "./sagas/usersSagas";
import groupsSagas from "./sagas/groupsSagas";
import accountsSagas from "./sagas/accountsSagas";
import categoriesSagas from "./sagas/categoriestSagas";
import transactionsSagas from "./sagas/transactionsSagas";

export default function* rootSaga() {
  yield all([
    ...historySagas(history),
    ...usersSagas,
    ...groupsSagas,
    ...accountsSagas,
    ...categoriesSagas,
    ...transactionsSagas
  ])
}