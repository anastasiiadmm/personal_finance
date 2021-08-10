import React, {useEffect, useState} from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/icons/Menu";
import NavbarLinks from "./NavbarLinks";
import Button from "../CustomButtons/Button";

import styles from "../../../assets/jss/material-dashboard-react/components/headerStyle.js";
import {useLocation} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Primary from "../Typography/Primary";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Poppers from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import NewTransaction from "../../../containers/NewTransaction/NewTransaction";

const useStyles = makeStyles(styles);

const Header = ({color, handleDrawerToggle, routes, user}) => {
  const classes = useStyles();
  let location = useLocation();
  const [routeName, SetRouteName] = useState("Home");
  const [openMenu, setOpenMenu] = useState(null);
  const [openDialog, setOpenDialog] = useState({open: false, type: null});

  const handleCloseDialog = () => {
    setOpenDialog({...openDialog, open: false});
  };

  const handleClickMenu = (event) => {
    if (openMenu && openMenu.contains(event.target)) {
      setOpenMenu(null);
    } else {
      setOpenMenu(event.currentTarget);
    }
  };

  const handleCloseMenuAndOpenDialog = (dialog) => {
    setOpenMenu(null);
    setOpenDialog({...openDialog, open: true, type: dialog});
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };


  useEffect(() => {
    const activeRoute = routeName => location.pathname === routeName;
    routes.forEach((route) => {
      if (activeRoute(route.path)) {
        SetRouteName(route.name);
      }
    });
    if (activeRoute('/')) {
      SetRouteName('Home');
    }
  }, [routes, routeName, location])

  const appBarClasses = classNames({
    [" " + classes[color]]: color,
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button color="transparent" className={classes.title}>
            {routeName}
          </Button>
        </div>
        <div className={classes.manager}>
          <Hidden xsDown> <Typography variant="overline">Hello, <b>{user.displayName}</b></Typography></Hidden>
          <Button
            color={"transparent"}
            justIcon
            aria-owns={openMenu ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={handleClickMenu}
          >
            <Primary><ReceiptIcon className={classes.icons}/></Primary>
            <span className={classes.notifications}>+</span>
          </Button>
          <Poppers
            open={Boolean(openMenu)}
            anchorEl={openMenu}
            transition
            disablePortal
            className={
              classNames({[classes.popperClose]: !openMenu})}
          >
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseMenu}>
                    <MenuList role="menu">
                      <MenuItem
                        onClick={() => handleCloseMenuAndOpenDialog('expenditure')}
                        className={classes.dropdownItem}
                      >
                        Add expense
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseMenuAndOpenDialog('income')}
                        className={classes.dropdownItem}
                      >
                        Add income
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseMenuAndOpenDialog("transfer")}
                        className={classes.dropdownItem}
                      >
                        Transfer
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Poppers>
        </div>
        <Hidden smDown implementation="js">
          {<NavbarLinks
            user={user}
          />}
        </Hidden>
        <Hidden mdUp implementation="js">
          <IconButton
            color="inherit"
            id="icon-button"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu/>
          </IconButton>
        </Hidden>
      </Toolbar>
      {openDialog.open ?
        <NewTransaction open={openDialog.open} type={openDialog.type} handleClose={handleCloseDialog}/> : null
      }
    </AppBar>
  );
}

Header.propTypes = {
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  handleDrawerToggle: PropTypes.func,
  routes: PropTypes.arrayOf(PropTypes.object),
  user: PropTypes.object,
};

export default Header;
