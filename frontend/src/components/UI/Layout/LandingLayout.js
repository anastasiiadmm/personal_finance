import React from 'react';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppToolbar from "../AppToolbar/AppToolbar";
import Container from "@material-ui/core/Container"
import Notifier from "../../../containers/Notifier/Notifier";
import {Redirect, Route, Switch} from "react-router-dom";
import {landingRoutes} from "../../../routes";
import {makeStyles} from "@material-ui/core/styles";
import FeaturedPost from "../../../containers/LandingPages/FeaturedPost/FeaturedPost";
import HelpfulPost from "../../../containers/LandingPages/HelpfulPost/HelpfulPost";
import Footer from "../../../containers/LandingPages/Footer/Footer";
import SubmitPost from "../../../containers/LandingPages/SubmitPost/SubmitPost";
import Slider from "../../../containers/LandingPages/Slider.js/Slider";

const useStyles = makeStyles((theme) => ({
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
    const classes = useStyles();

    return (
        <>
            <CssBaseline/>
            <header>
                <AppToolbar/>
            </header>
            <Container maxWidth="xl" className={classes.container}>
                <main>
                    {switchRoutes}
                    <Slider />
                    <FeaturedPost />
                    <HelpfulPost />
                    <SubmitPost />
                    <Footer />
                </main>
            </Container>
            <Notifier/>
        </>
    );
};

export default LandingLayout;