import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// material-ui components
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import styles from "../../../assets/jss/material-dashboard-react/components/buttonStyle.js";

const useStyles = makeStyles(styles);

const RegularButton = ({
                         color,
                         round,
                         children,
                         disabled,
                         simple,
                         size,
                         block,
                         link,
                         justIcon,
                         className,
                         muiClasses,
                         inputStyled,
                         ...props
                       }) => {
  const classes = useStyles();
  const btnClasses = classNames({
    [classes.button]: true,
    [classes[size]]: size,
    [classes[color]]: color,
    [classes.round]: round,
    [classes.disabled]: disabled,
    [classes.simple]: simple,
    [classes.inputStyled]: inputStyled,
    [classes.block]: block,
    [classes.link]: link,
    [classes.justIcon]: justIcon,
    [className]: className,
  });
  return (
    <Button {...props} classes={muiClasses} className={btnClasses}>
      {children}
    </Button>
  );
};

RegularButton.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
    "grey",
    "white",
    "transparent",
  ]),
  size: PropTypes.oneOf(["sm", "lg"]),
  simple: PropTypes.bool,
  round: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  inputStyled: PropTypes.bool,
  link: PropTypes.bool,
  justIcon: PropTypes.bool,
  className: PropTypes.string,
  muiClasses: PropTypes.object,
  children: PropTypes.node,
};

export default RegularButton;
