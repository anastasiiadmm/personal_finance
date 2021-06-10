import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Typography, Grid} from "@material-ui/core";
import AccountForm from "../../components/AccountForm/AccountForm";
import {createAccountsRequest} from "../../store/actions/accountsActions";

const NewAccount = () => {

    const dispatch = useDispatch();
    const error = useSelector(state => state.accounts.createAccountsError);
    const loading = useSelector(state => state.accounts.createAccountsLoading);

    const onAccountFormSubmit = (e, data) => {
        e.preventDefault();
        dispatch(createAccountsRequest(data));
    }

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs>
                <Typography variant="h4">New Account</Typography>
            </Grid>
            <Grid item xs>
                <AccountForm
                    onSubmit={onAccountFormSubmit}
                    loading={loading}
                    error={error}
                />
            </Grid>
        </Grid>
    );
};

export default NewAccount;