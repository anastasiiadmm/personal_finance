import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import PersonalLayout from "../../../components/UI/Layout/PersonalLayout";
import {singleGroupRequest} from "../../../store/actions/groupsActions";
import InviteFriend from "../InviteFriend/InviteFriend";

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {Avatar, Backdrop, CircularProgress, Fade, Modal, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
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
    }, [dispatch, match.params.id]);

    return (
        <PersonalLayout>
            <Grid container direction="column" spacing={2}>
                {loading ? (
                    <Grid container justify="center" alignItems="center" className={classes.progress}>
                        <Grid item>
                            <CircularProgress/>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid item container alignItems="center">
                        <Grid item sm={6} md={4} container alignItems='center' justify='space-evenly'>
                            <Grid item>
                                <Typography variant="h4">{group.nameGroup}</Typography>
                            </Grid>
                            <Grid item>
                                <Button color="primary" onClick={() => setOpen(true)}>
                                    Invite friend
                                </Button>
                            </Grid>
                        </Grid>
                        {group.avatarGroup ? (
                            <Grid item container sm={6} md={8} justify='flex-end'>
                                <Grid item>
                                    <Avatar alt={group.nameGroup}
                                            src={'http://localhost:8000/uploads/' + group.avatarGroup}
                                            className={classes.large}
                                    />
                                </Grid>
                            </Grid>
                        ) : null}

                        <Grid item container spacing={2}>
                            {group.users && group.users.map(user => (
                                <Grid item key={user.id}>
                                    <Avatar alt={user.displayName}
                                            src={'http://localhost:8000/uploads/' + user.avatar}
                                            className={classes.small}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                )}
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
        </PersonalLayout>
    );
};

export default SingleGroup;