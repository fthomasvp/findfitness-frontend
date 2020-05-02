import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import FirstStepForm from './FirstStepForm';

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

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const DialogAddStudentGroup = ({ open, handleClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep(prevActiveStep => prevActiveStep + 1);

  const handleBack = () => {
    if (activeStep === 0) {
      return handleClose();
    }
    return setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const steps = ['Importante !', 'Exercícios', 'Localização'];

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="add-student_group"
      maxWidth="sm"
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
          <FirstStepForm activeStep={activeStep} handleBack={handleBack} handleNext={handleNext} />
        )}
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleBack} color="secondary">
          Cancelar
        </Button>
        {/* <Button autoFocus onClick={handleBack} color="secondary">
          {activeStep === 0 ? 'Cancelar' : 'Voltar'}
        </Button> */}
        {/* <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? 'Marcar' : 'Próximo'}
        </Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default DialogAddStudentGroup;
