import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import Container from '@material-ui/core/Container';

import * as AuthReducer from '../../store/ducks/auth';
import YupSchema, { email, password } from '../validators';
import * as S from './styles';
import STextLink from '../../components/TextLink';
import SForm from '../../components/Form';
import Alert from '../../components/Alert';
import Footer from '../../components/Footer';
import { useGlobalStyles } from '../../global/styles';
import FindFitnessLogo from '../../assets/images/findfitness_logo.png';

// Yup Fields Schema
const SignInSchema = YupSchema({
  email,
  password,
});

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const globalClasses = useGlobalStyles();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [toggleVisibilityIcon, setToggleVisibilityIcon] = useState(false);

  /**
   * Alert
   */
  const error = useSelector(state => state.auth.error);
  const response = useSelector(state => state.auth.response);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setOpenAlert(false);
    setAlertMessage('');
    setGrowTransition(false);

    dispatch(AuthReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    // Unmount component
    if (isAuthenticated) {
      return history.replace('/home');
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    // Display snackbar Error message
    if (error && error.status !== 200) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    // Display when User was created with success
    // Because SignUp page, when ended with success,
    // returns to this page (SignIn)
    if (response && response.status === 201) {
      setAlertMessage('Usuário criado com sucesso!');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');
    }
  }, [error, response]);

  return (
    <Container
      maxWidth="sm"
      style={{
        alignSelf: 'center',
      }}
    >
      <Paper style={{ backgroundColor: '#08041f' }}>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={({ email, password }) => {
            dispatch(AuthReducer.signInRequest(email, password));
          }}
          validationSchema={SignInSchema}
          validateOnChange={false}
        >
          {({ values, ...formikProps }) => {
            const { email, password } = values;
            const {
              handleChange,
              handleSubmit,
              handleBlur,
              errors,
              touched,
            } = formikProps;

            return (
              <SForm onSubmit={handleSubmit}>
                <S.Panel>
                  <S.PanelTitle>
                    <img
                      src={FindFitnessLogo}
                      alt="FindFitness_Logo"
                      style={{
                        width: '300px',
                        height: '70px',
                        display: 'flex',
                        alignSelf: 'center',
                      }}
                    />
                  </S.PanelTitle>

                  <S.PanelContent>
                    <TextField
                      data-test="email-input"
                      id="email"
                      autoFocus
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={globalClasses.textField}
                      InputLabelProps={{
                        className: globalClasses.inputLabel,
                      }}
                      InputProps={{
                        style: {
                          color: '#fafafa',
                        },
                      }}
                      error={errors.email && touched.email ? true : false}
                      helperText={
                        errors.email && touched.email ? errors.email : ''
                      }
                      FormHelperTextProps={{
                        className: globalClasses.formHelperText,
                      }}
                    />

                    <TextField
                      data-test="password-input"
                      id="password"
                      label="Senha"
                      type={toggleVisibilityIcon ? 'text' : 'password'}
                      variant="outlined"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={globalClasses.textField}
                      InputLabelProps={{
                        className: globalClasses.inputLabel,
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {!toggleVisibilityIcon ? (
                              <IconButton
                                aria-label="show password text"
                                onClick={() => setToggleVisibilityIcon(true)}
                              >
                                <VisibilityIcon color="primary" />
                              </IconButton>
                            ) : (
                              <IconButton
                                aria-label="hide password text"
                                onClick={() => setToggleVisibilityIcon(false)}
                              >
                                <VisibilityOffIcon color="primary" />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                        style: {
                          color: '#fafafa',
                        },
                      }}
                      error={errors.password && touched.password ? true : false}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : ''
                      }
                      FormHelperTextProps={{
                        className: globalClasses.formHelperText,
                      }}
                    />
                    <Button
                      data-test="submit-button"
                      type="submit"
                      color="primary"
                      variant="contained"
                      size="large"
                      title="Acessar conta"
                      className={globalClasses.primaryButton}
                    >
                      Acessar conta
                    </Button>
                  </S.PanelContent>

                  <S.PanelActions>
                    <STextLink to="/signup" color="#3b9eff">
                      Crie uma conta gratuita
                    </STextLink>
                  </S.PanelActions>
                </S.Panel>
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
      </Paper>

      <Footer />
    </Container>
  );
};

export default SignIn;
