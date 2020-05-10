import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import SForm from '../../../../components/Form';
import { storeFirstStepForm } from '../../../../store/ducks/StudentGroup';
import { errorMessages } from '../../../validators';
import Utils from '../../../../utils';

const FirstStepForm = ({ handleBack, handleNext }) => {
  const dispatch = useDispatch();

  const { activeStep, createStudentGroup } = useSelector(
    state => state.studentGroup
  );
  const { firstStepData } = createStudentGroup;

  return (
    <Formik
      initialValues={firstStepData}
      onSubmit={firstStepData => {
        dispatch(storeFirstStepForm(firstStepData));
        handleNext();
      }}
      validate={values => {
        const {
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

        return errors;
      }}
    >
      {({ values, ...formikProps }) => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          errors,
        } = formikProps;

        const {
          minQtyStudents,
          maxQtyStudents,
          selectedBeginDateTime,
          selectedEndDateTime,
          eventPrice,
        } = values;

        return (
          <SForm onSubmit={handleSubmit}>
            <TextField
              id="minQtyStudents"
              label="Quantidade mínima de alunos"
              type="number"
              variant="outlined"
              value={minQtyStudents}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ min: 1 }}
              style={{ marginBottom: '20px' }}
              error={errors && errors.minQtyStudents ? true : false}
              helperText={errors.minQtyStudents || ''}
            />
            <TextField
              id="maxQtyStudents"
              label="Quantidade máxima de alunos"
              type="number"
              variant="outlined"
              value={maxQtyStudents}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              inputProps={{ min: 1 }}
              error={errors && errors.maxQtyStudents ? true : false}
              helperText={errors.maxQtyStudents || ''}
            />

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <div
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <DateTimePicker
                    id="selectedBeginDateTime"
                    label="Começa em"
                    format="DD/MM/YYYY HH:mm"
                    margin="normal"
                    size="small"
                    minDate={Date.now()}
                    value={selectedBeginDateTime}
                    onChange={value => {
                      setFieldValue('selectedBeginDateTime', value);
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    error={
                      errors && errors.selectedBeginDateTime ? true : false
                    }
                    helperText={errors.selectedBeginDateTime || ''}
                  />
                </div>
                <div>
                  <DateTimePicker
                    id="selectedEndDateTime"
                    label="Termina em"
                    format="DD/MM/YYYY HH:mm"
                    margin="normal"
                    size="small"
                    minDate={Date.now()}
                    value={selectedEndDateTime}
                    onChange={value => {
                      setFieldValue('selectedEndDateTime', value);
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                    error={errors && errors.selectedEndDateTime ? true : false}
                    helperText={errors.selectedEndDateTime || ''}
                  />
                </div>
              </div>
            </MuiPickersUtilsProvider>
            <TextField
              id="eventPrice"
              label="Valor"
              type="number"
              variant="outlined"
              value={eventPrice}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">R$</InputAdornment>
                ),
              }}
              inputProps={{ min: 0 }}
              style={{ marginBottom: '20px' }}
            />

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
                  Próximo
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

FirstStepForm.propTypes = {
  handleBack: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default FirstStepForm;
