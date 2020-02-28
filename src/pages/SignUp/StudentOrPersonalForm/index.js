import React from 'react';
import { Formik } from 'formik';
import YupSchema, { email, password } from '../../validators';
import PropTypes from 'prop-types';
import { SWrapperFormik, SPanel, SInputGroup } from './styles';
import SForm from '../../../components/Form';
import SLabel from '../../../components/Label';
import SInput from '../../../components/Input';
import StepNavigator from '../StepNavigator';

// Yup Fields Schema
const StudentOrPersonalSchema = YupSchema({
  email,
  password,
});

const StudentOrPersonalForm = props => {
  const { createUser, setCreateUser, currentStep, setCurrentStep } = props;

  return (
    <SWrapperFormik>
      <Formik
        initialValues={
          createUser.profileType === 'STUDENT'
            ? createUser.student
            : createUser.personal
        }
        onSubmit={values => {
          const user = values;

          if (createUser.profileType === 'STUDENT') {
            setCreateUser({ ...createUser, student: user });
          } else {
            setCreateUser({ ...createUser, personal: user });
          }

          setCurrentStep(currentStep + 1);
        }}
        validationSchema={StudentOrPersonalSchema}
      >
        {({ values, ...formikProps }) => {
          const user = values;
          const { handleChange, handleSubmit, handleBlur } = formikProps;
          const { errors, touched } = formikProps;

          return (
            <SForm onSubmit={handleSubmit}>
              <article>
                <h1 style={{ color: 'white' }}>
                  Hey! Queremos te conhecer melhor...
                </h1>
                <p style={{ color: 'white' }}>
                  Poderia nos dizer quem é você? ;)
                </p>
              </article>
              <SPanel>
                {createUser.profileType === 'PERSONAL' ? (
                  <SInputGroup>
                    <SLabel htmlFor="cref">CREF</SLabel>
                    <SInput
                      id="cref"
                      type="text"
                      name="cref"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={user.cref}
                      maxLength="11"
                      width="90px"
                      autoFocus
                    />
                    {errors.cref && touched.cref && errors.cref}
                  </SInputGroup>
                ) : null}
                <SInputGroup>
                  <SLabel htmlFor="name">Nome</SLabel>
                  <SInput
                    id="name"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={user.name}
                    autoFocus={createUser.profileType === 'STUDENT'}
                    maxLength="140"
                  />
                  {errors.name && touched.name && errors.name}
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="phone">Celular</SLabel>
                  <SInput
                    id="phone"
                    type="text"
                    name="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={user.phone}
                    maxLength="15"
                    width="105px"
                  />
                  {errors.phone && touched.phone && errors.phone}
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="cpf">CPF</SLabel>
                  <SInput
                    id="cpf"
                    type="text"
                    name="cpf"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={user.cpf}
                    maxLength="14"
                    width="110px"
                  />
                  {errors.cpf && touched.cpf && errors.cpf}
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="gender">Gênero</SLabel>
                  {/* Será um ToggleButton */}
                  <SInput
                    id="gender"
                    type="text"
                    name="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={user.gender}
                  />
                  {errors.gender && touched.gender && errors.gender}
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="birthdate">Data de Nascimento</SLabel>
                  <SInput
                    id="birthdate"
                    type="date"
                    name="birthdate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={user.birthdate}
                    width="130px"
                  />
                  {errors.birthdate && touched.birthdate && errors.birthdate}
                </SInputGroup>
                <SInputGroup>
                  <SLabel htmlFor="email">Email</SLabel>
                  <SInput
                    id="email"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={user.email}
                    maxLength="140"
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
                    value={user.password}
                    maxLength="30"
                  />
                  {errors.password && touched.password && errors.password}
                </SInputGroup>
                <StepNavigator
                  buttonNames={['VOLTAR', 'PRÓXIMO']}
                  currentStep={currentStep}
                  setCurrentStep={setCurrentStep}
                  typeSubmit
                />
              </SPanel>
            </SForm>
          );
        }}
      </Formik>
    </SWrapperFormik>
  );
};

StudentOrPersonalForm.propTypes = {
  createUser: PropTypes.object.isRequired,
  setCreateUser: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default StudentOrPersonalForm;
