import React, { useState, useEffect } from 'react';
import { Formik, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { storePersonForm } from '../../../store/ducks/Auth';
import YupSchema, {
  errorMessages,
  email,
  password,
  name,
  birthdate,
} from '../../validators';
import {
  SContainer,
  SPanel,
  SInputGroup,
  SToggleButtonGroup,
  SToggleButton,
} from './styles';
import SForm from '../../../components/Form';
import SLabel from '../../../components/Label';
import SInput from '../../../components/Input';
import SButton from '../../../components/Button';
import SErrorMessageInput from '../../../components/Form/ErrorMessageInput';

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

  const [genderForm, setGenderForm] = useState(gender);
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
      type: 'O',
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

  useEffect(() => {
    handleToggleGender(gender);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gender]);

  return (
    <SContainer>
      <Formik
        initialValues={
          userToCreate.profileType === 'STUDENT'
            ? userToCreate.student
            : userToCreate.personal
        }
        onSubmit={values => {
          const person = { ...values, gender: genderForm };

          dispatch(storePersonForm(person));

          history.push('/signup/addressform');
        }}
        validationSchema={StudentOrPersonalSchema}
        validate={values => {
          const { cpf, phone, cref } = values;
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
              errors.cref = 'Precisa seguir o seguinte padrão: 000000-X/XX';
            }
          }

          return errors;
        }}
      >
        {({ values, ...formikProps }) => {
          const user = values;
          const { handleChange, handleSubmit, handleBlur } = formikProps;

          return (
            <SForm
              onSubmit={handleSubmit}
              style={{ height: '100%', alignItems: 'center' }}
            >
              <h2 style={{ margin: 0, color: 'white', alignSelf: 'center' }}>
                Hey! Queremos te conhecer melhor...
              </h2>

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
                      width="120px"
                      autoFocus
                    />
                    <ErrorMessage
                      name="cref"
                      render={message => (
                        <SErrorMessageInput message={message} />
                      )}
                    />
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
                  <ErrorMessage
                    name="name"
                    render={message => <SErrorMessageInput message={message} />}
                  />
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
                    maxLength="11"
                    width="115px"
                  />
                  <ErrorMessage
                    name="phone"
                    render={message => <SErrorMessageInput message={message} />}
                  />
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
                    maxLength="11"
                    width="120px"
                  />
                  <ErrorMessage
                    name="cpf"
                    render={message => <SErrorMessageInput message={message} />}
                  />
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
                      onClick={() => handleToggleGender('O')}
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
                        OUTRO
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
                    width="135px"
                  />
                  <ErrorMessage
                    name="birthdate"
                    render={message => <SErrorMessageInput message={message} />}
                  />
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
                  <ErrorMessage
                    name="email"
                    render={message => <SErrorMessageInput message={message} />}
                  />
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
                  <ErrorMessage
                    name="password"
                    render={message => <SErrorMessageInput message={message} />}
                  />
                </SInputGroup>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <SButton
                    width="33%"
                    type="button"
                    onClick={() => history.goBack()}
                  >
                    VOLTAR
                  </SButton>
                  <SButton width="33%" background="#46c787" type="submit">
                    PRÓXIMO
                  </SButton>
                </div>
              </SPanel>
            </SForm>
          );
        }}
      </Formik>
    </SContainer>
  );
};

export default StudentOrPersonalForm;
