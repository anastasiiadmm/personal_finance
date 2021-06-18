import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {singleGroupRequest} from "../../../store/actions/groupsActions";
import InviteFriend from "../InviteFriend/InviteFriend";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Avatar, Backdrop, CircularProgress, Fade, IconButton, Modal, Typography} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

import GroupIcon from "../../../assets/images/group-icon.png";
import Transaction from "../../Transaction/Transaction";

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
    }
}));

const SingleGroup = ({match}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const group = useSelector(state => state.groups.singleGroup);
    const loading = useSelector(state => state.groups.singleGroupLoading);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(singleGroupRequest(match.params.id));
    }, [dispatch]);

    return (
        <>
            <Grid container direction="column" spacing={2} className={classes.root}>
                {loading ? (
                    <Grid container justify="center" alignItems="center" className={classes.progress}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item container alignItems="center">
                        <Grid item sm={6} md={6} container alignItems='center' justify='space-evenly'>
                            <Grid item>
                                <Typography variant="h4">{group.nameGroup}</Typography>
                            </Grid>
                            <Grid item>
                                <Button color="primary" onClick={() => setOpen(true)}>
                                    Invite friend
                                </Button>
                            </Grid>
                        </Grid>

                        <Grid item container sm={6} md={6} justify='flex-end'>
                            <Grid item>
                                {group.avatarGroup ? (
                                    <Avatar alt={group.nameGroup}
                                            src={group.avatarGroup}
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

                        <Grid item container spacing={2}>
                            {group.users && group.users.map(user => (
                                <Grid item key={user.id}>
                                    <Avatar alt={user.displayName}
                                            src={user.avatar}
                                            className={classes.small}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
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
                        <InviteFriend/>
                    </div>
                </Fade>
            </Modal>
        </>
    );
};

export default SingleGroup;