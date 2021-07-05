import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchAccountsRequest,
    createAccountRequest,
    deleteAccountRequest,
    fetchAccountRequest
} from "../../store/actions/accountsActions";
import {Backdrop, CircularProgress, Fade, Grid, makeStyles, Modal, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useParams} from "react-router-dom";
import AccountItem from "./AccountItem";
import AccountForm from "../../components/AccountForm/AccountForm";
import FormElement from "../../components/UI/Form/FormElement";
import ButtonWithProgress from "../../components/UI/ButtonWithProgress/ButtonWithProgress";


const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    progress: {
        height: 200
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width: 500,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #000',
        boxShadow: theme.shadows[4],
        padding: theme.spacing(2, 4, 3),
    }
}));

const Accounts = (id) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const params = useParams();
    const accounts = useSelector(state => state.accounts.accounts);
    const loading = useSelector(state => state.accounts.accountsLoading);
    const error = useSelector(state => state.accounts.createAccountError);
    const newAccountLoading = useSelector(state => state.accounts.createAccountLoading);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        dispatch(fetchAccountsRequest(params.id));
    }, [dispatch, params.id]);


    // const onDeleteAccount = () => {
    //     dispatch(deleteAccountRequest(id));
    //     console.log(id);
    // }


    const onAccountFormSubmit = (e, data) => {
        dispatch(createAccountRequest({data, id: params.id}));
        console.log(data);
    }


    return (
        <>
            <Grid container direction={'column'} spacing={2}>
                <Grid item container justify={'space-between'} alignItems={'center'}>
                    <Grid item>
                        <Typography variant="h4">Accounts</Typography>
                    </Grid>
                    <Grid item>
                        <Button color="primary" onClick={() => setOpen(true)}>
                            Add new account
                        </Button>
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
                                // deleteAccount={onDeleteAccount}
                            />
                        )

                    })}
                </Grid>
            </Grid>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <AccountForm
                            onSubmit={onAccountFormSubmit}
                            loading={newAccountLoading}
                            error={error}
                        />
                    </div>
                </Fade>
            </Modal>


        </>
    );
};

export default Accounts;