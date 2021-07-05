import axiosApi from "../../axiosApi";
import {put, takeEvery} from "redux-saga/effects";
import {
    createAccountFailure,
    createAccountRequest,
    createAccountSuccess,
    deleteAccountRequest,
    deleteAccountSuccess,
    fetchAccountsFailure,
    fetchAccountsRequest,
    fetchAccountsSuccess,
    updateAccountRequest,
    deleteAccountFailure,
    updateAccountSuccess,
    updateAccountFailure,
    fetchAccountSuccess, fetchAccountFailure
} from "../actions/accountsActions";
import {historyPush} from "../actions/historyActions";


export function* fetchAccounts({payload: id}) {
    try {
        const response = yield axiosApi.get('/accounts/' + id);
        yield put(fetchAccountsSuccess(response.data));
    } catch (e) {
        yield put(fetchAccountsFailure(e.response.data));
    }
}

export function* fetchAccount({payload: accountId}) {
    try {
       const response = yield axiosApi.get('/accounts/' + accountId);
        yield put(fetchAccountSuccess(response.data));

    } catch (e) {
        yield put(fetchAccountFailure(e.response.data));
    }
}

export function* createAccount({payload: accountData}) {
    try {
        console.log(accountData);
        yield axiosApi.post('/accounts/' + accountData.id, accountData.data);

        yield put(createAccountSuccess());
        yield put(historyPush('/groups/' + accountData.id));
    } catch (e) {
        yield put(createAccountFailure(e.response.data));
    }
}

export function* deleteAccount({payload: id}) {
    try {
        console.log(id);
        yield axiosApi.delete('/accounts/' + id);
        yield put(deleteAccountSuccess(id));
    } catch (e) {
        console.log(e.response.data)
        yield put(deleteAccountFailure(e.response.data))
    }
}

export function* updateAccount({payload: accountData}) {
    try {
        const data = new FormData();
        Object.keys(accountData).forEach(key => {
            data.append(key, accountData[key]);
        });
        console.log(accountData);
        const response = yield axiosApi.put(`/accounts/${accountData.id}`, accountData);
        console.log(response);
        console.log(data);
        console.log(accountData);
        yield put(updateAccountSuccess(response.data));

    } catch (e) {
        yield put(updateAccountFailure(e.response.data));
    }
}

const accountsSagas = [
    takeEvery(fetchAccountsRequest, fetchAccounts),
    takeEvery(createAccountRequest, createAccount),
    takeEvery(deleteAccountRequest, deleteAccount),
    takeEvery(updateAccountRequest, updateAccount)
];

export default accountsSagas;