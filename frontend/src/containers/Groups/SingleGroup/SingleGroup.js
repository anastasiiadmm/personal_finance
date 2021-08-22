import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteGroupRequest, singleGroupRequest} from "../../../store/actions/groupsActions";
import InviteFriendForm from "./SingleGroupForms/InviteFriendForm";
import Accounts from "../../Accounts/Accounts";
import EditGroupForm from "./SingleGroupForms/EditGroupForm";
import EditUsersGroupForm from "./SingleGroupForms/EditUsersGroupForm";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {Avatar, Backdrop, CircularProgress, Fade, Modal, Tooltip, Typography} from "@material-ui/core";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import Button from "../../../components/UI/CustomButtons/Button";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative'
  },
  addBtn: {
    position: 'absolute',
    bottom: '0',
    right: '0'
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
  },
  large: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  avatarButton: {
    padding: 7
  },
  small: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    position: 'relative'
  },
  button: {
    width: theme.spacing(1),
    height: theme.spacing(1),
    position: 'absolute',
    top: 80,
    left: 30
  },
  linkButton: {
    fontSize: 16,
    color: "#9c27b0",
  }
}));

const SingleGroup = ({match}) => {
  const params = match.params.id;
  const classes = useStyles();
  const dispatch = useDispatch();
  const group = useSelector(state => state.groups.singleGroup);
  const userLogin = useSelector(state => state.users.user);
  const loading = useSelector(state => state.groups.singleGroupLoading);
  const [user, setUser] = useState({});
  const permissions = useState(true);
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    dispatch(singleGroupRequest(match.params.id));
  }, [dispatch, match.params.id]);

  const onDeleteGroupHandler = () => {
    dispatch(deleteGroupRequest(params));
  }

  const userEditHandler = userInfo => {
    if (userInfo.GroupUsers.role !== 'owner') {
      setUser(userInfo);
      setModal(true);
    }
  }

  let disableButtonHandler = false;

  if (group.title === 'Personal') {
    disableButtonHandler = true;
  }

  let adminPanel = null;

  if (permissions) {
    adminPanel = (
      <Grid container item sm={3} md={3}>
        <Grid item container direction='row' spacing={1} alignItems='center'
              justify='flex-end'>
          <Grid item>
            <Button id="add-button" color="primary" justIcon
                    onClick={() => setOpen(true)}>
              <GroupAddIcon/>
            </Button>
          </Grid>
          <Grid item>
            <Button id="edit-button" color="primary" justIcon
                    onClick={() => setModalOpen(true)}
            >
              <EditIcon/>
            </Button>
          </Grid>
          {group.title !== 'Personal' && (
            <Grid item>
              <Button id="delete-button" color="primary" justIcon
                      onClick={onDeleteGroupHandler}>
                <DeleteForeverIcon/>
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    )
  }

  const renderAdminPanel = () => {
    return group?.users && group.users.find(user => {
      return user.id === userLogin.id ? (user.GroupUsers.role === 'owner' || user.GroupUsers.role === 'admin') ? true : false : false
    });
  }

  return (
    <>
      <Grid container direction='column' spacing={2}>
        {loading ? (
          <Grid container justify="center" alignItems="center" className={classes.progress}>
            <Grid item>
              <CircularProgress/>
            </Grid>
          </Grid>
        ) : (
          <Grid item container direction='column' spacing={2} style={{marginBottom: 30}}>
            {/*<Grid item container justify='flex-end'>*/}
            {/*  <Grid item>*/}
            {/*    {group.avatar ? (*/}
            {/*      <Avatar alt={group.title}*/}
            {/*              src={apiURL + '/' + group.avatar}*/}
            {/*              className={classes.large}*/}
            {/*      />*/}
            {/*    ) : (*/}
            {/*      <Avatar alt={group.title}*/}
            {/*              src={GroupIcon}*/}
            {/*              className={classes.large}*/}
            {/*      />*/}
            {/*    )}*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            <Grid container direction='row' alignItems='center' spacing={2} justify='space-between'>
              <Grid container item sm={3} md={3}>
                <Typography variant="h4">{group.title}</Typography>
              </Grid>
              {renderAdminPanel() ? adminPanel : null}
            </Grid>
            <Grid container item sm={6} md={6}>
              {group.users && group.users.map(user => (
                <Tooltip title={user.GroupUsers.role} key={user.id}>
                  <IconButton
                    className={classes.avatarButton}
                    onClick={() => userEditHandler(user)}
                  >
                    <Avatar alt={user.displayName}
                            id="info-button"
                            src={user.avatar}
                            className={classes.small}
                    />
                  </IconButton>
                </Tooltip>
              ))}
            </Grid>
          </Grid>
        )}
        <Grid item container spacing={2} justify="center" alignItems="center">
          <Accounts/>
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
            <InviteFriendForm
              onClose={() => setOpen(false)}
            />
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={classes.paper}>
            <EditGroupForm
              onClose={() => setModalOpen(false)}
              disableButton={disableButtonHandler}
            />
          </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={modal}
        onClose={() => setModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modal}>
          <div className={classes.paper}>
            <EditUsersGroupForm
              modalUser={user}
              onClose={() => setModal(false)}
            />
          </div>
        </Fade>
      </Modal>
    </>
  );
}

export default SingleGroup;