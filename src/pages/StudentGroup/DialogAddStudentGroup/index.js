import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';

import FirstStepForm from './FirstStepForm';
import SecondStepForm from './SecondStepForm';
import {
  handleNextStep,
  handleBackStep,
  createStudentGroupRequest,
  searchStudentGroupRequest,
} from '../../../store/ducks/StudentGroup';
import ThirdStepForm from './ThirdStepForm';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogAddStudentGroup = ({ open, handleClose }) => {
  const { activeStep, createStudentGroup, pagination } = useSelector(
    state => state.studentGroup
  );
  const { exercises } = useSelector(state => state.exercise);

  const dispatch = useDispatch();

  /**
   * Stepper Info
   */
  const handleNext = () => dispatch(handleNextStep(activeStep));
  const handleBack = () => {
    if (activeStep === 0) {
      return handleClose();
    }

    return dispatch(handleBackStep(activeStep));
  };

  const handleClickDone = async () => {
    await dispatch(searchStudentGroupRequest(pagination));

    await handleClose();
  };

  useEffect(() => {
    if (activeStep === 3) {
      dispatch(createStudentGroupRequest(createStudentGroup));
    }
  }, [dispatch, activeStep, createStudentGroup]);

  const steps = ['Importante !', 'Atividade', 'Localização'];

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

      <DialogContent dividers>
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
          <SecondStepForm
            activeStep={activeStep}
            handleBack={handleBack}
            handleNext={handleNext}
            exercisesData={exercises}
          />
        )}

        {activeStep === 2 && (
          <ThirdStepForm
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
