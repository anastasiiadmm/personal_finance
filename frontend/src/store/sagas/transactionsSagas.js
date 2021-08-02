import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
  deleteTransactionRequest,
  deleteTransactionSuccess,
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
  } catch (error) {
    yield put(addNotification({message: error.response.data.message, options: {variant: 'error'}}));
    yield put(transactionPostFailure(error.response.data.message));
  }
}

export function* transactionsFetch({payload: data}) {
  try {
    let transactionsResponse;
    if (data) {
      transactionsResponse = yield axiosApi.get('/transactions', {params: {data: data}});
    } else {
      transactionsResponse = yield axiosApi.get('/transactions');
    }
    yield put(transactionsFetchSuccess(transactionsResponse.data));
  } catch (err) {
    console.log(err.response.data)
    yield put(transactionsFetchFailure(err.response.data.message));
  }
}

export function* transactionsTypeFetch({payload: data}) {
  try {
    const response = yield axiosApi.get(`/transactions/transactionType?type=${data.categoryType}`);
    yield put(transactionsTypeSuccess(response.data));
  } catch (err) {
    yield put(transactionsTypeFailure());
  }
}

export function* deleteTransaction({payload: id}) {
  try {
    yield axiosApi.delete(`/transactions/${id}`);
    yield put(deleteTransactionSuccess(id));
    yield put(addNotification({message: 'Transaction deleted successful', options: {variant: 'success'}}));
  } catch (e) {
    yield put(addNotification({message: 'Delete transaction failed', options: {variant: 'error'}}));
  }
}

const transactionsSagas = [
  takeEvery(transactionPost, postTransaction),
  takeEvery(transactionsFetchRequest, transactionsFetch),
  takeEvery(deleteTransactionRequest, deleteTransaction),
  takeEvery(transactionsTypeRequest, transactionsTypeFetch)
];

export default transactionsSagas;