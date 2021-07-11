import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {Link, NavLink, useLocation} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Icon from "@material-ui/core/Icon";
import styles from "../../assets/jss/material-dashboard-react/components/sidebarStyle";
import {ListItemText} from "@material-ui/core";
import {logoutRequest} from "../../store/actions/usersActions";
import {useDispatch} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "../CustomButtons/Button";

const useStyles = makeStyles(styles);

const Sidebar = ({color, logo, image, logoText, routes, ...props}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let location = useLocation();

  const activeRoute = routeName => location.pathname === routeName;

  let links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.layout === '/') {
          let activePro = " ";
          let listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path),
          });

          const whiteFontClasses = classNames({
            [" " + classes.whiteFont]: activeRoute(prop.path),
          });
          return (
            <NavLink
              to={prop.path}
              className={activePro + classes.item}
              activeClassName="active"
              key={key}
            >
              <ListItem button className={classes.itemLink + listItemClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  >
                    {prop.icon}
                  </Icon>
                ) : (
                  <prop.icon
                    className={classNames(classes.itemIcon, whiteFontClasses)}
                  />

                )}
                <ListItemText
                  primary={prop.name}
                  className={classNames(classes.itemText, whiteFontClasses)}
                  disableTypography={true}
                />
              </ListItem>
            </NavLink>
          );
        }
      })}
    </List>
  );
  let brand = (
    <Grid container className={classes.logo}>
      <Grid item xs={9} md={12}>
        <Link to="/" className={classNames(classes.logoLink)}>
          <div className={classes.logoImage}>
            <img src={logo} alt="logo" className={classes.img}/>
          </div>
          {logoText}
        </Link>
      </Grid>
      <Hidden mdUp implementation="js">
        <Grid item xs={3} className={classNames(classes.logout)} onClick={() => dispatch(logoutRequest())}>
          <ExitToAppIcon/>
        </Grid>
      </Hidden>
    </Grid>
  )

  return (
    <div>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{backgroundImage: "url(" + image + ")"}}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="js">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{
            paper: classNames(classes.drawerPaper),
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{backgroundImage: "url(" + image + ")"}}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  bgColor: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
  logo: PropTypes.string,
  image: PropTypes.string,
  logoText: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object),
  open: PropTypes.bool,
};

export default Sidebar;

