import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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

const ThirdStepForm = ({ activeStep, handleBack, handleNext }) => {
  const { createStudentGroup } = useSelector(state => state.studentGroup);
  const { thirdStepData } = createStudentGroup;

  const { states, citiesByState } = useSelector(state => state.localization);

  const dispatch = useDispatch();

  const handleClickFindAddressByZipcode = (zipcode, states) => {
    const regexZipcode = /\d{5}-\d{3}/;
    if (regexZipcode.test(zipcode)) {
      dispatch(searchAddressByZipcodeRequest(zipcode, states));
    } else {
      console.log('Padrão do CEP Incorreto (e.g 99999-999)');
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
      onSubmit={async thirdStepData => {
        await dispatch(storeThirdStepForm(thirdStepData));
        await handleNext();
      }}
      // validationSchema={AddressSchema}
      enableReinitialize
    >
      {({ values, ...formikProps }) => {
        const {
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
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
              style={{ marginBottom: '20px' }}
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
            />
            <TextField
              id="neighborhood"
              label="Bairro"
              variant="outlined"
              value={neighborhood}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              id="number"
              label="N°"
              variant="outlined"
              value={number}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ marginBottom: '20px' }}
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
              id="city"
              select
              label="Cidade"
              variant="outlined"
              value={city}
              onChange={evt => setFieldValue('city', evt.target.value)}
              InputLabelProps={{ style: { color: 'white' } }}
              style={{ marginBottom: '20px' }}
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
              style={{ marginBottom: '20px' }}
            >
              {states &&
                states.map(state => (
                  <MenuItem key={state.id} value={state}>
                    {state.initials}
                  </MenuItem>
                ))}
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
                <Button variant="contained" color="primary" type="submit">
                  Concluir
                </Button>
              </div>
              <div>
                <Button
                  disabled={activeStep === 0}
                  color="secondary"
                  onClick={handleBack}
                >
                  Voltar
                </Button>
              </div>
            </div>
          </SForm>
        );
      }}
    </Formik>
  );
};

export default ThirdStepForm;
