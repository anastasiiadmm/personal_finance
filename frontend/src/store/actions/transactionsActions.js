import transactionsSlice from "../slices/transactionsSlice";

export const {
  transactionsFetchRequest,
  transactionsFetchSuccess,
  transactionsFetchFailure,
  transactionPost,
  transactionPostSuccess,
  transactionPostFailure,
  deleteTransactionRequest,
  deleteTransactionSuccess
} = transactionsSlice.actions;

