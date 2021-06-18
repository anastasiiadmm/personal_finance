import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppToolbar from "../AppToolbar/AppToolbar";
import Container from "@material-ui/core/Container"
import Notifier from "../../../containers/Notifier/Notifier";
import {Redirect, Route, Switch} from "react-router-dom";
import {landingRoutes} from "../../../routes";

const switchRoutes = <Switch>
    {landingRoutes.map((prop, key) => {
        if (prop.layout === "/") {
            return (
                <Route
                    path={prop.path}
                    exact={prop.exact}
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
    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <main>
                <Container maxWidth="xl">
                    {switchRoutes}
                </Container>
            </main>
            <Notifier/>
        </>
    );
};

export default LandingLayout;