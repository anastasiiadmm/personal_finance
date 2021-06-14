import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {Avatar, IconButton, makeStyles, Menu, MenuItem} from "@material-ui/core";
import {logoutRequest} from "../../../../store/actions/usersActions";
import {apiURL} from "../../../../config";

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(4),
    height: theme.spacing(4)
  }
}));

const UserMenu = ({user}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleClick}
        color="inherit"
      >
        {user.avatar ?
          <Avatar
            src={apiURL + '/' + user.avatar}
            className={classes.avatar}
          />
          :
          <Avatar className={classes.avatar}/>
        }
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem disabled>{user.displayName}</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My Account</MenuItem>
        <MenuItem onClick={() => dispatch(logoutRequest())}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;