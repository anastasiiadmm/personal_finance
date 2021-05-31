import React from 'react';
import {Route, Switch} from 'react-router-dom';
import {Helmet} from "react-helmet";
import Layout from "./components/UI/Layout/Layout";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import Home from "./containers/Home/Home";

const App = () => {
  return (
    <Layout>
      <Helmet
        titleTemplate="%s - Finance Tracker"
        defaultTitle="Finance Tracker"
      />
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/register" component={Register}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Layout>
  );
};

export default App;
