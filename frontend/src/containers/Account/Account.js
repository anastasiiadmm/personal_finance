import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {accountsRequest, deleteAccountsRequest} from "../../store/actions/accountsActions";
import {CircularProgress, Grid, makeStyles, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {Link, useParams} from "react-router-dom";
import AccountItem from "./AccountItem";

const useStyles = makeStyles(theme => ({
    progress: {
        height: 200
    }
}));

const Account = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const loading = useSelector(state => state.accounts.accountsLoading);
    const accounts = useSelector(state => state.accounts.accounts);

    useEffect(() => {
        dispatch(accountsRequest(accounts.groupId));
    }, [dispatch]);

    const onDeleteAccount = id => {
        dispatch(deleteAccountsRequest(id));
    }

    return (
        <Grid container direction={'column'} spacing={2}>
            <Grid item container justify={'space-between'} alignItems={'center'}>
                <Grid item>
                    <Typography variant="h4">Accounts</Typography>
                </Grid>
                <Grid item>
                    <Button color="primary" component={Link} to="/accounts/new">Add new account</Button>
                </Grid>
            </Grid>
            <Grid item container direction="column" spacing={1}>
                {loading ? (
                    <Grid container justify="center" alignItems="center" className={classes.progress}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                ) : accounts.map(account => {
                    console.log(accounts);
                    return (
                            <AccountItem
                                key={account.id}
                                id={account.id}
                                accountName={account.accountName}
                                balance={account.balance}
                                preferences={account.preferences}
                                accountIcon={account.accountIcon}
                                deleteAccount={() => onDeleteAccount(account.id)}
                            />
                        )
                    })}
            </Grid>
        </Grid>
    );
};

export default Account;