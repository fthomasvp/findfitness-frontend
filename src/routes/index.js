import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/home">
          <h1>Home</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
