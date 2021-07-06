import accountsSlice from "../slices/accountsSlice";

export const {
    accountsRequest,
    accountsSuccess,
    accountsFailure,
    createAccountsRequest,
    createAccountsSuccess,
    createAccountsFailure,
    deleteAccountsRequest,
    deleteAccountsSuccess
} = accountsSlice.actions