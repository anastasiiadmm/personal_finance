import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {groupsRequest} from "../../../store/actions/groupsActions";

import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Drawer,
    Grid,
    makeStyles,
    MenuItem,
    MenuList,
    Toolbar,
    Typography
} from "@material-ui/core";

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
    menuItem: {
        padding: 15
    },
    accordionSummary: {
        padding: 0,

    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));

const AppDrawer = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

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
                    className={classes.menuItem}
                >
                    Home
                </MenuItem>

            </MenuList>
        </Drawer>
    );
};

export default AppDrawer;