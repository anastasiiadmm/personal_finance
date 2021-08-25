import React, {useState} from "react";
import classNames from "classnames";
import {makeStyles} from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Person from "@material-ui/icons/Person";
import Button from "../CustomButtons/Button";
import styles from "../../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import {logoutRequest} from "../../../store/actions/usersActions";
import {useDispatch} from "react-redux";
import {Avatar} from "@material-ui/core";
import {historyPush} from "../../../store/actions/historyActions";
import {apiURL} from "../../../config";

const useStyles = makeStyles(styles);

const NavbarLinks = ({user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openProfile, setOpenProfile] = useState(null);

  const handleClickProfile = (event) => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  return (
    <div>
      <div className={classes.manager}>
        <Button
          color={"transparent"}
          justIcon
          aria-owns={openProfile ? "profile-menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={classes.buttonLink}
        >
          {user.avatar ?
            <Avatar
              src={apiURL + '/' + user.avatar}
              className={classes.avatar}
            />
            :
            <Person className={classes.icons}/>
          }
          <Hidden mdUp implementation="css">
            <p className={classes.linkText}>Profile</p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          className={
            classNames({[classes.popperClose]: !openProfile}) +
            " " +
            classes.popperNav
          }
        >
          {({TransitionProps, placement}) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list-grow"
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                    <MenuItem
                      onClick={() => {
                        handleCloseProfile();
                        dispatch(historyPush('/user'))
                      }}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <Divider light/>
                    <MenuItem
                      onClick={() => dispatch(logoutRequest())}
                      className={classes.dropdownItem}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Poppers>
      </div>
    </div>
  );
}

export default NavbarLinks;
