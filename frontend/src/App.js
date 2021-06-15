import React from 'react';
import {Helmet} from "react-helmet";
import AppLayout from "./components/UI/Layout/ApplLayout";
import {useSelector} from "react-redux";
import LandingLayout from "./components/UI/Layout/LandingLayout";

const App = () => {
  const user = useSelector(state => state.users.user);

  return (
    <>
      <Helmet
        titleTemplate="%s - Finance Tracker"
        defaultTitle="Finance Tracker"
      />
      {user ? <AppLayout/> : <LandingLayout/>}
    </>
  );
};

export default App;
