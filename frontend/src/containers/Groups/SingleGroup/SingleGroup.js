import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {apiURL} from "../../../config";
import {deleteGroupRequest, singleGroupRequest} from "../../../store/actions/groupsActions";
import InviteFriendForm from "./SingleGroupForms/InviteFriendForm";
import Transaction from "../../Transaction/Transaction";
import Account from "../../Account/Account";
import EditGroupForm from "./SingleGroupForms/EditGroupForm";
import EditUsersGroupForm from "./SingleGroupForms/EditUsersGroupForm";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import {Avatar, Backdrop, CircularProgress, Fade, IconButton, Modal, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';

import GroupIcon from "../../../assets/images/group-icon.png";

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
        width: theme.spacing(10),
        height: theme.spacing(10),
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
    }
}));

const SingleGroup = ({match}) => {
    const params = match.params.id;
    const classes = useStyles();
    const dispatch = useDispatch();
    const group = useSelector(state => state.groups.singleGroup);
    const loading = useSelector(state => state.groups.singleGroupLoading);
    const [open, setOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modal, setModal] = useState(false);

    useEffect(() => {
        dispatch(singleGroupRequest(match.params.id));
    }, [dispatch, match.params.id]);

    const onDeleteGroupHandler = () => {
        dispatch(deleteGroupRequest(params));
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
                    <Grid item container direction='column' spacing={2}>
                        <Grid item container justify='flex-end'>
                            <Grid item>
                                {group.avatarGroup ? (
                                    <Avatar alt={group.nameGroup}
                                            src={apiURL + '/' + group.avatarGroup}
                                            className={classes.large}
                                    />
                                ) : (
                                    <Avatar alt={group.nameGroup}
                                            src={GroupIcon}
                                            className={classes.large}
                                    />
                                )}
                            </Grid>
                        </Grid>
                        <Grid container direction='row' alignItems='center'>
                            <Grid item md={6}>
                                <Typography variant="h4">{group.nameGroup}</Typography>
                            </Grid>
                            {group.nameGroup !== 'personal' && (
                                <>
                                    {group.users && group.users.map(user => (
                                        <Grid item md={6} key={user.id}>
                                            {user.GroupUsers.role === 'owner' && (
                                                <Grid item container direction='row' spacing={1} alignItems='center'
                                                      justify='flex-end'>
                                                    <Grid item>
                                                        <IconButton color="primary" onClick={() => setOpen(true)}>
                                                            <GroupAddIcon/>
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton color="primary" onClick={onDeleteGroupHandler}>
                                                            <DeleteForeverIcon/>
                                                        </IconButton>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton color="primary" onClick={() => setModalOpen(true)}>
                                                            <EditIcon/>
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            )}
                                        </Grid>
                                    ))}
                                </>
                            )}
                        </Grid>
                        {group.nameGroup !== 'personal' && (
                            <Grid item container spacing={2} alignItems="center">
                                {group.users && group.users.map(user => (
                                    <Grid item key={user.id}>
                                        <Avatar alt={user.displayName}
                                                src={user.avatar}
                                                className={classes.small}
                                        />
                                    </Grid>
                                ))}
                                {group.users && group.users.map(user => (
                                    <Grid item key={user.id}>
                                        {user.GroupUsers.role === 'owner' && (
                                            <IconButton color="primary" onClick={() => setModal(true)}>
                                                <EditIcon/>
                                            </IconButton>

                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Grid>
                )}
                <Grid item container spacing={2} justify="center" alignItems="center">
                    <Account/>
                </Grid>
                <Grid item container spacing={2} justify="center" alignItems="center">
                    <Transaction/>
                </Grid>

                <IconButton className={classes.addBtn} color="primary">
                    <AddIcon/>
                </IconButton>
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
                            onClose={() => setModal(false)}
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

export default SingleGroup;