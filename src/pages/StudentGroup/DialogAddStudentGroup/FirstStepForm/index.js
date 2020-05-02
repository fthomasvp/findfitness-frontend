import React from 'react';
import { Formik } from 'formik';
import SForm from '../../../../components/Form';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

// Importante !
// Mínimo de 3 pessoas | Máximo de 10 pessoas
// Quando: 08/06/2020 - 17:30
// Valor: R$120

const FirstStepForm = ({ activeStep, handleBack, handleNext }) => {
  return (
    <Formik
      initialValues={{
        minQtyStudents: 1,
        maxQtyStudents: 100,
        eventPrice: 0,
        selectedDate: Date.now(),
      }}
      onSubmit={({
        minQtyStudents,
        maxQtyStudents,
        eventPrice,
        selectedDate,
      }) => {
        console.log(minQtyStudents, maxQtyStudents, eventPrice, selectedDate);
      }}
      // validationSchema={SignInSchema}
    >
      {({ values, ...formikProps }) => {
        const { handleChange, handleSubmit, handleBlur } = formikProps;
        const { minQtyStudents, maxQtyStudents, eventPrice, selectedDate } = values;
        const { errors, touched } = formikProps;

        return (
          <SForm onSubmit={handleSubmit}>
            <TextField
              id="minQtyStudents"
              label="Quantidade mínima de pessoas"
              type="number"
              variant="outlined"
              value={minQtyStudents}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
            />
            <TextField
              id="maxQtyStudents"
              label="Quantidade máxima de pessoas"
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
                }}
              >
                <div>
                  <KeyboardDatePicker
                    disableToolbar
                    format="DD/MM/YYYY"
                    margin="normal"
                    size="small"
                    id="date-picker-inline"
                    label="Data"
                    value={selectedDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    InputLabelProps={{ style: { color: 'white' } }}
                  />
                </div>
                <div>
                  <KeyboardTimePicker
                    margin="normal"
                    size="small"
                    id="time-picker"
                    label="Hora"
                    value={selectedDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    InputLabelProps={{ style: { color: 'white' } }}
                    KeyboardButtonProps={{
                      'aria-label': 'change time',
                    }}
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
