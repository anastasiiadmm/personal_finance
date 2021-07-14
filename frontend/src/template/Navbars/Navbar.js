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

import styles from "../../assets/jss/material-dashboard-react/components/headerStyle.js";
import {useLocation} from "react-router-dom";

const useStyles = makeStyles(styles);

const Header = ({color, handleDrawerToggle, routes, user}) => {
  const classes = useStyles();
  let location = useLocation();
  const [routeName, SetRouteName] = useState("Home");

  const activeRoute = routeName => location.pathname === routeName;

  useEffect(() => {
    routes.forEach((route) => {
      if (activeRoute(route.path)) {
        SetRouteName(route.name);
      }
    });
    if (activeRoute('/')) {
      SetRouteName('Home');
    }
  })

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
