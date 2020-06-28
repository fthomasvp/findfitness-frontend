import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import * as AuthReducer from '../../store/ducks/Auth';
import * as LocalizationReducer from '../../store/ducks/Localization';
import UserProfilePicture from './UserProfilePicture';
import UserHealthCardForm from './UserHealthCardForm';
import UserAddressForm from './UserAddressForm';
import UserForm from './UserForm';

const Profile = () => {
  const dispatch = useDispatch();

  const { profilePicture, profile, id } = useSelector(state => state.auth.user);
  const { userToUpdate } = useSelector(state => state.auth);
  const { states, citiesByState } = useSelector(state => state.localization);

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, tabValue) => setTab(tabValue);

  // Get user data to update "userToupdate"
  useEffect(() => {
    if (profile) {
      dispatch(AuthReducer.fetchUserDataRequest(profile, id));
    }
  }, [dispatch, profile, id]);

  // Get states to pre-load on Address tab
  useEffect(() => {
    (async () => {
      await dispatch(LocalizationReducer.fetchStatesRequest());
    })();
  }, [dispatch]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <UserProfilePicture
          id={id}
          profilePicture={profilePicture}
          profile={profile}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <AppBar position="relative" color="transparent">
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="profile tabs"
            >
              <Tab label="Dados pessoais" />
              <Tab label="Endereço" />
              {profile === 'ROLE_STUDENT' && <Tab label="Cartão de saúde" />}
            </Tabs>
          </AppBar>

          {tab === 0 && (
            <UserForm id={id} profile={profile} userToUpdate={userToUpdate} />
          )}

          {tab === 1 && (
            <UserAddressForm
              id={id}
              profile={profile}
              states={states}
              citiesByState={citiesByState}
              address={userToUpdate.address}
            />
          )}

          {tab === 2 && userToUpdate.healthCard ? (
            <UserHealthCardForm
              id={id}
              profile={profile}
              healthCard={userToUpdate.healthCard}
            />
          ) : (
            <div>Parece que você ainda não possui um cartão de saúde</div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Profile;
