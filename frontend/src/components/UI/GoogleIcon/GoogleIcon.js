import React from 'react';
import {Icon, makeStyles} from "@material-ui/core";
import googleImage from '../../../assets/images/google.svg';

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    verticalAlign: 'top',
  },
});

const GoogleIcon = props => {
  const classes = useStyles();

  return (
    <Icon {...props}>
      <img src={googleImage} alt="google logo" className={classes.root}/>
    </Icon>
  );
};

export default GoogleIcon;