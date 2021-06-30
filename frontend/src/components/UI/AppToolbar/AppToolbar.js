import React from 'react';
import {AppBar, Grid, makeStyles, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import AnonymousMenu from "./Menu/AnonymousMenu";
import logo from "../../../assets/images/personalLogo.png";

const useStyles = makeStyles(theme => ({
  mainLink: {
    color: 'inherit',
    textDecoration: 'none',
    marginLeft: 125,
    '&:hover': {
      color: 'inherit'
    }
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  staticToolbar: {
    marginBottom: theme.spacing(0)
  },
  logoImage: {
    width: "90px",
    display: "inline-block",
    maxHeight: "90px",
    marginLeft: "10px",
    marginRight: "15px",
  },
  img: {
    width: "100px",
    top: "0px",
    position: "absolute",
    verticalAlign: "middle",
    border: "0",
  }
}));

const AppToolbar = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <div className={classes.logoImage}>
                <img src={logo} alt="logo" className={classes.img}/>
              </div>
              <Typography variant="h6">
                <Link to="/" className={classes.mainLink}>Financier</Link>
              </Typography>
            </Grid>
            <Grid item>
              <AnonymousMenu/>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.staticToolbar}/>
    </>
  );
};

export default AppToolbar;