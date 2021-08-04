import React from 'react';
import PropTypes from 'prop-types';
import TreeItem from '@material-ui/lab/TreeItem';
import Typography from '@material-ui/core/Typography';
import styles from "../../../assets/jss/material-dashboard-react/components/styledTreeItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Avatar} from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import {apiURL} from "../../../config";


const useStyles = makeStyles(styles);

const StyledTreeItem = props => {
  const classes = useStyles();
  const {labelText, labelIcon: LabelIcon, labelInfo, color, bgColor, ...other} = props;

  return (
    <TreeItem
      label={
        <div className={classes.labelRoot}>
          {LabelIcon ?
            <Avatar
              src={apiURL + '/' + LabelIcon}
              className={classes.avatar}
            />
            :
            <CategoryIcon className={classes.avatar}
            />
          }
          <Typography variant="body2" className={classes.labelText}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </div>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      classes={{
        root: classes.root,
        content: classes.content,
        expanded: classes.expanded,
        selected: classes.selected,
        group: classes.group,
        label: classes.label,
      }}
      {...other}
    />
  );
};

StyledTreeItem.propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  labelIcon: PropTypes.elementType,
  labelInfo: PropTypes.string,
  labelText: PropTypes.string.isRequired,

};

export default StyledTreeItem;
