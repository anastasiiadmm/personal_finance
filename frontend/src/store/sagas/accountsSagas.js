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
} from "../actions/accountsActions";
import {addNotification} from "../actions/notifierActions";


export function* fetchAccounts({payload: id}) {
  try {
    let response;
    if (id) {
      response = yield axiosApi.get('/accounts/' + id);
    } else {
      response = yield axiosApi.get('/accounts/');
    }
    yield put(fetchAccountsSuccess(response.data));
  } catch (e) {
    yield put(fetchAccountsFailure(e.response.data));
  }
}
//
// export function* fetchAccount({payload: accountId}) {
//   try {
//     const response = yield axiosApi.get('/accounts/' + accountId.data.id);
//     yield put(fetchAccountSuccess(response.data));
//       console.log(accountId);
//       console.log(accountId.data.id)
//   } catch (e) {
//     yield put(fetchAccountFailure(e.response.data));
//   }
// }

export function* createAccount({payload: accountData}) {
    try {
        const data = new FormData();
        Object.keys(accountData.data).forEach(key => {
            data.append(key, accountData.data[key]);
        });
        yield axiosApi.post('/accounts/' + accountData.id, data);
        yield put(createAccountSuccess());

        yield put(fetchAccountsRequest(accountData.id));
        yield put(addNotification({message: 'Account created successfully', options: {variant: 'success'}}));
    } catch (e) {
        console.log(e.response.data)
        yield put(createAccountFailure(e.response.data));
    }
}

export function* deleteAccount({payload: id}) {
    try {
        console.log(id);
        yield axiosApi.delete('/accounts/' + id);
        yield put(deleteAccountSuccess(id));
        yield put(addNotification({message: 'Account deleted successfully', options: {variant: 'success'}}));
    } catch (e) {
        console.log(e.response.data)
        yield put(deleteAccountFailure(e.response.data))
    }
}

export function* updateAccount({payload: accountData}) {
    try {
        const data = new FormData();
        const updateData = accountData.accountData;
        Object.keys(updateData).forEach(key => {
            data.append(key, updateData[key]);
        });
        yield axiosApi.put(`/accounts/${updateData.id}`, data);
        yield put(updateAccountSuccess());

        yield put(fetchAccountsRequest(accountData.id));


        yield put(addNotification({message: 'Account updated successfully', options: {variant: 'success'}}));
    } catch (e) {
        yield put(updateAccountFailure(e.response.data));
    }
}

const accountsSagas = [
    takeEvery(fetchAccountsRequest, fetchAccounts),
    // takeEvery(fetchAccountRequest, fetchAccount),
    takeEvery(createAccountRequest, createAccount),
    takeEvery(deleteAccountRequest, deleteAccount),
    takeEvery(updateAccountRequest, updateAccount)
];

export default accountsSagas;