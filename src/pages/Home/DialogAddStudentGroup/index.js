import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Dialog from '@material-ui/core/Dialog';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import * as StudentGroupReducer from '../../../store/ducks/student_group';
import FirstStepForm from './FirstStepForm';
import ActivityStep from './ActivityStep';
import AddressStepForm from './AddressStepForm';
import Alert from '../../../components/Alert';
import { DialogTitle, DialogContent } from './styles';

const DialogAddStudentGroup = ({ open, handleClose }) => {
  const dispatch = useDispatch();

  const { activeStep, pagination, createStudentGroup } = useSelector(
    state => state.studentGroup
  );

  const { user } = useSelector(state => state.auth);
  const { id: idPersonal } = user;

  /**
   * Stepper Info
   */
  const steps = ['Importante !', 'Atividade', 'Localização'];

  const handleNext = () =>
    dispatch(StudentGroupReducer.handleNextStep(activeStep));

  const handleBack = () => {
    if (activeStep === 0) {
      return handleClose();
    }

    return dispatch(StudentGroupReducer.handleBackStep(activeStep));
  };

  /**
   * Alert
   */
  const error = useSelector(state => state.studentGroup.error);
  const response = useSelector(state => state.studentGroup.response);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setAlertMessage('');
    setOpenAlert(false);
    setGrowTransition(false);

    dispatch(StudentGroupReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (error && error.status === 400) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (
      response?.status === 201 &&
      response?.config?.url === '/student_groups'
    ) {
      setAlertMessage('Parabéns! Sua aula já está disponível no mapa');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      handleClose();
    }
  }, [dispatch, pagination, error, response, handleClose]);

  useEffect(() => {
    if (activeStep === 3) {
      dispatch(
        StudentGroupReducer.createStudentGroupRequest(
          createStudentGroup,
          idPersonal
        )
      );
    }
  }, [dispatch, activeStep, createStudentGroup, idPersonal]);

  return (
    <>
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
          style={{ minHeight: '600px', maxHeight: '645px' }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.length > 0 &&
              steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
          </Stepper>

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
        </DialogContent>
      </Dialog>

      <Alert
        open={openAlert}
        handleClose={handleCloseAlert}
        growTransition={growTransition}
        message={alertMessage}
        severity={severity}
      />
    </>
  );
};

DialogAddStudentGroup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default DialogAddStudentGroup;
