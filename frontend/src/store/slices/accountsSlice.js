import {createSlice} from "@reduxjs/toolkit";

export const initialState = {
    accounts: [],
    accountsLoading: false,
    createAccountLoading: false,
    createAccountError: null
};

const name = 'accounts';

const accountsSlice = createSlice({
    name,
    initialState,
    reducers: {
        accountsRequest: state => {
            state.accountsLoading = true;
        },
        accountsSuccess: (state, {payload: accounts}) => {
            state.accountsLoading = false;
            state.accounts = accounts;
        },
        accountsFailure: state => {
            state.accountsLoading = false;
        },
        createAccountsRequest: state => {
            state.createAccountsLoading = true;
        },
        createAccountsSuccess: state => {
            state.createAccountsLoading = false;
        },
        createAccountsFailure: (state, {payload: error}) => {
            state.createAccountsLoading = false;
            state.createAccountsError = error;
        },
        deleteAccountsRequest: state => {
            state.accountsLoading = true;
        },
        deleteAccountsSuccess: (state, {payload: id}) => {
            state.accountsLoading = false;
            state.accounts = state.accounts.filter(c => c.id !== id);
        },
        deleteAccountsFailure: state => {
            state.accountsLoading = false;
        }


    }
});

export default accountsSlice;
