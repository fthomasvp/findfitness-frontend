import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Divider from '@material-ui/core/Divider';

import {
  SContainer,
  SPanel,
  SPanelTitle,
  SPanelContent,
  SPanelActions,
} from '../styles';
import { storeProfileType, handleNextStep } from '../../../store/ducks/Auth';

const ProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { profileType } = useSelector(state => state.auth.userToCreate);

  const [profileTypeForm, setProfileTypeForm] = useState(profileType);

  const [tab, setTab] = React.useState(profileType === 'STUDENT' ? 0 : 1);

  /**
   * Stepper Info
   */
  const { activeStep, steps } = useSelector(state => state.auth);

  const handleNext = () => dispatch(handleNextStep(activeStep));

  const handleClickNextButton = () => {
    dispatch(storeProfileType(profileTypeForm));

    handleNext();

    history.push('/signup/userform');
  };

  const handleChangeTab = (event, tabValue) => {
    setTab(tabValue);

    if (tabValue === 0) {
      setProfileTypeForm('STUDENT');
    } else {
      setProfileTypeForm('PERSONAL');
    }
  };

  return (
    <SContainer>
      <Paper variant="outlined">
        <SPanel id="SPanel">
          <div>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.length > 0 &&
                steps.map(label => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
            </Stepper>

            <Divider />
          </div>

          <SPanelTitle id="SPanelTitle1">
            <Typography variant="h4">Olá, vamos criar a sua conta?</Typography>
          </SPanelTitle>

          <SPanelTitle id="SPanelTitle2">
            <Typography variant="h5">
              Primeiro precisamos saber o seu tipo de perfil!
            </Typography>
          </SPanelTitle>

          <SPanelTitle id="SPanelTitle3">
            <Typography variant="h5">
              Por favor, selecione uma das opções abaixo:
            </Typography>
          </SPanelTitle>

          <SPanelContent id="SPanelContent">
            <AppBar position="relative" color="transparent">
              <Tabs
                value={tab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                centered
              >
                <Tab label="ESTUDANTE" />
                <Tab label="PERSONAL" />
              </Tabs>
            </AppBar>
          </SPanelContent>

          <SPanelActions id="sPanelActions">
            <Button color="secondary" onClick={() => history.goBack()}>
              Voltar
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickNextButton}
            >
              Próximo
            </Button>
          </SPanelActions>
        </SPanel>
      </Paper>
    </SContainer>
  );
};

export default ProfileForm;
