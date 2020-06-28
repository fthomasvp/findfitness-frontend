import React from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import ProfileForm from '../pages/SignUp/ProfileForm';
import StudentOrPersonalForm from '../pages/SignUp/StudentOrPersonalForm';
import AddressForm from '../pages/SignUp/AddressForm';
import MainLayout from '../components/MainLayout';
import Menu from '../components/Menu';
import Exercise from '../pages/Exercise';
import Specialization from '../pages/Specialization';
import Home from '../pages/Home';
import StudentGroup from '../pages/StudentGroup';
import Profile from '../pages/Profile';
import PaymentMethod from '../pages/PaymentMethod';
import API from '../services/API';

const Routes = () => {
  const { user, isAuthenticated } = useSelector(state => state.auth);
  const { token } = user;

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
        <Route exact path="/home">
          {!isAuthenticated && <Redirect to="/" />}
          <MainLayout menuArea={Menu} mainArea={Home} />
        </Route>

        <Route exact path="/studentgroups">
          {!isAuthenticated && <Redirect to="/" />}
          <MainLayout menuArea={Menu} mainArea={StudentGroup} />
        </Route>

        <Route exact path="/specializations">
          {!isAuthenticated && <Redirect to="/" />}
          <MainLayout menuArea={Menu} mainArea={Specialization} />
        </Route>

        <Route exact path="/activities">
          {!isAuthenticated && <Redirect to="/" />}
          <MainLayout menuArea={Menu} mainArea={Exercise} />
        </Route>

        {/* Profile */}
        <Route exact path="/profile">
          {!isAuthenticated && <Redirect to="/" />}
          <MainLayout menuArea={Menu} mainArea={Profile} />
        </Route>

        {/* Payment */}
        <Route exact path="/paymentmethod">
          {!isAuthenticated && <Redirect to="/" />}
          <MainLayout menuArea={Menu} mainArea={PaymentMethod} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
