import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import {
  enrollStudentGroupRequest,
  searchStudentGroupRequest,
} from '../../../store/ducks/StudentGroup';

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

const DialogEnrollStudentGroup = ({
  openDialogEnroll,
  setOpenDialogEnroll,
  handleCloseDialogEnroll,
  handleClose,
  idStudentGroup,
  idStudent,
}) => {
  const dispatch = useDispatch();

  const pagination = useSelector(state => state.studentGroup.pagination);

  const makeEnrollRequest = () => {
    dispatch(enrollStudentGroupRequest(idStudentGroup, idStudent));

    setTimeout(() => {
      dispatch(searchStudentGroupRequest(pagination));

      handleCloseDialogEnroll();

      handleClose();
    }, 1500);
  };

  return (
    <Dialog
      open={openDialogEnroll}
      onClose={handleCloseDialogEnroll}
      onBackdropClick={() => setOpenDialogEnroll(false)}
      aria-labelledby="student_group-enroll"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle
        id="student_group-enroll"
        onClose={handleCloseDialogEnroll}
        style={{ textAlign: 'center' }}
      >
        Garanta sua vaga!
      </DialogTitle>

      <DialogContent dividers></DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleCloseDialogEnroll} color="secondary">
          Cancelar
        </Button>
        <Button variant="contained" onClick={makeEnrollRequest} color="primary">
          Concluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogEnrollStudentGroup.propTypes = {
  openDialogEnroll: PropTypes.bool.isRequired,
  setOpenDialogEnroll: PropTypes.func.isRequired,
  handleCloseDialogEnroll: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  idStudentGroup: PropTypes.number.isRequired,
  idStudent: PropTypes.number.isRequired,
};

export default DialogEnrollStudentGroup;
