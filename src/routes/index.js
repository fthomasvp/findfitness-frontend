import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ProfileForm from '../pages/SignUp/ProfileForm';
import StudentOrPersonalForm from '../pages/SignUp/StudentOrPersonalForm';
import AddressForm from '../pages/SignUp/AddressForm';
import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Specialization from '../pages/Specialization';
import StudentGroup from '../pages/StudentGroup';
import Exercise from '../pages/Exercise';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* Login */}
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login">
          <SignIn />
        </Route>

        {/* SignUp */}
        <Redirect exact from="/signup" to="/signup/profileform" />
        <Route exact path="/signup/profileform">
          <ProfileForm />
        </Route>
        <Route exact path="/signup/userform">
          <StudentOrPersonalForm />
        </Route>
        <Route exact path="/signup/addressform">
          <AddressForm />
        </Route>

        {/* Home */}
        <Route exact path="/home">
          <Home />
        </Route>

        <Route exact path="/specialization">
          <Specialization />
        </Route>

        <Route exact path="/studentgroup">
          <StudentGroup />
        </Route>

        <Route exact path="/exercise">
          <Exercise />
        </Route>

        <Route exact path="/chat">
          <Chat />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
