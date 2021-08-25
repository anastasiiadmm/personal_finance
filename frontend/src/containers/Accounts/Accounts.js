import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {
  createAccountRequest,
  fetchAccountsRequest,
} from "../../store/actions/accountsActions";
import {Backdrop, CircularProgress, Fade, Grid, makeStyles, Modal, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useParams} from "react-router-dom";
import AccountItem from "./AccountItem";
import AccountForm from "./AccountForm/AccountForm";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

const useStyles = makeStyles(styles);

const Accounts = (id) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const accounts = useSelector(state => state.accounts.accounts);
  const error = useSelector(state => state.accounts.createAccountError);
  const loading = useSelector(state => state.accounts.createAccountLoading);
  const userLogin = useSelector(state => state.users.user);
  const groupRole = useSelector(state => state.groups.singleGroup);
  const [open, setOpen] = useState(false);
  const permissions = useState(true);

  const onAccountFormSubmit = (e, data) => {
    e.preventDefault();
    dispatch(createAccountRequest({id: params.id, data}));
  };

  useEffect(() => {
    dispatch(fetchAccountsRequest(params.id));
  }, [dispatch, params.id]);

  let ownerPanel = null;

  if (permissions) {
    ownerPanel = (
      <Button className={classes.linkButton} onClick={() => setOpen(true)}>
        Add new account
      </Button>
    )
  }

  const renderOwnerPanel = () => {
    return groupRole?.users && groupRole.users.find(user => {
      return user.id === userLogin.id ? (user.GroupUsers.role === 'owner') ? true : false : false
    });
  }


  return (
    <>
      <Grid container direction={'column'} spacing={2}>
        <Grid item container justify={'space-between'} alignItems={'center'}>
          <Grid item>
            <Typography variant="h4">Accounts</Typography>
          </Grid>
          <Grid item>
            {renderOwnerPanel() ? ownerPanel : null}
          </Grid>
        </Grid>
        <Grid item container spacing={2}>
          {loading ? (
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <CircularProgress/>
              </Grid>
            </Grid>
          ) : accounts.map(account => {
            return (
              <AccountItem
                key={account.id}
                id={account.id}
                accountName={account.accountName}
                balance={account.balance}
                currency={account.currency}
                accountIcon={account.accountIcon}
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
              loading={loading}
              error={error}
              id={id}
              onClose={() => setOpen(false)}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Accounts;