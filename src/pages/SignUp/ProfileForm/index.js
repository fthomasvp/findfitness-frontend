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
import Container from '@material-ui/core/Container';

import * as S from '../styles';
import {
  storeProfileType,
  handleNextStep,
  clearFields,
} from '../../../store/ducks/Auth';

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

  // Limpar valor do step ao sair da página
  const leavePage = () => {
    dispatch(clearFields());

    history.goBack();
  };

  return (
    <Container maxWidth="sm" style={{ alignSelf: 'center' }}>
      <Paper variant="outlined">
        <S.Panel id="SPanel">
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

          <S.PanelTitle id="SPanelTitle1">
            <Typography variant="h5">Olá, vamos criar a sua conta?</Typography>
          </S.PanelTitle>

          <S.PanelTitle id="SPanelTitle2">
            <Typography variant="h5" align="center">
              Primeiro precisamos saber o seu tipo de perfil!
            </Typography>
          </S.PanelTitle>

          <S.PanelTitle id="SPanelTitle3">
            <Typography variant="h5" align="center">
              Por favor, selecione uma das opções abaixo:
            </Typography>
          </S.PanelTitle>

          <S.PanelContent id="SPanelContent">
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
          </S.PanelContent>

          <S.PanelActions id="sPanelActions">
            <Button color="secondary" variant="outlined" onClick={leavePage}>
              Voltar
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={handleClickNextButton}
              style={{ marginLeft: '15px' }}
            >
              Próximo
            </Button>
          </S.PanelActions>
        </S.Panel>
      </Paper>
    </Container>
  );
};

export default ProfileForm;
