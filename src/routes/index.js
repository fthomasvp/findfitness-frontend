import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login" component={SignIn} />
        <Route exact path="/home" component={() => <h1>Home</h1>} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
