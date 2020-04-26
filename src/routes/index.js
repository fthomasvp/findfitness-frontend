import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import SignIn from '../pages/SignIn';
import ProfileForm from '../pages/SignUp/ProfileForm';
import StudentOrPersonalForm from '../pages/SignUp/StudentOrPersonalForm';
import AddressForm from '../pages/SignUp/AddressForm';
import Chat from '../pages/Chat';
import Specialization from '../pages/Specialization';
import StudentGroup from '../pages/StudentGroup';
import Exercise from '../pages/Exercise';

import MainLayout from '../components/MainLayout';
import Menu from '../components/Menu';

import API from '../services/API';

const Routes = () => {
  const { token } = useSelector(state => state.auth.user);

  if (token && token.length > 0) {
    API.defaults.headers.common['Authorization'] = token;
  }

  return (
    <BrowserRouter>
      <Switch>
        {/* Sign In */}
        <Redirect exact from="/" to="/login" />
        <Route exact path="/login">
          <SignIn />
        </Route>

        {/* Sign Up */}
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
        <Route exact path="/studentgroup">
          <MainLayout menuArea={Menu} asideArea={StudentGroup} />
        </Route>

        <Route exact path="/specialization">
          <MainLayout menuArea={Menu} asideArea={Specialization} />
        </Route>

        <Route exact path="/exercise">
          <MainLayout menuArea={Menu} asideArea={Exercise} />
        </Route>

        <Route exact path="/chat">
          <MainLayout menuArea={Menu} asideArea={Chat} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
