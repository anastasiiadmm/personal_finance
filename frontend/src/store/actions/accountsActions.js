import accountsSlice from "../slices/accountsSlice";

export const {
    fetchAccountsRequest,
    fetchAccountsSuccess,
    fetchAccountsFailure,

    fetchAccountRequest,
    fetchAccountSuccess,
    fetchAccountFailure,

    createAccountRequest,
    createAccountSuccess,
    createAccountFailure,

    deleteAccountRequest,
    deleteAccountSuccess,
    deleteAccountFailure,

    updateAccountRequest,
    updateAccountSuccess,
    updateAccountFailure,
} = accountsSlice.actions