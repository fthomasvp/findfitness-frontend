import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Formik } from 'formik';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import SForm from '../../../../components/Form';
import { storeFirstStepForm } from '../../../../store/ducks/StudentGroup';

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
      // validationSchema={SignInSchema}
    >
      {({ values, ...formikProps }) => {
        const {
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
        } = formikProps;

        const {
          minQtyStudents,
          maxQtyStudents,
          selectedDateTime,
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
              style={{ marginBottom: '20px' }}
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
                  <KeyboardDatePicker
                    disableToolbar
                    id="selectedDateTime"
                    format="DD/MM/YYYY"
                    margin="normal"
                    size="small"
                    label="Data"
                    minDate={Date.now()}
                    value={selectedDateTime}
                    onChange={value => {
                      setFieldValue('selectedDateTime', value);
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                  />
                </div>
                <div>
                  <KeyboardTimePicker
                    id="selectedDateTime"
                    margin="normal"
                    size="small"
                    label="Hora"
                    value={selectedDateTime}
                    onChange={value => {
                      setFieldValue('selectedDateTime', value);
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
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

export default FirstStepForm;
