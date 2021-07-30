import transactionsSlice from "../slices/transactionsSlice";

export const {
  transactionsFetchRequest,
  transactionsFetchSuccess,
  transactionsFetchFailure,
  transactionsTypeRequest,
  transactionsTypeSuccess,
  transactionsTypeFailure,
  transactionPost,
  transactionPostSuccess,
  transactionPostFailure,
  deleteTransactionRequest,
  deleteTransactionSuccess
} = transactionsSlice.actions;

