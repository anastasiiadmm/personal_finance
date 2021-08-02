import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
// core components
import styles from "../../../assets/jss/material-dashboard-react/components/typographyStyle";

const useStyles = makeStyles(styles);

const Primary = ({children} )=> {
  const classes = useStyles();

  return (
    <div className={classes.defaultFontStyle + " " + classes.primaryText}>
      {children}
    </div>
  );
};

Primary.propTypes = {
  children: PropTypes.node,
};

export default Primary;