import React, { useEffect } from 'react';
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
import StepLabel from '@material-ui/core/StepLabel';

import {
  storeAddressForm,
  signUpRequest,
  handleBackStep,
  handleNextStep,
} from '../../../store/ducks/Auth';
import {
  fetchStatesRequest,
  searchAddressByZipcodeRequest,
  fetchCitiesByStateIdRequest,
} from '../../../store/ducks/Localization';
import YupSchema, {
  street,
  number,
  neighborhood,
  city,
  zipcode,
} from '../../validators';
import {
  SContainer,
  SPanel,
  SPanelTitle,
  SPanelContent,
  SPanelActions,
} from '../styles';
import SForm from '../../../components/Form';

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
        searchAddressByZipcodeRequest(formatedZipCode, states, fromPage)
      );
    } else {
      console.warn('Padrão do CEP Incorreto (e.g. 99999-999)');
    }
  };

  /**
   * Stepper functions
   */
  const { activeStep, steps } = useSelector(state => state.auth);

  const handleNext = () => dispatch(handleNextStep(activeStep));

  const handleBack = () => dispatch(handleBackStep(activeStep));

  /**
   * Effects
   */
  useEffect(() => {
    (async () => {
      await dispatch(fetchStatesRequest());
    })();
  }, [dispatch]);

  return (
    <SContainer>
      <Paper>
        <Formik
          initialValues={userToCreate.address}
          onSubmit={values => {
            const address = values;

            userToCreate.address = address;

            handleNext();

            dispatch(storeAddressForm(address));
            dispatch(signUpRequest(userToCreate));

            history.replace('/login');
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
                <SPanel>
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

                  <SPanelTitle>
                    <Typography variant="h5">
                      Precisamos anotar os dados do seu endereço :)
                    </Typography>
                  </SPanelTitle>

                  <SPanelContent>
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
                      style={{ marginBottom: '20px', width: '30%' }}
                      error={errors.zipcode && touched.zipcode ? true : false}
                      helperText={
                        errors.zipcode && touched.zipcode ? errors.zipcode : ''
                      }
                      FormHelperTextProps={{
                        style: { width: 'max-content', fontSize: '1.1rem' },
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
                        style: { width: 'max-content', fontSize: '1.1rem' },
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
                        style: { width: 'max-content', fontSize: '1.1rem' },
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
                      style={{ marginBottom: '20px', width: '18%' }}
                      error={errors.number && touched.number ? true : false}
                      helperText={
                        errors.number && touched.number ? errors.number : ''
                      }
                      FormHelperTextProps={{
                        style: { width: 'max-content', fontSize: '1.1rem' },
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
                          fetchCitiesByStateIdRequest(selectedState)
                        );
                      }}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      SelectProps={{
                        autoWidth: true,
                      }}
                      style={{ marginBottom: '20px', width: '18%' }}
                      error={errors.state && touched.state ? true : false}
                      helperText={
                        errors.state && touched.state ? errors.state : ''
                      }
                      FormHelperTextProps={{
                        style: { width: 'max-content', fontSize: '1.1rem' },
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
                      style={{ marginBottom: '20px', width: '50%' }}
                      error={errors.city && touched.city ? true : false}
                      helperText={
                        errors.city && touched.city ? errors.city : ''
                      }
                      FormHelperTextProps={{
                        style: { width: 'max-content', fontSize: '1.1rem' },
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
                  </SPanelContent>

                  <SPanelActions>
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
                  </SPanelActions>
                </SPanel>
              </SForm>
            );
          }}
        </Formik>
      </Paper>
    </SContainer>
  );
};

export default AddressForm;
