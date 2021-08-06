import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  transactionsLoading: false,
  transactionsError: null,
  transactionPostLoading: false,
  transactionPostError: null,
  transactions: {count: null, rows: []},
};

const name = 'transactions';

const transactionsSlice = createSlice({
  name,
  initialState,
  reducers: {
    transactionsFetchRequest: (state) => {
      state.transactionsLoading = true;
    },
    transactionsFetchSuccess: (state, {payload: transaction}) => {
      state.transactionsLoading = false;
      state.transactions = transaction;
    },
    transactionsFetchFailure: (state, {payload: error}) => {
      state.transactionsLoading = false;
      state.transactionsError = error;
    },
    transactionsTypeRequest: (state) => {
      state.transactionsLoading = true;
    },
    transactionsTypeSuccess: (state, {payload: transaction}) => {
      state.transactionsLoading = false;
      state.transactions.rows = transaction;
    },
    transactionsTypeFailure: (state) => {
      state.transactionsLoading = false;
    },
    transactionPost: (state) => {
      state.transactionPostLoading = true;
    },
    transactionPostSuccess: (state) => {
      state.transactionPostLoading = false;
    },
    transactionPostFailure: (state, {payload: error}) => {
      state.transactionPostLoading = false;
      state.transactionPostError = error;
    },
    deleteTransactionRequest: () => {
    },
    deleteTransactionSuccess: () => {
    }
  }
});

export default transactionsSlice;