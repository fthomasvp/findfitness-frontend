import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import FirstStepForm from './FirstStepForm';
import ActivityStep from './ActivityStep';
import {
  handleNextStep,
  handleBackStep,
  createStudentGroupRequest,
  searchStudentGroupRequest,
} from '../../../store/ducks/StudentGroup';
import AddressStepForm from './AddressStepForm';
import { DialogTitle, DialogContent } from './styles';

const DialogAddStudentGroup = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { activeStep, createStudentGroup, pagination } = useSelector(
    state => state.studentGroup
  );

  /**
   * Stepper Info
   */
  const steps = ['Importante !', 'Atividade', 'Localização'];

  const handleNext = () => dispatch(handleNextStep(activeStep));
  const handleBack = () => {
    if (activeStep === 0) {
      return handleClose();
    }

    return dispatch(handleBackStep(activeStep));
  };

  const handleClickDone = () => {
    dispatch(searchStudentGroupRequest(pagination));

    handleClose();
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (activeStep === 3) {
      dispatch(createStudentGroupRequest(createStudentGroup));
    }
  }, [dispatch, activeStep, createStudentGroup]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="add-student_group"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle
        id="add-student_group"
        onClose={handleClose}
        style={{ textAlign: 'center' }}
      >
        Marcar aula
      </DialogTitle>

      <DialogContent
        dividers
        style={{ minHeight: '645px', maxHeight: '645px' }}
      >
        <div>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.length > 0 &&
              steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
          </Stepper>
        </div>

        {/* Step Forms */}
        {activeStep === 0 && (
          <FirstStepForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {activeStep === 1 && (
          <ActivityStep
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {activeStep === 2 && (
          <AddressStepForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
          />
        )}

        {activeStep === 3 && (
          <div
            style={{
              display: 'flex',
              flexFlow: 'column wrap',
              alignContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '20px',
              }}
            >
              <AssignmentTurnedInIcon
                style={{ color: 'lightgreen', fontSize: '4rem' }}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <Typography variant="h6">
                Sua aula foi marcada com sucesso!
              </Typography>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleClickDone}
              >
                OK
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

DialogAddStudentGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DialogAddStudentGroup;
