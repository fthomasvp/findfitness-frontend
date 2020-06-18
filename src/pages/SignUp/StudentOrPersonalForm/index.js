import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import Divider from '@material-ui/core/Divider';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import {
  storePersonForm,
  handleBackStep,
  handleNextStep,
} from '../../../store/ducks/Auth';
import YupSchema, {
  errorMessages,
  email,
  password,
  name,
  birthdate,
} from '../../validators';
import * as S from '../styles';
import SForm from '../../../components/Form';

/**
 * Yup Fields Schema
 */
const StudentOrPersonalSchema = YupSchema({
  email,
  password,
  name,
  birthdate,
});

const StudentOrPersonalForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userToCreate } = useSelector(state => state.auth);
  const { gender } =
    userToCreate && userToCreate.profileType === 'STUDENT'
      ? userToCreate.student
      : userToCreate.personal;

  /**
   * Obtém o "gender" salvo na Store e o
   * referencia no useState da Tab
   */
  const _getSelectedTab = gender => {
    if (!gender || gender === 'F') {
      return 0;
    } else if (gender === 'M') {
      return 1;
    } else {
      return 2;
    }
  };

  const [tab, setTab] = React.useState(_getSelectedTab(gender));

  const [userGender, setUserGender] = useState(gender);

  const handleChangeTab = (event, tabValue) => {
    setTab(tabValue);

    if (tabValue === 0) {
      setUserGender('F');
    } else if (tabValue === 1) {
      setUserGender('M');
    } else {
      setUserGender('O');
    }
  };

  const [toggleVisibilityIcon, setToggleVisibilityIcon] = useState(false);

  /**
   * Stepper Info
   */
  const { activeStep, steps } = useSelector(state => state.auth);

  const handleNext = () => dispatch(handleNextStep(activeStep));

  const handleBack = () => dispatch(handleBackStep(activeStep));

  return (
    <Container maxWidth="sm" style={{ alignSelf: 'center' }}>
      <Paper>
        <Formik
          initialValues={
            userToCreate.profileType === 'STUDENT'
              ? userToCreate.student
              : userToCreate.personal
          }
          onSubmit={values => {
            const person = { ...values, gender: userGender };

            dispatch(storePersonForm(person));

            handleNext();

            history.push('/signup/addressform');
          }}
          validationSchema={StudentOrPersonalSchema}
          validate={values => {
            const { cpf, phone, cref, validCref } = values;
            const {
              requiredNumericField,
              specialCharactersField,
            } = errorMessages;
            const errors = {};

            if (!cpf) {
              errors.cpf = requiredNumericField;
            } else if (/\D/.test(cpf)) {
              errors.cpf = specialCharactersField;
            } else if (cpf.replace(/\D/, '').length !== 11) {
              errors.cpf = 'Não possui 11 dígitos';
            }

            if (!phone) {
              errors.phone = requiredNumericField;
            } else if (/\D/.test(phone)) {
              errors.phone = specialCharactersField;
            } else if (phone.replace(/\D/, '').length !== 11) {
              errors.phone = 'Não possui 11 dígitos';
            }

            if (userToCreate.profileType === 'PERSONAL') {
              if (!cref) {
                errors.cref = 'Preencha o campo';
              } else if (cref.length !== 11) {
                errors.cref = 'Deve conter 11 caracteres';
              } else if (!/^[0-9]{6}-[A-Z]{1}\/[A-Z]{2}/gm.test(cref)) {
                errors.cref = 'Precisa seguir o padrão: 000000-X/XX';
              } else if (!validCref) {
                errors.cref = 'CREF não está registrado na CONFEF';
              }
            }

            return errors;
          }}
        >
          {({ values, ...formikProps }) => {
            const {
              birthdate,
              cpf,
              cref,
              email,
              name,
              password,
              phone,
            } = values;

            const {
              setFieldError,
              setFieldValue,
              handleChange,
              handleSubmit,
              handleBlur,
              touched,
              errors,
            } = formikProps;

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

                  <Divider style={{ marginBottom: '10px' }} />

                  <S.PanelContent>
                    <S.PanelTitle>
                      <Typography variant="h5" align="center">
                        Hey! Queremos te conhecer{' '}
                        <span role="img" aria-label="Blink emoction">
                          &#128521;
                        </span>
                      </Typography>
                    </S.PanelTitle>

                    {userToCreate.profileType === 'PERSONAL' && (
                      <TextField
                        autoFocus
                        id="cref"
                        label="CREF"
                        variant="outlined"
                        value={cref}
                        onChange={handleChange}
                        onBlur={evt => {
                          if (/^[0-9]{6}-[A-Z]{1}\/[A-Z]{2}/gm.test(cref)) {
                            fetch(
                              // eslint-disable-next-line no-undef
                              `${process.env.REACT_APP_AXIOS_BASE_URL}/personals/search?cref=${cref}`
                            )
                              .then(response => {
                                return response.status;
                              })
                              .then(status => {
                                if (status !== 200) {
                                  setFieldError(
                                    'cref',
                                    'CREF não está registrado na CONFEF'
                                  );

                                  setFieldValue('validCref', false);
                                } else {
                                  setFieldValue('validCref', true);
                                }
                              });
                          }

                          handleBlur(evt);
                        }}
                        InputLabelProps={{
                          style: { color: 'white', fontSize: '1.2rem' },
                        }}
                        style={{
                          marginBottom: '20px',
                          width: '40%',
                        }}
                        error={errors.cref && touched.cref ? true : false}
                        helperText={
                          errors.cref && touched.cref ? errors.cref : ''
                        }
                        FormHelperTextProps={{
                          style: { fontSize: '1.1rem' },
                        }}
                      />
                    )}

                    <TextField
                      autoFocus={userToCreate.profileType === 'STUDENT'}
                      id="name"
                      label="Nome"
                      variant="outlined"
                      value={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px' }}
                      error={errors.name && touched.name ? true : false}
                      helperText={
                        errors.name && touched.name ? errors.name : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />

                    <TextField
                      id="phone"
                      label="Celular"
                      variant="outlined"
                      value={phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px', width: '140px' }}
                      error={errors.phone && touched.phone ? true : false}
                      helperText={
                        errors.phone && touched.phone ? errors.phone : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />

                    <TextField
                      id="cpf"
                      label="CPF"
                      variant="outlined"
                      value={cpf}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px', width: '160px' }}
                      error={errors.cpf && touched.cpf ? true : false}
                      helperText={errors.cpf && touched.cpf ? errors.cpf : ''}
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />

                    <Typography
                      variant="body1"
                      style={{
                        marginBottom: '5px',
                        marginLeft: '13px',
                        fontSize: '1.2rem',
                      }}
                    >
                      Gênero
                    </Typography>
                    <AppBar
                      position="relative"
                      color="transparent"
                      style={{ marginBottom: '20px' }}
                    >
                      <Tabs
                        value={tab}
                        onChange={handleChangeTab}
                        indicatorColor="primary"
                        centered
                      >
                        <Tab label="FEMININO" />
                        <Tab label="MASCULINO" />
                        <Tab label="OUTRO" />
                      </Tabs>
                    </AppBar>

                    <MuiPickersUtilsProvider utils={MomentUtils}>
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          marginBottom: '20px',
                        }}
                      >
                        <div>
                          <DatePicker
                            id="birthdate"
                            label="Data de Nascimento"
                            format="DD/MM/YYYY"
                            margin="normal"
                            size="medium"
                            value={birthdate}
                            onChange={value => {
                              setFieldValue('birthdate', value);
                            }}
                            InputLabelProps={{
                              style: { color: 'white', fontSize: '1.2rem' },
                            }}
                            error={
                              errors.birthdate && touched.birthdate
                                ? true
                                : false
                            }
                            helperText={
                              errors.birthdate && touched.birthdate
                                ? errors.birthdate
                                : ''
                            }
                            FormHelperTextProps={{
                              style: {
                                width: 'max-content',
                                fontSize: '1.1rem',
                              },
                            }}
                          />
                        </div>
                      </div>
                    </MuiPickersUtilsProvider>

                    <TextField
                      id="email"
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '20px' }}
                      error={errors.email && touched.email ? true : false}
                      helperText={
                        errors.email && touched.email ? errors.email : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />

                    <TextField
                      id="password"
                      label="Senha"
                      type={toggleVisibilityIcon ? 'text' : 'password'}
                      variant="outlined"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {!toggleVisibilityIcon ? (
                              <IconButton
                                aria-label="show password text"
                                onClick={() => setToggleVisibilityIcon(true)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                aria-label="hide password text"
                                onClick={() => setToggleVisibilityIcon(false)}
                              >
                                <VisibilityOffIcon />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      style={{ marginBottom: '20px' }}
                      error={errors.password && touched.password ? true : false}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem' },
                      }}
                    />
                  </S.PanelContent>

                  <S.PanelActions>
                    <Button
                      color="secondary"
                      onClick={() => {
                        handleBack();

                        history.goBack();
                      }}
                    >
                      Voltar
                    </Button>
                    <Button color="primary" variant="contained" type="submit">
                      Próximo
                    </Button>
                  </S.PanelActions>
                </S.Panel>
              </SForm>
            );
          }}
        </Formik>
      </Paper>
    </Container>
  );
};

export default StudentOrPersonalForm;
