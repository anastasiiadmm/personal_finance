import React, {createRef, useEffect, useState} from 'react';
import PerfectScrollbar from "perfect-scrollbar";
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


let ps;
const useStyles = makeStyles(appStyle);

const AppLayout = () => {
    const classes = useStyles();
    const mainPanel = createRef();
    const user = useSelector(state => state.users.user);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const resizeFunction = () => {
        if (window.innerWidth >= 960) {
            setMobileOpen(false);
        }
    };

    useEffect(() => {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false,
            });
            document.body.style.overflow = "hidden";
        }
        window.addEventListener("resize", resizeFunction);
        return function cleanup() {
            if (navigator.platform.indexOf("Win") > -1) {
                ps.destroy();
                ps = null;

            }
            window.removeEventListener("resize", resizeFunction);
        };
    }, [mainPanel]);


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
                    <ProtectedRoute
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                        isAllowed={user}
                        redirectTo="/"
                    />
                );
            }
            return null;
        })}
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
                <div className={classes.mainPanel} ref={mainPanel}>
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