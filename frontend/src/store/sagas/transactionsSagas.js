import {put, takeEvery} from 'redux-saga/effects';
import axiosApi from "../../axiosApi";
import {transactionPost, transactionPostFailure, transactionPostSuccess} from "../actions/transactionsActions";

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

const transactionsSagas = [
  takeEvery(transactionPost, postTransaction),
];

export default transactionsSagas;