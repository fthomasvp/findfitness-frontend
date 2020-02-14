import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signInRequest } from '../../store/ducks/SignIn';
import YupSchema, { email, password } from '../validators';
import {
  SContainer,
  SForm,
  SInput,
  SInputGroup,
  SLabel,
  SPanel,
  SButton,
} from './styles';
import STextLink from '../../components/TextLink';
import logo from '../../assets/images/logo@3x.png';

// Yup Fields Schema
const SignInSchema = YupSchema({
  email,
  password,
});

const SignIn = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.signIn.isAuthenticated);
  const history = useHistory();

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
          validationSchema={SignInSchema}
        >
          {({ values, ...formikProps }) => {
            const { handleChange, handleSubmit, handleBlur } = formikProps;
            const { email, password } = values;
            const { errors, touched } = formikProps;

            return (
              <SForm onSubmit={handleSubmit}>
                <img
                  src={logo}
                  alt="FindFitness_Logo"
                  style={{
                    width: '100px',
                    height: '70px',
                    display: 'flex',
                    alignSelf: 'center',
                  }}
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
                  {errors.email && touched.email && errors.email}
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
                  {errors.password && touched.password && errors.password}
                </SInputGroup>

                <SButton type="submit">Acessar conta</SButton>

                <STextLink to="/signup">Crie uma conta gratuita</STextLink>
              </SForm>
            );
          }}
        </Formik>
      </SPanel>
    </SContainer>
  );
};

export default SignIn;
