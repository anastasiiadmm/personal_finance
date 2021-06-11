import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {groupsRequest} from "../../store/actions/groupsActions";
import {Avatar, Grid, makeStyles, MenuItem} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

const Groups = () => {
    const classes = useStyles();
    const params = useParams();
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);


    useEffect(() => {
        dispatch(groupsRequest());
    }, [dispatch]);

    return (
        <>
            {groups && (groups.map(group => (
                <MenuItem
                    key={group.id}
                    component={Link}
                    to={`/group/${group.id}`}
                    selected={group.id === params.id}
                >
                    <Grid container spacing={2}>
                        <Grid item>
                            <Avatar alt={group.nameGroup} src={'http://localhost:8000/uploads/' + group.avatarGroup} className={classes.small} />
                        </Grid>
                        <Grid item>
                            {group.nameGroup}
                        </Grid>
                    </Grid>
                </MenuItem>
            )))}
        </>
    );
}

export default Groups;