import React, {useState} from 'react';
import {
  Avatar, Backdrop,
  Fade, Grid,
  IconButton,
  makeStyles, Modal
} from "@material-ui/core";
import {apiURL} from "../../config";
import Delete from "@material-ui/icons/Delete";
import Edit from "@material-ui/icons/Edit";
import EditAccount from "./EditAccount/EditAccount";
import {useSelector} from "react-redux";
import DeleteAccount from "./DeleteAccount/DeleteAccount";
import CardFooter from "../../components/UI/Card/CardFooter";
import Card from "../../components/UI/Card/Card";
import CardIcon from "../../components/UI/Card/CardIcon";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle";
import CardBody from "../../components/UI/Card/CardBody";
import CardHeader from "../../components/UI/Card/CardHeader";

const useStyles = makeStyles(styles);

const AccountItem = ({accountName, currency, balance, id, accountIcon}) => {
  const classes = useStyles();
  const [editOpen, setEditOpen] = useState(false);
  const [openListToDelete, setOpenListToDelete] = useState(false);
  const editLoading = useSelector(state => state.accounts.updateAccountLoading);
  const editError = useSelector(state => state.accounts.updateAccountError);
  const deleteError = useSelector(state => state.accounts.deleteAccountError);
  const deleteLoading = useSelector(state => state.accounts.deleteAccountLoading);
  const userLogin = useSelector(state => state.users.user);
  const groupRole = useSelector(state => state.groups.singleGroup);
  const permissions = useState(true);

  let ownerPanel = null;

  if (permissions) {
    ownerPanel = (
      <>
        <IconButton className={classes.linkButton} onClick={() => setEditOpen(true)}>
          <span>Edit <Edit/></span>
        </IconButton>
        <IconButton className={classes.linkButton} onClick={() => setOpenListToDelete(true)}>
         <span>Delete <Delete/></span>
        </IconButton>
      </>
    )
  }
  const renderOwnerPanel = () => {
    return groupRole?.users && groupRole.users.find(user => {
      return user.id === userLogin.id ? (user.GroupUsers.role === 'owner') ? true : false : false
    });
  }
  return (
    <>
      <Grid item xs={12} sm={6} md={5} key={id} className={classes.marginCard}>
        <Card>
          <CardHeader color="warning" stats icon>
            <CardIcon circle color="warning">
                  <div>
                    <Avatar alt={accountName} src={apiURL + '/' + accountIcon} className={classes.small} />
                  </div>
            </CardIcon>
            <h3 className={classes.cardTitle}>{accountName}</h3>
          </CardHeader>
          <CardBody stats>
          <b>{balance} {currency} </b>
          </CardBody>
          <CardFooter stats>
            {renderOwnerPanel() ? ownerPanel : null}
          </CardFooter>
        </Card>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={editOpen}
        onClose={() => setEditOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editOpen}>
          <div className={classes.paper}>
            <EditAccount
              loading={editLoading}
              error={editError}
              id={id}
              onClose={() => setEditOpen(false)}
            />
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openListToDelete}
        onClose={() => setOpenListToDelete(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openListToDelete}>
          <div className={classes.paper}>
            <DeleteAccount
              error={deleteError}
              loading={deleteLoading}
              id={id}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default AccountItem;