import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppToolbar from "../AppToolbar/AppToolbar";
import Container from "@material-ui/core/Container"
import Notifier from "../../../containers/Notifier/Notifier";
import {Redirect, Route, Switch} from "react-router-dom";
import {landingRoutes} from "../../../routes";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    padding: 0
  }
}));

const switchRoutes = <Switch>
  {landingRoutes.map((prop, key) => {
    if (prop.layout === "/") {
      return (
        <Route
          path={prop.path}
          exact
          component={prop.component}
          key={key}
          redirectTo="/"
        />
      );
    } else if (prop.layout !== "/") {
      return (
        <Route
          path={prop.layout + prop.path}
          component={prop.component}
          key={key}
        />
      );
    }
    return null;
  })}
  <Redirect to="/"/>
</Switch>

const LandingLayout = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline/>
      <header>
        <AppToolbar/>
      </header>
      <Container maxWidth="xl" className={classes.container}>
        <main>
          <div className={classes.container}>
            {switchRoutes}
          </div>
        </main>
      </Container>
      <Notifier/>
    </>
  );
};

export default LandingLayout;