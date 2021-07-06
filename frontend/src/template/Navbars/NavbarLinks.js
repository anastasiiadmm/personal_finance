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
import ReceiptIcon from '@material-ui/icons/Receipt';
import Button from "../CustomButtons/Button";
import styles from "../../assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import {logoutRequest} from "../../store/actions/usersActions";
import {useDispatch} from "react-redux";
import {Avatar} from "@material-ui/core";
import NewTransaction from "../../containers/NewTransaction/NewTransaction";
import {fetchAccountsRequest} from "../../store/actions/accountsActions";
import {fetchCategoriesRequest} from "../../store/actions/categoriesActions";
import {groupsRequest} from "../../store/actions/groupsActions";

const useStyles = makeStyles(styles);

const NavbarLinks = ({user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(null);
  const [openProfile, setOpenProfile] = useState(null);
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

  const handleCloseMenuAndOpenDialog = async (dialog) => {
    await dispatch(fetchAccountsRequest());
    await dispatch(fetchCategoriesRequest());
    await dispatch(groupsRequest());
    setOpenMenu(null);
    setOpenDialog({...openDialog, open: true, type: dialog});
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

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
          aria-owns={openMenu ? "menu-list-grow" : null}
          aria-haspopup="true"
          onClick={handleClickMenu}
          className={classes.buttonLink}
        >
          <ReceiptIcon className={classes.icons}/>
          <span className={classes.notifications}>+</span>
          <Hidden mdUp implementation="css">
            <p onClick={handleCloseMenu} className={classes.linkText}>
              Add Transaction
            </p>
          </Hidden>
        </Button>
        <Poppers
          open={Boolean(openMenu)}
          anchorEl={openMenu}
          transition
          disablePortal
          className={
            classNames({[classes.popperClose]: !openMenu}) +
            " " +
            classes.popperNav
          }
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
              src={user.avatar}
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
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={classes.dropdownItem}
                    >
                      Settings
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
      {openDialog.open ?
        <NewTransaction open={openDialog.open} type={openDialog.type} handleClose={handleCloseDialog}/> : null
      }
    </div>
  );
}

export default NavbarLinks;
