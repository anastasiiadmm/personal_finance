import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import appStyle from "../../../assets/jss/material-dashboard-react/layouts/adminStyle";
import Sidebar from "../../../template/Sidebar/Sidebar";
import {appRoutes} from "../../../routes";
import logo from "../../../assets/images/personalLogo.png";
import sideBarImg from "../../../assets/images/sidebar.jpg";
import Navbar from "../../../template/Navbars/Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Notifier from "../../../containers/Notifier/Notifier";
import {Redirect, Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";

const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
  return isAllowed ?
    <Route {...props} /> :
    <Redirect to={redirectTo}/>;
};

const useStyles = makeStyles(appStyle);

const AppLayout = () => {
  const classes = useStyles();
  const user = useSelector(state => state.users.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  const switchRoutes = <Switch>
    {appRoutes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <ProtectedRoute
            path={prop.path}
            exact
            component={prop.component}
            key={key}
            isAllowed={user}
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


  return (
    <div className={classes.wrapper}>
      <CssBaseline/>
      <main>
        <Sidebar
          routes={appRoutes}
          logoText={"Financier"}
          logo={logo}
          image={sideBarImg}
          handleDrawerToggle={handleDrawerToggle}
          open={mobileOpen}
          color="purple"
        />
        <div className={classes.mainPanel}>
          <Navbar
            routes={appRoutes}
            handleDrawerToggle={handleDrawerToggle}
            user={user}
          />
          <div className={classes.content}>
            <div className={classes.container}>
              {switchRoutes}
            </div>
          </div>
        </div>
      </main>
      <Notifier/>
    </div>
  );
};

export default AppLayout;