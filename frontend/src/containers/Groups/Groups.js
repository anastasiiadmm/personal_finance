import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {createGroupRequest, groupsRequest} from "../../store/actions/groupsActions";
import {Avatar, Backdrop, Fade, Grid, makeStyles, Modal} from "@material-ui/core";

import GroupIcon from "../../assets/images/group-icon.png";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

import GridItem from "../../template/Grid/GridItem";
import Card from "../../template/Card/Card";
import CardHeader from "../../template/Card/CardHeader";
import CardIcon from "../../template/Card/CardIcon";
import CardFooter from "../../template/Card/CardFooter";
import Button from "@material-ui/core/Button";
import GroupForm from "./NewGroup/GroupForm/GroupForm";

const useStyles = makeStyles(styles);

const Groups = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);
    const [open, setOpen] = useState(false);
    const error = useSelector(state => state.groups.createGroupError);
    const loading = useSelector(state => state.groups.createGroupLoading);

    const onGroupFormSubmit = async groupData => {
        dispatch(createGroupRequest(groupData));
    }

    useEffect(() => {
        dispatch(groupsRequest());
    }, [dispatch]);

    return (
        <>
            <Grid container spacing={2} direction="column">
                <Grid item>
                    <Button color="primary" onClick={() => setOpen(true)}>
                        Add new group
                    </Button>
                </Grid>
                <Grid container spacing={2}>
                    {groups && (groups.map(group => (
                        <GridItem xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader color="warning" stats icon>
                                    <CardIcon color="warning">
                                        {group.avatarGroup ? (
                                            <Avatar alt={group.nameGroup} src={group.avatarGroup} className={classes.small}/>
                                        ) : (
                                            <Avatar alt={group.nameGroup}
                                                    src={GroupIcon}
                                                    className={classes.small}
                                            />
                                        )}
                                    </CardIcon>
                                    <h3 className={classes.cardTitle}>{group.nameGroup}</h3>
                                </CardHeader>
                                <CardFooter stats>
                                    <Link to={`/groups/${group.id}`}>More info</Link>
                                </CardFooter>
                            </Card>
                        </GridItem>
                    )))}
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
                        <GroupForm
                            onSubmit={onGroupFormSubmit}
                            loading={loading}
                            error={error}
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

export default Groups;