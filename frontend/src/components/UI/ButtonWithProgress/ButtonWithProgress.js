import React from 'react';
import {CircularProgress} from "@material-ui/core";
import Button from "../../../template/CustomButtons/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  buttonProgress: {
    position: 'absolute',

    top: '50%',
    left: '50%',
    // transform: 'translate(-50%, -50%)',
    marginTop: '-10px',
    marginLeft: '-10px',
  }
});

const ButtonWithProgress = ({children, loading, ...props}) => {
  const classes = useStyles();

  return (
    <Button
      {...props}
    >
      {children}
      {loading && <CircularProgress size={20} className={classes.buttonProgress} color="inherit"/>}
    </Button>
  );
};

export default ButtonWithProgress;