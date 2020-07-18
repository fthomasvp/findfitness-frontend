import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import PhoneIcon from '@material-ui/icons/Phone';

import SForm from '../../../../components/Form';
import { storeFirstStepForm } from '../../../../store/ducks/student_group';
import { errorMessages } from '../../../validators';
import Utils from '../../../../utils';
import { useGlobalStyles } from '../../../../global/styles';
import { ContainerActionButtons, ActionButtons } from '../styles';

import 'moment/locale/pt-br';

const FirstStepForm = ({ handleBack, handleNext }) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

  const { createStudentGroup } = useSelector(state => state.studentGroup);
  const { firstStepData } = createStudentGroup;

  return (
    <Formik
      initialValues={firstStepData}
      onSubmit={firstStepData => {
        const { selectedBeginDateTime, selectedEndDateTime } = firstStepData;
        firstStepData.selectedBeginDateTime = Utils.formatDateTimeToDatabase(
          selectedBeginDateTime
        );
        firstStepData.selectedEndDateTime = Utils.formatDateTimeToDatabase(
          selectedEndDateTime
        );

        dispatch(storeFirstStepForm(firstStepData));
        handleNext();
      }}
      validate={values => {
        const {
          contactPhone,
          minQtyStudents,
          maxQtyStudents,
          selectedBeginDateTime,
          selectedEndDateTime,
        } = values;
        const { studentGroupAmount, requiredNumericField } = errorMessages;
        const errors = {};

        if (!minQtyStudents) {
          errors.minQtyStudents = requiredNumericField;
        } else if (minQtyStudents > maxQtyStudents) {
          errors.minQtyStudents = studentGroupAmount;
        }

        if (!maxQtyStudents) {
          errors.maxQtyStudents = requiredNumericField;
        } else if (maxQtyStudents < minQtyStudents) {
          errors.maxQtyStudents = studentGroupAmount;
        }

        // IF isValidRangeDateTime=false, means the date range is incorrect
        if (
          !Utils.isBeginDateTimeBeforeEndDateTime(
            selectedBeginDateTime,
            selectedEndDateTime
          )
        ) {
          errors.selectedBeginDateTime =
            'A aula não pode começar após terminar';
          errors.selectedEndDateTime = 'A aula não pode começar após terminar';
        }

        if (!contactPhone) {
          errors.contactPhone = requiredNumericField;
        } else if (contactPhone && String(contactPhone).length !== 11) {
          errors.contactPhone = 'Número precisa conter 11 dígitos';
        }

        return errors;
      }}
      validateOnChange={false}
    >
      {({ values, ...formikProps }) => {
        const {
          setFieldValue,
          handleChange,
          handleSubmit,
          handleBlur,
          touched,
          errors,
        } = formikProps;

        const {
          contactPhone,
          minQtyStudents,
          maxQtyStudents,
          selectedBeginDateTime,
          selectedEndDateTime,
          eventPrice,
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
                id="minQtyStudents"
                label="Quantidade mínima de alunos"
                type="number"
                variant="outlined"
                value={minQtyStudents}
                onChange={handleChange}
                onBlur={handleBlur}
                className={globalClasses.textField}
                InputLabelProps={{
                  className: globalClasses.inputLabel,
                }}
                inputProps={{ min: 1 }}
                error={
                  errors.minQtyStudents && touched.minQtyStudents ? true : false
                }
                helperText={
                  errors.minQtyStudents && touched.minQtyStudents
                    ? errors.minQtyStudents
                    : ''
                }
                FormHelperTextProps={{
                  className: globalClasses.formHelperText,
                }}
              />

              <TextField
                id="maxQtyStudents"
                label="Quantidade máxima de alunos"
                type="number"
                variant="outlined"
                value={maxQtyStudents}
                onChange={handleChange}
                onBlur={handleBlur}
                className={globalClasses.textField}
                InputLabelProps={{
                  className: globalClasses.inputLabel,
                }}
                inputProps={{ min: 1 }}
                error={
                  errors.maxQtyStudents && touched.maxQtyStudents ? true : false
                }
                helperText={
                  errors.maxQtyStudents && touched.maxQtyStudents
                    ? errors.maxQtyStudents
                    : ''
                }
                FormHelperTextProps={{
                  className: globalClasses.formHelperText,
                }}
              />

              <MuiPickersUtilsProvider utils={MomentUtils} locale={'pt-br'}>
                <DateTimePicker
                  id="selectedBeginDateTime"
                  label="Começa em"
                  format="DD/MM/YYYY HH:mm"
                  margin="normal"
                  minDate={Date.now()}
                  value={selectedBeginDateTime}
                  onChange={value => {
                    setFieldValue('selectedBeginDateTime', value);
                  }}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                  inputVariant="outlined"
                  cancelLabel="Cancelar"
                  okLabel="Confirmar"
                  error={errors && errors.selectedBeginDateTime ? true : false}
                  helperText={errors.selectedBeginDateTime || ''}
                  FormHelperTextProps={{
                    className: globalClasses.formHelperText,
                  }}
                />

                <DateTimePicker
                  id="selectedEndDateTime"
                  label="Termina em"
                  format="DD/MM/YYYY HH:mm"
                  margin="normal"
                  minDate={Date.now()}
                  value={selectedEndDateTime}
                  onChange={value => {
                    setFieldValue('selectedEndDateTime', value);
                  }}
                  className={globalClasses.textField}
                  InputLabelProps={{
                    className: globalClasses.inputLabel,
                  }}
                  inputVariant="outlined"
                  cancelLabel="Cancelar"
                  okLabel="Confirmar"
                  error={errors && errors.selectedEndDateTime ? true : false}
                  helperText={errors.selectedEndDateTime || ''}
                  FormHelperTextProps={{
                    className: globalClasses.formHelperText,
                  }}
                />
              </MuiPickersUtilsProvider>

              <TextField
                id="contactPhone"
                label="Número para contato"
                type="number"
                variant="outlined"
                value={contactPhone}
                onChange={handleChange}
                onBlur={handleBlur}
                className={globalClasses.textField}
                InputLabelProps={{
                  className: globalClasses.inputLabel,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                inputProps={{ min: 0 }}
                error={
                  errors.contactPhone && touched.contactPhone ? true : false
                }
                helperText={
                  errors.contactPhone && touched.contactPhone
                    ? errors.contactPhone
                    : ''
                }
                FormHelperTextProps={{
                  className: globalClasses.formHelperText,
                }}
              />

              <TextField
                id="eventPrice"
                label="Valor"
                type="number"
                variant="outlined"
                value={eventPrice}
                onChange={handleChange}
                onBlur={handleBlur}
                className={globalClasses.textField}
                InputLabelProps={{
                  className: globalClasses.inputLabel,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">R$</InputAdornment>
                  ),
                }}
                inputProps={{ min: 0, step: '.01' }}
              />
            </div>

            {/* Step Control Buttons */}
            <ContainerActionButtons>
              <ActionButtons>
                <div>
                  <Button
                    color="secondary"
                    variant="outlined"
                    onClick={handleBack}
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
                    Próximo
                  </Button>
                </div>
              </ActionButtons>
            </ContainerActionButtons>
          </SForm>
        );
      }}
    </Formik>
  );
};

FirstStepForm.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default FirstStepForm;
