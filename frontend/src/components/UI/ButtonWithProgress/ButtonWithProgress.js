import React from 'react';
import {Button, CircularProgress, makeStyles} from "@material-ui/core";

import styles from "../../../assets/jss/material-dashboard-react/components/buttonStyle.js";
import classNames from "classnames";

const useStyles = makeStyles(styles);

// const useStyles = makeStyles({
//   wrapper: {
//     position: 'relative'
//   },
//   buttonProgress: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     marginTop: '-10px',
//     marginLeft: '-10px',
//   }
// });

const ButtonWithProgress = ({children, loading, ...props}) => {
  const classes = useStyles();
  const {
    color,
    round,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
  } = props;

  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });

  return (
    <Button
      classes={muiClasses} className={btnClasses}
      {...props}
    >
      {children}
      {loading && <CircularProgress size={20} className={classes.buttonProgress} color="inherit"/>}
    </Button>
  );
};

export default ButtonWithProgress;