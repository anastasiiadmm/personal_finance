import transactionsSlice from "../slices/transactionsSlice";

export const {
  transactionsFetch,
  transactionsFetchSuccess,
  transactionsFetchFailure,
  transactionPost,
  transactionPostSuccess,
  transactionPostFailure
} = transactionsSlice.actions;

