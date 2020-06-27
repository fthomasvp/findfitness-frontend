import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Formik } from 'formik';
import Search from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';

import * as AuthReducer from '../../../store/ducks/Auth';
import * as LocalizationReducer from '../../../store/ducks/Localization';
import * as S from '../styles';
import SForm from '../../../components/Form';
import YupSchema, {
  street,
  number,
  neighborhood,
  city,
  zipcode,
} from '../../validators';
import Alert from '../../../components/Alert';

/**
 * Yup Fields Schema
 */
const AddressSchema = YupSchema({
  street,
  number,
  neighborhood,
  city,
  zipcode,
});

const UserAddressForm = ({ id, profile, states, citiesByState, address }) => {
  const dispatch = useDispatch();

  const handleClickFindAddressByZipcode = (zipcode, states) => {
    if (zipcode) {
      const firstPart = zipcode.slice(0, 5);
      const secondPart = zipcode.slice(5);

      const formatedZipCode = `${firstPart}-${secondPart}`;

      const fromPage = 'profile';

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
    if (error && error.status !== 200) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (
      response &&
      response.config?.method === 'patch' &&
      response.status === 204
    ) {
      setAlertMessage('Seus dados foram atualizados');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      dispatch(AuthReducer.fetchUserDataRequest(profile, id));
    }

    // Address step Tab
    if (errorLocalization && errorLocalization.status === 500) {
      setAlertMessage('Ops! Parece que esse CEP não foi encontrado');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }
  }, [error, response, dispatch, profile, id, errorLocalization]);

  return (
    <Formik
      initialValues={address}
      onSubmit={values => {
        let address = values;

        address = {
          ...address,
          number: String(address.number),
          state: String(address.state),
        };

        dispatch(AuthReducer.patchUserAddressDataRequest(profile, id, address));
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
                    style: { fontSize: '1rem' },
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
                    style: { fontSize: '1.1rem', minWidth: '280px' },
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
                    style: { fontSize: '1rem' },
                  }}
                  style={{ marginBottom: '20px' }}
                  error={errors.street && touched.street ? true : false}
                  helperText={
                    errors.street && touched.street ? errors.street : ''
                  }
                  FormHelperTextProps={{
                    style: { fontSize: '1.1rem', minWidth: '280px' },
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
                    style: { fontSize: '1rem' },
                  }}
                  style={{ marginBottom: '20px', width: '50%' }}
                  error={
                    errors.neighborhood && touched.neighborhood ? true : false
                  }
                  helperText={
                    errors.neighborhood && touched.neighborhood
                      ? errors.neighborhood
                      : ''
                  }
                  FormHelperTextProps={{
                    style: { fontSize: '1.1rem', minWidth: '280px' },
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
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ min: 1 }}
                  style={{ marginBottom: '20px', width: '30%' }}
                  error={errors.number && touched.number ? true : false}
                  helperText={
                    errors.number && touched.number ? errors.number : ''
                  }
                  FormHelperTextProps={{
                    style: { fontSize: '1.1rem', minWidth: '280px' },
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
                    style: { fontSize: '1rem' },
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
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
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

                    await setFieldValue('city', '');

                    return await dispatch(
                      LocalizationReducer.fetchCitiesByStateIdRequest(
                        selectedState
                      )
                    );
                  }}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  SelectProps={{
                    autoWidth: true,
                  }}
                  style={{ marginBottom: '20px', width: '30%' }}
                  error={errors.state && touched.state ? true : false}
                  helperText={errors.state && touched.state ? errors.state : ''}
                  FormHelperTextProps={{
                    style: { fontSize: '1.1rem', minWidth: '280px' },
                  }}
                >
                  {states &&
                    states.map(state => (
                      <MenuItem key={state.id} value={state.initials}>
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
                    style: { fontSize: '1rem' },
                  }}
                  SelectProps={{
                    autoWidth: true,
                  }}
                  style={{ marginBottom: '20px', width: '80%' }}
                  error={errors.city && touched.city ? true : false}
                  helperText={errors.city && touched.city ? errors.city : ''}
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
                <Button color="primary" variant="contained" type="submit">
                  Atualizar
                </Button>
              </S.PanelActions>

              <Alert
                open={openAlert}
                handleClose={handleCloseAlert}
                growTransition={growTransition}
                message={alertMessage}
                severity={severity}
              />
            </S.Panel>
          </SForm>
        );
      }}
    </Formik>
  );
};

UserAddressForm.propTypes = {
  id: PropTypes.number.isRequired,
  profile: PropTypes.string.isRequired,
  states: PropTypes.array.isRequired,
  citiesByState: PropTypes.array,
  address: PropTypes.object.isRequired,
};

export default UserAddressForm;
