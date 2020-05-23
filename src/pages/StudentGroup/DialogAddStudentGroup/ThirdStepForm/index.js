import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';

import SForm from '../../../../components/Form';
import { storeThirdStepForm } from '../../../../store/ducks/StudentGroup';
import {
  fetchStatesRequest,
  searchAddressByZipcodeRequest,
  fetchCitiesByStateIdRequest,
} from '../../../../store/ducks/Localization';
import YupSchema, {
  street,
  number,
  neighborhood,
  city,
  zipcode,
} from '../../../validators';

// Yup Fields Schema
const ThirdStepSchema = YupSchema({
  street,
  number,
  neighborhood,
  city,
  zipcode,
});

const ThirdStepForm = ({ activeStep, handleBack, handleNext }) => {
  const { createStudentGroup } = useSelector(state => state.studentGroup);
  const { thirdStepData } = createStudentGroup;

  const { states, citiesByState } = useSelector(state => state.localization);

  const dispatch = useDispatch();

  const handleClickFindAddressByZipcode = (zipcode, states) => {
    if (zipcode) {
      const firstPart = zipcode.slice(0, 5);
      const secondPart = zipcode.slice(5);

      const formatedZipCode = `${firstPart}-${secondPart}`;

      const fromPage = 'studentgroup';

      dispatch(
        searchAddressByZipcodeRequest(formatedZipCode, states, fromPage)
      );
    } else {
      console.warn('Padrão do CEP Incorreto (e.g. 99999-999)');
    }
  };

  useEffect(() => {
    (async () => {
      await dispatch(fetchStatesRequest());
    })();
  }, [dispatch]);

  return (
    <Formik
      initialValues={thirdStepData}
      onSubmit={thirdStepData => {
        dispatch(storeThirdStepForm(thirdStepData));
        handleNext();
      }}
      validationSchema={ThirdStepSchema}
      enableReinitialize
    >
      {({ values, ...formikProps }) => {
        const {
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
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
            <TextField
              autoFocus
              id="zipcode"
              label="CEP"
              variant="outlined"
              value={zipcode}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
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
              style={{ marginBottom: '20px', width: '25%' }}
              error={errors && errors.zipcode ? true : false}
              helperText={errors.zipcode || ''}
            />
            <TextField
              id="street"
              label="Rua"
              variant="outlined"
              value={street}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ marginBottom: '20px' }}
              error={errors && errors.street ? true : false}
              helperText={errors.street || ''}
            />
            <TextField
              id="neighborhood"
              label="Bairro"
              variant="outlined"
              value={neighborhood}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ marginBottom: '20px', width: '50%' }}
              error={errors && errors.neighborhood ? true : false}
              helperText={errors.neighborhood || ''}
            />
            <TextField
              id="number"
              label="N°"
              type="number"
              variant="outlined"
              value={number}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ min: 1 }}
              style={{ marginBottom: '20px', width: '10%' }}
              error={errors && errors.number ? true : false}
              helperText={errors.number || ''}
            />

            <TextField
              id="complement"
              label="Complemento"
              variant="outlined"
              value={complement}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              id="referenceLocation"
              label="Ponto de Referência"
              variant="outlined"
              value={referenceLocation}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ marginBottom: '20px' }}
            />

            {/* Serão Select Fields */}
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
              InputLabelProps={{ style: { color: 'white' } }}
              SelectProps={{
                autoWidth: true,
              }}
              style={{ marginBottom: '20px', width: '10%' }}
              error={errors && errors.state ? true : false}
              helperText={errors.state || ''}
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
              InputLabelProps={{ style: { color: 'white' } }}
              SelectProps={{
                autoWidth: true,
              }}
              style={{ marginBottom: '20px', width: '35%' }}
              error={errors && errors.city ? true : false}
              helperText={errors.city || ''}
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

            {/* Step Control Buttons */}
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'space-around',
              }}
            >
              <div>
                <Button
                  disabled={activeStep === 0}
                  color="secondary"
                  onClick={handleBack}
                >
                  Voltar
                </Button>
              </div>
              <div>
                <Button variant="contained" color="primary" type="submit">
                  Concluir
                </Button>
              </div>
            </div>
          </SForm>
        );
      }}
    </Formik>
  );
};

ThirdStepForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default ThirdStepForm;
