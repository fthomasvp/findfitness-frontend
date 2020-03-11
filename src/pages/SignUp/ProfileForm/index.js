import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  SContainer,
  SToggleButton,
  SToggleButtonGroup,
  SPanel,
} from './styles';
import SButton from '../../../components/Button';
import { updateProfileType } from '../../../store/ducks/SignUp';

const ProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { profileType } = useSelector(state => state.signUp.userToCreate);

  const [profileTypeForm, setProfileTypeForm] = useState(profileType);

  const handleToggleProfileType = profileTypeForm => setProfileTypeForm(profileTypeForm);

  const handleClickNextButton = () => {
    dispatch(updateProfileType(profileTypeForm));

    history.push('/signup/userform');
  };

  const isStudent = profileTypeForm === 'STUDENT';

  const getToggleStyle = isStudent =>
    isStudent ? { backgroundColor: '#10097a' } : {};

  const getTextStyle = isStudent => ({
    fontWeight: 'bold',
    fontSize: 16,
    color: isStudent ? '#fff' : '#bbb',
  });

  return (
    <SContainer>
      <SPanel>
        <h1 style={{ color: 'white', alignSelf: 'center' }}>
          Olá! Vamos criar a sua conta?
        </h1>
        <p style={{ color: 'white', alignSelf: 'center' }}>
          Primeiro precisamos saber se você é um Personal ou um Estudante.
        </p>
        <p style={{ color: 'white', alignSelf: 'center' }}>
          Por favor, selecione uma das opções abaixo:
        </p>

        <SToggleButtonGroup>
          <SToggleButton
            style={getToggleStyle(isStudent)}
            onClick={() => handleToggleProfileType('STUDENT')}
          >
            <p style={getTextStyle(isStudent)}>ESTUDANTE</p>
          </SToggleButton>
          <SToggleButton
            style={getToggleStyle(!isStudent)}
            onClick={() => handleToggleProfileType('PERSONAL')}
          >
            <p style={getTextStyle(!isStudent)}>PERSONAL</p>
          </SToggleButton>
        </SToggleButtonGroup>

        <div
          style={{
            width: '100%',
            height: '100px',
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <SButton width="40%" onClick={() => history.goBack()}>
            VOLTAR
          </SButton>
          <SButton
            width="40%"
            backgroundColor="blue"
            onClick={() => handleClickNextButton()}
          >
            PRÓXIMO
          </SButton>
        </div>
      </SPanel>
    </SContainer>
  );
};

export default ProfileForm;
