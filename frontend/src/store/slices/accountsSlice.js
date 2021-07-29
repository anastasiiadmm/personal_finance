import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    accounts: [],
    accountsLoading: false,
    accountsError: false,

    account: {},
    accountLoading: false,
    accountError: false,

    createAccountLoading: false,
    createAccountError: null,

    deleteAccountLoading: false,
    deleteAccountError: null,

    updateAccountLoading: false,
    updateAccountError: null
};

const name = 'accounts';

const accountsSlice = createSlice({
    name,
    initialState,
    reducers: {
        fetchAccountsRequest: state => {
            state.accountsLoading = true;
        },
        fetchAccountsSuccess: (state, {payload: accounts}) => {
            state.accountsLoading = false;
            state.accounts = accounts;
        },
        fetchAccountsFailure: (state, {payload: error}) => {
            state.accountsLoading = false;
            state.accountsError = error;
        },
        fetchAccountRequest: (state) => {
            state.accountLoading = true;
        },
        fetchAccountSuccess: (state, {payload: account}) => {
            state.accountLoading = false;
            state.account = account;
        },
        fetchAccountFailure: (state, {payload}) => {
            state.accountLoading = false;
            state.accountError = payload;
        },
        createAccountRequest: state => {
            state.createAccountLoading = true;
        },
        createAccountSuccess: (state) => {
            state.createAccountLoading = false;
        },
        createAccountFailure: (state, {payload: error}) => {
            state.createAccountLoading = false;
            state.createAccountError = error;
        },
        deleteAccountRequest: state => {
            state.deleteAccountLoading = true;
        },
        deleteAccountSuccess: (state, {payload: id}) => {
            state.deleteAccountLoading = false;
            state.accounts = state.accounts.filter(c => c.id !== id);
        },
        deleteAccountFailure: (state, {payload: error}) => {
            state.deleteAccountLoading = false;
            state.deleteAccountError = error;
        },
        updateAccountRequest: state => {
            state.updateAccountLoading = true;
        },
        updateAccountSuccess: (state, {payload: account}) => {
            state.updateAccountLoading = false;
            state.account = account;
        },
        updateAccountFailure: (state, {payload: error}) => {
            state.updateAccountLoading = false;
            state.updateAccountError = error
        }
    }
});

export default accountsSlice;
