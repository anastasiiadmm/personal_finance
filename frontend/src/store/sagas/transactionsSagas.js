import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {
  transactionPost,
  transactionPostFailure,
  transactionPostSuccess,
  transactionsFetchRequest, transactionsFetchSuccess
} from "../actions/transactionsActions";

export function* postTransaction({payload: transactionData}) {
  try {
    const data = new FormData();

    Object.keys(transactionData).forEach(key => {
      data.append(key, transactionData[key]);
    });
    yield axiosApi.post('/transactions/' + transactionData.type, data);
    yield put(transactionPostSuccess());
  } catch (error) {
    console.log(error.response.data)
    yield put(transactionPostFailure(error.response.data.message));
  }
}

export function* transactionsFetch({payload : data}) {
  try {
    let transactionsResponse = null;
    if (data) {
      transactionsResponse = yield axiosApi.get('/transactions', {params: {category: data.id}});
    } else {
      transactionsResponse = yield axiosApi.get('/transactions');
    }
    yield put(transactionsFetchSuccess(transactionsResponse.data));
  } catch (err) {
    console.log(err.response.data)
    yield put(transactionPostFailure(err.response.data.message));
  }
}

const transactionsSagas = [
  takeEvery(transactionPost, postTransaction),
  takeEvery(transactionsFetchRequest, transactionsFetch)
];

export default transactionsSagas;