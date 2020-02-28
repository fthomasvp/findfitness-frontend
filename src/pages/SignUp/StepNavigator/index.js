import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SButton from '../../../components/Button';

const StepNavigator = props => {
  const history = useHistory();

  const { currentStep, setCurrentStep, buttonNames } = props;
  const { typeSubmit } = props;

  const nextStep = () => setCurrentStep(currentStep + 1);

  const goBack = () =>
    currentStep <= 1 ? history.goBack() : setCurrentStep(currentStep - 1);

  return (
    <>
      <SButton type="button" onClick={goBack}>
        {buttonNames[0]}
      </SButton>
      {typeSubmit ? (
        <SButton type="submit">{buttonNames[1]}</SButton>
      ) : (
        <SButton onClick={nextStep}>{buttonNames[1]}</SButton>
      )}
    </>
  );
};

StepNavigator.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  buttonNames: PropTypes.array.isRequired,
  typeSubmit: PropTypes.bool,
};

export default StepNavigator;
