import React from 'react';
import {Typography, Grid} from "@material-ui/core";
import AccountForm from "../../components/AccountForm/AccountForm";

const NewAccount = () => {

    return (
        <Grid container direction="column" spacing={2}>
            <Grid item xs>
                <Typography variant="h4">New Account</Typography>
            </Grid>
            <Grid item xs>
                <AccountForm/>
            </Grid>
        </Grid>
    );
};

export default NewAccount;