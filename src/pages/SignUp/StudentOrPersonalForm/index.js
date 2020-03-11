import React, { useState } from 'react';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updatePersonForm } from '../../../store/ducks/SignUp';
// import YupSchema, { email, password } from '../../validators';
import {
  SWrapperFormik,
  SPanel,
  SInputGroup,
  SToggleButtonGroup,
  SToggleButton,
} from './styles';
import SForm from '../../../components/Form';
import SLabel from '../../../components/Label';
import SInput from '../../../components/Input';
import SButton from '../../../components/Button';

// Yup Fields Schema
// const StudentOrPersonalSchema = YupSchema({
//   email,
//   password,
// });

const StudentOrPersonalForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { userToCreate } = useSelector(state => state.signUp);

  const [genderForm, setGenderForm] = useState('M');
  const [genderStyles, setGenderStyles] = useState([
    {
      type: 'M',
      isSelected: true,
      toggleStyle: { backgroundColor: '#10097a' },
      textStyle: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff',
      },
    },
    {
      type: 'F',
      isSelected: false,
      toggleStyle: {},
      textStyle: {},
    },
    {
      type: 'I',
      isSelected: false,
      toggleStyle: {},
      textStyle: {},
    },
  ]);

  /**
   * ToggleGender
   */
  const handleToggleGender = genderForm => {
    const newGenderStyles = genderStyles.map(gender => {
      if (gender.type === genderForm) {
        const toggleStyleToApply = { backgroundColor: '#10097a' };
        const textStyleToApply = {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#fff',
        };

        gender.isSelected = true;
        gender.toggleStyle = toggleStyleToApply;
        gender.textStyle = textStyleToApply;
      } else {
        gender.isSelected = false;
        gender.toggleStyle = {};
        gender.textStyle = {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#bbb',
        };
      }

      return gender;
    });

    setGenderForm(genderForm);
    setGenderStyles(newGenderStyles);
  };

  return (
    <SWrapperFormik>
      <Formik
        initialValues={
          userToCreate.profileType === 'STUDENT'
            ? userToCreate.student
            : userToCreate.personal
        }
        onSubmit={values => {
          const person = { ...values, gender: genderForm };

          dispatch(updatePersonForm(person));

          history.push('/signup/addressform');
        }}
        // validationSchema={StudentOrPersonalSchema}
      >
        {({ values, ...formikProps }) => {
          const user = values;
          const { handleChange, handleSubmit, handleBlur } = formikProps;
          const { errors, touched } = formikProps;

          return (
            <SForm onSubmit={handleSubmit} style={{ alignItems: 'center' }}>
              <h1 style={{ color: 'white', alignSelf: 'center' }}>
                Hey! Queremos te conhecer melhor...
              </h1>
              <h3 style={{ color: 'white', alignSelf: 'center' }}>
                Poderia nos contar um pouco mais sobre você?
              </h3>

              <SPanel>
                {userToCreate.profileType === 'PERSONAL' ? (
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
                    autoFocus={userToCreate.profileType === 'STUDENT'}
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

                  <SToggleButtonGroup>
                    <SToggleButton
                      width="33%"
                      type="button"
                      style={
                        genderStyles[0].isSelected
                          ? genderStyles[0].toggleStyle
                          : {}
                      }
                      onClick={() => handleToggleGender('M')}
                    >
                      <p
                        style={
                          genderStyles[0].isSelected
                            ? genderStyles[0].textStyle
                            : {
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#bbb',
                              }
                        }
                      >
                        MASCULINO
                      </p>
                    </SToggleButton>
                    <SToggleButton
                      width="33%"
                      type="button"
                      style={
                        genderStyles[1].isSelected
                          ? genderStyles[1].toggleStyle
                          : {}
                      }
                      onClick={() => handleToggleGender('F')}
                    >
                      <p
                        style={
                          genderStyles[1].isSelected
                            ? genderStyles[1].textStyle
                            : {
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#bbb',
                              }
                        }
                      >
                        FEMININO
                      </p>
                    </SToggleButton>
                    <SToggleButton
                      width="33%"
                      type="button"
                      style={
                        genderStyles[2].isSelected
                          ? genderStyles[2].toggleStyle
                          : {}
                      }
                      onClick={() => handleToggleGender('I')}
                    >
                      <p
                        style={
                          genderStyles[2].isSelected
                            ? genderStyles[2].textStyle
                            : {
                                fontWeight: 'bold',
                                fontSize: 16,
                                color: '#bbb',
                              }
                        }
                      >
                        INTERSEXO
                      </p>
                    </SToggleButton>
                  </SToggleButtonGroup>
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

                <div
                  style={{
                    width: '100%',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <SButton
                    width="40%"
                    type="button"
                    onClick={() => history.goBack()}
                  >
                    VOLTAR
                  </SButton>
                  <SButton width="40%" backgroundColor="blue" type="submit">
                    PRÓXIMO
                  </SButton>
                </div>
              </SPanel>
            </SForm>
          );
        }}
      </Formik>
    </SWrapperFormik>
  );
};

export default StudentOrPersonalForm;
