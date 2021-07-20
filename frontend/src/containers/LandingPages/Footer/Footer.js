import React from 'react';

import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    marginLeft: 70
  },
  footerText: {
    color: "#3f50b5"
  },
  button: {
    fontSize: 20,
    padding: 10,
    margin: 20,
    '&:hover': {
      color: '#fff'
    }
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item container spacing={3} direction='row' justify='space-evenly' alignItems='center'>
        <Grid item container md={6} lg={6} direction='row'>
          <Grid item xs>
            <Typography variant='h6' className={classes.footerText}>Financier</Typography>
            <Grid item container direction='column'>
              <Link to='/about'>About Us</Link>
            </Grid>
          </Grid>
          <Grid item xs>
            <Typography variant='h6'>Account</Typography>
            <Grid item container direction='column'>
              <Link to='/login'>Log in</Link>
              <Link to='/signup'>Sign up</Link>
              <Link to='/'>Reset password</Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6} lg={6}>
          <List className={classes.root}>
            <Button variant="contained" color="primary" component={Link} to="/signup" className={classes.button}>Google
              play</Button>
            <Button variant="contained" color="primary" component={Link} to="/login" className={classes.button}>App
              store</Button>
          </List>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;