import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { signInRequest } from '../../store/ducks/SignIn';
import {
  SContainer,
  SForm,
  SInput,
  SInputGroup,
  SLabel,
  SPanel,
  SButton,
} from './styles';
import logo from '../../assets/images/logo@3x.png';
import PropTypes from 'prop-types';

const SignIn = props => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.signIn.isAuthenticated);
  const { history } = props;

  useEffect(() => {
    // Unmount component
    if (isAuthenticated) {
      return history.replace('/home');
    }
  });

  return (
    <SContainer>
      <SPanel>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={({ email, password }) => {
            dispatch(signInRequest(email, password));
          }}
          // validationSchema={schema({
          //   email: emailValidation,
          //   password: passwordValidation
          // })}
        >
          {({ values, ...formikProps }) => {
            const { handleChange, handleSubmit, handleBlur } = formikProps;
            const { email, password } = values;

            return (
              <SForm onSubmit={handleSubmit}>
                <img
                  src={logo}
                  alt="FindFitness_Logo"
                  style={{ backgroundColor: '#222' }}
                />
                <SInputGroup>
                  <SLabel htmlFor="email">Email</SLabel>
                  <SInput
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={email}
                  />
                  {/* {errors.email && touched.email && errors.email} */}
                </SInputGroup>

                <SInputGroup>
                  <SLabel htmlFor="password">Senha</SLabel>
                  <SInput
                    id="password"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={password}
                  />
                  {/* {errors.password && touched.password && errors.password} */}
                </SInputGroup>

                <SButton type="submit">Acessar</SButton>
              </SForm>
            );
          }}
        </Formik>
      </SPanel>
    </SContainer>
  );
};

SignIn.propTypes = {
  history: PropTypes.object.isRequired,
};

export default SignIn;
