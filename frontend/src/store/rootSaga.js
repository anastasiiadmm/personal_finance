import {all} from 'redux-saga/effects';
import history from "../history";
import historySagas from "./sagas/historySagas";
import usersSagas from "./sagas/usersSagas";
import groupsSagas from "./sagas/groupsSagas";
import accountsSagas from "./sagas/accountsSagas";

export default function* rootSaga() {
    yield all([
        ...historySagas(history),
        ...usersSagas,
        ...groupsSagas,
        ...accountsSagas
    ])
}