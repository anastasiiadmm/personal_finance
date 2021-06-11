import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {groupsRequest} from "../../../store/actions/groupsActions";

import {
    Accordion, AccordionDetails,
    AccordionSummary, Avatar,
    Drawer,
    Grid,
    makeStyles,
    MenuItem,
    MenuList,
    Toolbar,
    Typography
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    accordionSummary: {
        padding: 0,

    },
    accordionDetails: {
        flexDirection: 'column',
        paddingLeft: 4
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

const AppDrawer = () => {
    const params = useParams();
    const classes = useStyles();
    const dispatch = useDispatch();
    const groups = useSelector(state => state.groups.groups);

    useEffect(() => {
        dispatch(groupsRequest());
    }, [dispatch]);

    return (
        <Drawer
            className={classes.drawer}
            classes={{
                paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
        >
            <Toolbar/>
            <MenuList>
                <MenuItem
                    component={Link}
                    to="/"
                >
                    Home
                </MenuItem>

                <Accordion>
                    <AccordionSummary>
                        <Grid item container justify='space-evenly' alignItems='center'>
                            <Grid item xs>
                                <Typography className={classes.heading}>My Groups</Typography>
                            </Grid>
                            <Grid item xs>
                                <Button color="primary" component={Link} to="/groups/new">add</Button>
                            </Grid>
                        </Grid>
                    </AccordionSummary>
                    <AccordionDetails className={classes.accordionDetails}>
                        {groups.map(group => (
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
                        ))}
                    </AccordionDetails>
                </Accordion>
            </MenuList>
        </Drawer>
    );
};

export default AppDrawer;