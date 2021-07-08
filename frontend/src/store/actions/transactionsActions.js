import transactionsSlice from "../slices/transactionsSlice";

export const {
  transactionsFetchRequest,
  transactionsFetchSuccess,
  transactionsFetchFailure,
  transactionPost,
  transactionPostSuccess,
  transactionPostFailure
} = transactionsSlice.actions;

