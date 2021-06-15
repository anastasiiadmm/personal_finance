import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {groupsRequest} from "../../store/actions/groupsActions";
import {Avatar, Grid, makeStyles, MenuItem} from "@material-ui/core";
import {apiURL} from "../../config";
import GroupIcon from "../../assets/images/group-icon.png";
import AccordionMenu from "../../components/UI/AccordionMenu/AccordionMenu";

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
              {group.avatarGroup ? (
                <Avatar alt={group.nameGroup} src={group.avatarGroup} className={classes.small}/>
              ) : (
                <Avatar alt={group.nameGroup}
                        src={GroupIcon}
                        className={classes.small}
                />
              )}
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