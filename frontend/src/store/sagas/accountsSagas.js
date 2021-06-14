import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    createAccountsFailure, createAccountsRequest,
    createAccountsSuccess, deleteAccountsRequest, deleteAccountsSuccess,
    accountsFailure,
    accountsRequest,
    accountsSuccess
} from "../actions/accountsActions";
import {historyPush} from "../actions/historyActions";


export function* fetchAccounts() {
    try {
        const response = yield axiosApi.get('/accounts');
        yield put(accountsSuccess(response.data));
    } catch (e) {
        yield put(accountsFailure());
    }
}

export function* createAccounts({payload: accountData}) {
    try {
        yield axiosApi.post('/accounts', accountData);
        yield put(createAccountsSuccess());
        yield put(historyPush('/accounts'));
    } catch (e) {
        yield put(createAccountsFailure(e.response.data));
    }
}

export function* deleteAccounts({payload: id}) {
    try {
        yield axiosApi.delete('/accounts/' + id);
        yield put(deleteAccountsSuccess(id));
        yield put(fetchAccounts());
    } catch (e) {
    }
}

const accountsSagas = [
    takeEvery(accountsRequest, fetchAccounts),
    takeEvery(createAccountsRequest, createAccounts),
    takeEvery(deleteAccountsRequest, deleteAccounts)
];

export default accountsSagas;