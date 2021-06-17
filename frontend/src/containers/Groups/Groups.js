import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {groupsRequest} from "../../store/actions/groupsActions";
import {Avatar, makeStyles} from "@material-ui/core";

import GroupIcon from "../../assets/images/group-icon.png";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

import GridItem from "../../template/Grid/GridItem";
import Card from "../../template/Card/Card";
import CardHeader from "../../template/Card/CardHeader";
import CardIcon from "../../template/Card/CardIcon";
import CardFooter from "../../template/Card/CardFooter";

const useStyles = makeStyles(styles);

const Groups = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);

    useEffect(() => {
        dispatch(groupsRequest());
    }, [dispatch]);

    return (
        <>
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
        </>
    );
}

export default Groups;