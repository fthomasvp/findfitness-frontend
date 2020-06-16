import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import Container from '@material-ui/core/Container';
import StepLabel from '@material-ui/core/StepLabel';

import * as AuthReducer from '../../../store/ducks/Auth';
import * as LocalizationReducer from '../../../store/ducks/Localization';
import YupSchema, {
  street,
  number,
  neighborhood,
  city,
  zipcode,
} from '../../validators';
import * as S from '../styles';
import SForm from '../../../components/Form';
import Alert from '../../../components/Alert';

// Yup Fields Schema
const AddressSchema = YupSchema({
  street,
  number,
  neighborhood,
  city,
  zipcode,
});

const AddressForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { states, citiesByState } = useSelector(state => state.localization);

  const { userToCreate } = useSelector(state => state.auth);

  const handleClickFindAddressByZipcode = (zipcode, states) => {
    if (zipcode) {
      const firstPart = zipcode.slice(0, 5);
      const secondPart = zipcode.slice(5);

      const formatedZipCode = `${firstPart}-${secondPart}`;

      const fromPage = 'signup';

      dispatch(
        LocalizationReducer.searchAddressByZipcodeRequest(
          formatedZipCode,
          states,
          fromPage
        )
      );
    } else {
      console.warn('Padrão do CEP Incorreto (e.g. 99999-999)');
    }
  };

  /**
   * Stepper functions
   */
  const { activeStep, steps } = useSelector(state => state.auth);

  const handleNext = () => dispatch(AuthReducer.handleNextStep(activeStep));

  const handleBack = () => dispatch(AuthReducer.handleBackStep(activeStep));

  /**
   * Alert
   */
  const error = useSelector(state => state.auth.error);
  const response = useSelector(state => state.auth.response);

  const errorLocalization = useSelector(state => state.localization.error);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setAlertMessage('');
    setOpenAlert(false);
    setGrowTransition(false);

    dispatch(AuthReducer.clearSnackbar());
    dispatch(LocalizationReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    (async () => {
      await dispatch(LocalizationReducer.fetchStatesRequest());
    })();
  }, [dispatch]);

  useEffect(() => {
    // Display snackbar Error message
    if (error && error.status !== 201) {
      setAlertMessage(error.data.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (response && response.status === 201) {
      history.replace('/login');
    }

    // Error 500 - CEP Not found in API LocationIQ e.g. 54762222
    if (errorLocalization && errorLocalization.status === 500) {
      setAlertMessage('Ops! Parece que esse CEP não foi encontrado');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }
  }, [error, errorLocalization, response, history]);

  return (
    <Container maxWidth="sm" style={{ alignSelf: 'center' }}>
      <Paper>
        <Formik
          initialValues={userToCreate.address}
          onSubmit={values => {
            const address = values;

            userToCreate.address = address;

            handleNext();

            dispatch(AuthReducer.storeAddressForm(address));
            dispatch(AuthReducer.signUpRequest(userToCreate));
          }}
          validationSchema={AddressSchema}
          enableReinitialize
        >
          {({ values, ...formikProps }) => {
            const {
              setFieldValue,
              handleChange,
              handleBlur,
              handleSubmit,
              touched,
              errors,
            } = formikProps;

            const {
              zipcode,
              street,
              neighborhood,
              number,
              complement,
              referenceLocation,
              city,
              state,
            } = values;

            return (
              <SForm onSubmit={handleSubmit}>
                <S.Panel>
                  <div>
                    <Stepper activeStep={activeStep} alternativeLabel>
                      {steps &&
                        steps.length > 0 &&
                        steps.map(label => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                    </Stepper>
                  </div>

                  <Divider style={{ marginBottom: '20px' }} />

                  <S.PanelTitle>
                    <Typography variant="h5" align="center">
                      Precisamos anotar os dados do seu endereço :)
                    </Typography>
                  </S.PanelTitle>

                  <S.PanelContent>
                    <TextField
                      autoFocus
                      id="zipcode"
                      label="CEP"
                      variant="outlined"
                      value={zipcode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="find address by zipcode"
                              onClick={() =>
                                handleClickFindAddressByZipcode(zipcode, states)
                              }
                            >
                              <Search />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      style={{ marginBottom: '20px', width: '50%' }}
                      error={
                        (errors.zipcode && touched.zipcode) ||
                        (errorLocalization && errorLocalization.status === 500)
                          ? true
                          : false
                      }
                      helperText={
                        errors.zipcode && touched.zipcode ? errors.zipcode : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />
                    <TextField
                      id="street"
                      label="Rua"
                      variant="outlined"
                      value={street}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px' }}
                      error={errors.street && touched.street ? true : false}
                      helperText={
                        errors.street && touched.street ? errors.street : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />
                    <TextField
                      id="neighborhood"
                      label="Bairro"
                      variant="outlined"
                      value={neighborhood}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px', width: '50%' }}
                      error={
                        errors.neighborhood && touched.neighborhood
                          ? true
                          : false
                      }
                      helperText={
                        errors.neighborhood && touched.neighborhood
                          ? errors.neighborhood
                          : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />
                    <TextField
                      id="number"
                      label="N°"
                      type="number"
                      variant="outlined"
                      value={number}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      inputProps={{ min: 1 }}
                      style={{ marginBottom: '20px', width: '30%' }}
                      error={errors.number && touched.number ? true : false}
                      helperText={
                        errors.number && touched.number ? errors.number : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />

                    <TextField
                      id="complement"
                      label="Complemento"
                      variant="outlined"
                      value={complement}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px' }}
                    />
                    <TextField
                      id="referenceLocation"
                      label="Ponto de Referência"
                      variant="outlined"
                      value={referenceLocation}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px' }}
                    />

                    <TextField
                      id="state"
                      select
                      label="Estado"
                      variant="outlined"
                      value={state}
                      onChange={async evt => {
                        const selectedState = evt.target.value;

                        await setFieldValue('state', selectedState);

                        return await dispatch(
                          LocalizationReducer.fetchCitiesByStateIdRequest(
                            selectedState
                          )
                        );
                      }}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      SelectProps={{
                        autoWidth: true,
                      }}
                      style={{ marginBottom: '20px', width: '25%' }}
                      error={errors.state && touched.state ? true : false}
                      helperText={
                        errors.state && touched.state ? errors.state : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    >
                      {states &&
                        states.map(state => (
                          <MenuItem key={state.id} value={state}>
                            {state.initials}
                          </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                      id="city"
                      select
                      label="Cidade"
                      variant="outlined"
                      value={city}
                      onChange={evt => setFieldValue('city', evt.target.value)}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      SelectProps={{
                        autoWidth: true,
                      }}
                      style={{ marginBottom: '20px', width: '80%' }}
                      error={errors.city && touched.city ? true : false}
                      helperText={
                        errors.city && touched.city ? errors.city : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    >
                      {citiesByState && citiesByState.length > 0 ? (
                        citiesByState.map(city => (
                          <MenuItem key={city.id} value={city.name}>
                            {city.name}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value={city}>{city}</MenuItem>
                      )}
                    </TextField>
                  </S.PanelContent>

                  <S.PanelActions>
                    <Button
                      color="secondary"
                      onClick={() => {
                        handleBack();

                        history.goBack();
                      }}
                    >
                      VOLTAR
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                      FINALIZAR
                    </Button>
                  </S.PanelActions>
                </S.Panel>
              </SForm>
            );
          }}
        </Formik>

        <Alert
          open={openAlert}
          handleClose={handleCloseAlert}
          growTransition={growTransition}
          message={alertMessage}
          severity={severity}
        />
      </Paper>
    </Container>
  );
};

export default AddressForm;
