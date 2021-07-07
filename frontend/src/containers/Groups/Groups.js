import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {createGroupRequest, groupsRequest} from "../../store/actions/groupsActions";
import {Avatar, Backdrop, Fade, Grid, makeStyles, Modal} from "@material-ui/core";

import GroupIcon from "../../assets/images/group-icon.jpeg";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

import GridItem from "../../template/Grid/GridItem";
import Card from "../../template/Card/Card";
import CardHeader from "../../template/Card/CardHeader";
import CardIcon from "../../template/Card/CardIcon";
import CardFooter from "../../template/Card/CardFooter";
import Button from "@material-ui/core/Button";
import GroupForm from "./NewGroup/GroupForm/GroupForm";
import {apiURL} from "../../config";

const useStyles = makeStyles(styles);

const Groups = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);
    const error = useSelector(state => state.groups.createGroupError);
    const loading = useSelector(state => state.groups.createGroupLoading);
    const [open, setOpen] = useState(false);

    const onGroupFormSubmit = async groupData => {
        dispatch(createGroupRequest(groupData));
    }

    useEffect(() => {
        dispatch(groupsRequest());
    }, [dispatch]);

    return (
        <>
            <Grid item container spacing={6} direction="column">
                <Grid item>
                    <Button className={classes.linkButton} startIcon={<AddCircleOutlineIcon />} onClick={() => setOpen(true)}>
                        Add new group
                    </Button>
                </Grid>
                <Grid item container spacing={2}>
                    {groups && (groups.map(group => (
                        <GridItem item xs={8} sm={5} md={4} key={group.id}>
                            <Card>
                                <CardHeader color="warning" stats icon>
                                    <CardIcon color="warning">
                                        {group.avatar ? (
                                            <Avatar alt={group.title} src={apiURL + '/' + group.avatar} className={classes.small}/>
                                        ) : (
                                            <Avatar alt={group.title}
                                                    src={GroupIcon}
                                                    className={classes.small}
                                            />
                                        )}
                                    </CardIcon>
                                    <h3 className={classes.cardTitle}>{group.title}</h3>
                                </CardHeader>
                                <CardFooter stats>
                                    <Link to={`/groups/${group.id}`} className={classes.linkButton}>More info</Link>
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
                            onClose={() => setOpen(false)}
                        />
                    </div>
                </Fade>
            </Modal>
        </>
    );
}

export default Groups;