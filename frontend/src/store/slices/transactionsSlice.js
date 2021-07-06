import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
  transactionsLoading: false,
  transactionsError: null,
  transactionPostLoading: false,
  transactionPostError: null,
  transactions: null,
};

const name = 'transactions';

const transactionsSlice = createSlice({
  name,
  initialState,
  reducers: {
    transactionsFetch: (state) => {
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
    transactionPost: (state) => {
      state.transactionPostLoading = true;
    },
    transactionPostSuccess: (state) => {
      state.transactionPostLoading = false;
    },
    transactionPostFailure:  (state, {payload: error}) => {
      state.transactionPostLoading = false;
      state.transactionPostError = error;
    },

  }
});

export default transactionsSlice;