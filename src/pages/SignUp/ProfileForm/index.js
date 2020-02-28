import React from 'react';
import PropTypes from 'prop-types';
import StepNavigator from '../StepNavigator';
import {
  SContainer,
  SToggleButton,
  SToggleButtonGroup,
  SPanel,
} from './styles';

const ProfileForm = props => {
  const { createUser, setCreateUser, currentStep, setCurrentStep } = props;

  const isStudent = createUser.profileType === 'STUDENT';

  const handleClick = async profileType => {
    await setCreateUser({ ...createUser, profileType });
    // setTimeout(() => {
    //   setCurrentStep(2);
    // }, 600);
  };

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
        <h1>Olá! Vamos criar a sua conta?</h1>
        <p>Primeiro precisamos saber se você é um Personal ou um Estudante.</p>
        <p>Por favor, selecione uma das opções abaixo:</p>
        <SToggleButtonGroup>
          <SToggleButton
            style={getToggleStyle(isStudent)}
            onClick={() => handleClick('STUDENT')}
          >
            <p style={getTextStyle(isStudent)}>ESTUDANTE</p>
          </SToggleButton>
          <SToggleButton
            style={getToggleStyle(!isStudent)}
            onClick={() => handleClick('PERSONAL')}
          >
            <p style={getTextStyle(!isStudent)}>PERSONAL</p>
          </SToggleButton>
        </SToggleButtonGroup>

        <StepNavigator
          buttonNames={['VOLTAR', 'PRÓXIMO']}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </SPanel>
    </SContainer>
  );
};

ProfileForm.propTypes = {
  createUser: PropTypes.object.isRequired,
  setCreateUser: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
};

export default ProfileForm;
