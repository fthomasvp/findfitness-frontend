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
import { storeProfileType } from '../../../store/ducks/Auth';

const ProfileForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { profileType } = useSelector(state => state.auth.userToCreate);

  const [profileTypeForm, setProfileTypeForm] = useState(profileType);

  const handleToggleProfileType = profileTypeForm =>
    setProfileTypeForm(profileTypeForm);

  const handleClickNextButton = () => {
    dispatch(storeProfileType(profileTypeForm));

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
      <h2 style={{ margin: 0, color: 'white', alignSelf: 'center' }}>
        Olá, vamos criar a sua conta? <br />
      </h2>
      <h3 style={{ color: 'white', alignSelf: 'center' }}>
        Primeiro precisamos saber se você é um Personal ou um Estudante.
      </h3>
      <SPanel>
        <h4 style={{ color: 'white', alignSelf: 'center' }}>
          Por favor, selecione uma das opções abaixo:
        </h4>
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
            display: 'flex',
            justifyContent: 'space-evenly',
          }}
        >
          <SButton width="33%" onClick={() => history.goBack()}>
            VOLTAR
          </SButton>
          <SButton
            width="33%"
            background="#46c787"
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
