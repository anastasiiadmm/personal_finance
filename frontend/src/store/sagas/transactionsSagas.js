import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
  deleteTransactionRequest,
  transactionEdit,
  transactionEditFailure,
  transactionEditSuccess,
  transactionPost,
  transactionPostFailure,
  transactionPostSuccess,
  transactionsFetchFailure,
  transactionsFetchRequest,
  transactionsFetchSuccess,
  transactionsTypeFailure,
  transactionsTypeRequest,
  transactionsTypeSuccess
} from "../actions/transactionsActions";
import {addNotification} from "../actions/notifierActions";


export function* postTransaction({payload: transactionData}) {
  try {

    const data = new FormData();
    Object.keys(transactionData).forEach(key => {
      data.append(key, transactionData[key]);
    });
    yield axiosApi.post('/transactions/' + transactionData.type, data);
    yield put(transactionPostSuccess());
    yield put(transactionsFetchRequest());

  } catch (error) {
    yield put(addNotification({message: error.response.data.message, options: {variant: 'error'}}));
    yield put(transactionPostFailure(error.response.data.message));
  }
}

export function* editTransaction({payload: transactionData}) {
  try {
    yield axiosApi.put('/transactions/', transactionData);
    yield put(transactionEditSuccess());
    yield put(addNotification({message: "Edited successfully", options: {variant: 'success'}}));
    yield put(transactionsFetchRequest());
  } catch (error) {
    yield put(addNotification({message: error.response.data.message, options: {variant: 'error'}}));
    yield put(transactionEditFailure(error.response.data.message));
  }
}

export function* transactionsFetch({payload: data}) {
  try {
    let transactionsResponse;
    if (data) {
      transactionsResponse = yield axiosApi.get('/transactions', {params: {data: data}});
    } else {
      transactionsResponse = yield axiosApi.get('/transactions', {params: {data: {limit: 5, offset: 0}}});
    }
    yield put(transactionsFetchSuccess(transactionsResponse.data));
  } catch (err) {
    console.log(err.response.data)
    yield put(transactionsFetchFailure(err.response.data.message));
  }
}

export function* transactionsTypeFetch({payload: data}) {
  try {
    const response = yield axiosApi.get(`/transactions/transactionType`, {params: {data: data}});
    yield put(transactionsTypeSuccess(response.data));
  } catch (err) {
    yield put(transactionsTypeFailure());
  }
}

export function* deleteTransaction({payload: id}) {
  try {
    yield axiosApi.delete(`/transactions/${id}`);
    yield put(transactionsFetchRequest());
    yield put(addNotification({message: 'Transaction deleted successful', options: {variant: 'success'}}));
  } catch (e) {
    yield put(addNotification({message: 'Delete transaction failed', options: {variant: 'error'}}));
  }
}

const transactionsSagas = [
  takeEvery(transactionPost, postTransaction),
  takeEvery(transactionEdit, editTransaction),

  takeEvery(transactionsFetchRequest, transactionsFetch),
  takeEvery(deleteTransactionRequest, deleteTransaction),
  takeEvery(transactionsTypeRequest, transactionsTypeFetch)
];

export default transactionsSagas;