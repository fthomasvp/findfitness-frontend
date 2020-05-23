import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Formik } from 'formik';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { signInRequest } from '../../store/ducks/Auth';
import YupSchema, { email, password } from '../validators';
import {
  SContainer,
  SPanel,
  SPanelTitle,
  SPanelContent,
  SPanelActions,
} from './styles';
import STextLink from '../../components/TextLink';
import SForm from '../../components/Form';
import OxentechLogo from '../../assets/images/oxentech_logo.png';

// Yup Fields Schema
const SignInSchema = YupSchema({
  email,
  password,
});

const SignIn = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    // Unmount component
    if (isAuthenticated) {
      return history.replace('/studentgroup');
    }
  }, [history, isAuthenticated]);

  return (
    <SContainer>
      <Paper>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={({ email, password }) => {
            dispatch(signInRequest(email, password));
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
                <SPanel>
                  <SPanelTitle>
                    <img
                      src={OxentechLogo}
                      alt="FindFitness_Logo"
                      style={{
                        width: '300px',
                        height: '70px',
                        display: 'flex',
                        alignSelf: 'center',
                      }}
                    />
                  </SPanelTitle>

                  <SPanelContent>
                    <TextField
                      id="email"
                      autoFocus
                      label="Email"
                      type="email"
                      variant="outlined"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '40px' }}
                      error={errors.email && touched.email ? true : false}
                      helperText={
                        errors.email && touched.email ? errors.email : ''
                      }
                      FormHelperTextProps={{
                        style: { width: 'max-content', fontSize: '1.1rem' },
                      }}
                    />

                    <TextField
                      id="password"
                      label="Senha"
                      type="password"
                      variant="outlined"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { color: 'white', fontSize: '1.2rem' },
                      }}
                      style={{ marginBottom: '40px' }}
                      error={errors.password && touched.password ? true : false}
                      helperText={
                        errors.password && touched.password
                          ? errors.password
                          : ''
                      }
                      FormHelperTextProps={{
                        style: { width: 'max-content', fontSize: '1.1rem' },
                      }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                      Acessar conta
                    </Button>
                  </SPanelContent>

                  <SPanelActions>
                    <STextLink to="/signup">Crie uma conta gratuita</STextLink>
                  </SPanelActions>
                </SPanel>
              </SForm>
            );
          }}
        </Formik>
      </Paper>
    </SContainer>
  );
};

export default SignIn;
