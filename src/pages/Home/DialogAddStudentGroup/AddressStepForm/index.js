import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';

import * as StudentGroupReducer from '../../../../store/ducks/student_group';
import * as LocalizationReducer from '../../../../store/ducks/localization';
import YupSchema, {
  street,
  neighborhood,
  city,
  zipcode,
} from '../../../validators';
import SForm from '../../../../components/Form';
import Alert from '../../../../components/Alert';
import { useGlobalStyles } from '../../../../global/styles';
import { ContainerActionButtons, ActionButtons } from '../styles';

// Yup Fields Schema
const ThirdStepSchema = YupSchema({
  street,
  neighborhood,
  city,
  zipcode,
});

const AddressStepForm = ({ activeStep, handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

  const { createStudentGroup } = useSelector(state => state.studentGroup);
  const { thirdStepData } = createStudentGroup;

  const { states, citiesByState } = useSelector(state => state.localization);

  const handleClickFindAddressByZipcode = (zipcode, states) => {
    if (zipcode) {
      const firstPart = zipcode.slice(0, 5);
      const secondPart = zipcode.slice(5);

      const formatedZipCode = `${firstPart}-${secondPart}`;

      const fromPage = 'studentgroups';

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
  const errorLocalization = useSelector(state => state.localization.error);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setAlertMessage('');
    setOpenAlert(false);
    setGrowTransition(false);

    dispatch(LocalizationReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (states.length === 0) {
      dispatch(LocalizationReducer.fetchStatesRequest());
    }
  }, [dispatch, states]);

  useEffect(() => {
    // Error 500 - CEP Not found in API LocationIQ e.g. 54762222
    if (errorLocalization && errorLocalization.status === 500) {
      setAlertMessage('Ops! Parece que esse CEP não foi encontrado');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }
  }, [errorLocalization]);

  return (
    <>
      <Formik
        initialValues={thirdStepData}
        onSubmit={async thirdStepData => {
          await dispatch(StudentGroupReducer.storeThirdStepForm(thirdStepData));

          handleNext();
        }}
        validationSchema={ThirdStepSchema}
        validateOnChange={false}
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
              <div
                style={{
                  maxHeight: '400px',
                  display: 'flex',
                  flexFlow: 'column',
                  padding: '10px',
                }}
              >
                <TextField
                  autoFocus
                  id="zipcode"
                  label="CEP"
                  variant="outlined"
                  value={zipcode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
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
                  style={{ width: '60%' }}
                  error={
                    (errors && errors.zipcode && touched.zipcode) ||
                    (errorLocalization && errorLocalization.status === 500)
                      ? true
                      : false
                  }
                  helperText={
                    errors.zipcode && touched.zipcode ? errors.zipcode : ''
                  }
                  FormHelperTextProps={{
                    className: globalClasses.formHelperText,
                  }}
                />

                <TextField
                  id="street"
                  label="Rua"
                  variant="outlined"
                  value={street}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                  error={errors.street && touched.street ? true : false}
                  helperText={
                    errors.street && touched.street ? errors.street : ''
                  }
                  FormHelperTextProps={{
                    className: globalClasses.formHelperText,
                  }}
                />

                <TextField
                  id="neighborhood"
                  label="Bairro"
                  variant="outlined"
                  value={neighborhood}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
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
                    className: globalClasses.formHelperText,
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
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                  inputProps={{ min: 1 }}
                  style={{ marginBottom: '20px', width: '30%' }}
                />
                <TextField
                  id="complement"
                  label="Complemento"
                  variant="outlined"
                  value={complement}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                />
                <TextField
                  id="referenceLocation"
                  label="Ponto de Referência"
                  variant="outlined"
                  value={referenceLocation}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                />

                {/* Serão Select Fields */}
                <TextField
                  id="state"
                  select
                  label="Estado"
                  variant="outlined"
                  value={state}
                  onChange={evt => {
                    const selectedState = evt.target.value;

                    setFieldValue('state', selectedState);

                    setFieldValue('city', '');

                    dispatch(
                      LocalizationReducer.fetchCitiesByStateIdRequest(
                        selectedState
                      )
                    );
                  }}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                  SelectProps={{
                    autoWidth: true,
                  }}
                  style={{ marginBottom: '20px', width: '40%' }}
                  error={errors.state && touched.state ? true : false}
                  helperText={errors.state && touched.state ? errors.state : ''}
                  FormHelperTextProps={{
                    className: globalClasses.formHelperText,
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
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                  SelectProps={{
                    autoWidth: true,
                  }}
                  error={errors.city && touched.city ? true : false}
                  helperText={errors.city && touched.city ? errors.city : ''}
                  FormHelperTextProps={{
                    className: globalClasses.formHelperText,
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
              </div>

              {/* Step Control Buttons */}
              <ContainerActionButtons>
                <ActionButtons>
                  <div>
                    <Button
                      color="secondary"
                      variant="outlined"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                      className={globalClasses.secondaryButton}
                    >
                      Voltar
                    </Button>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      className={globalClasses.primaryButton}
                    >
                      Concluir
                    </Button>
                  </div>
                </ActionButtons>
              </ContainerActionButtons>
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
    </>
  );
};

AddressStepForm.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default AddressStepForm;
