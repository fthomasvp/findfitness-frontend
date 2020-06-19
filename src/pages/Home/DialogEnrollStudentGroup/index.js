import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import {
  enrollStudentGroupRequest,
  searchStudentGroupRequest,
} from '../../../store/ducks/StudentGroup';
import { fetchPaymentMethodsRequest } from '../../../store/ducks/Student';

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

  const paymentMethods = useSelector(state => state.student.paymentMethods);
  const errorStudent = useSelector(
    state => state.student.error && state.student.error.data
  );

  const [paymentMethodSelected, setPaymentMethodSelected] = useState(0);

  const [cardVerificationValue, setCardVerificationValue] = useState('');

  const makeEnrollRequest = () => {
    const enrollData = {
      idStudentGroup,
      idStudent,
      idPaymentMethod: paymentMethodSelected,
      cardVerificationValue,
    };

    dispatch(enrollStudentGroupRequest(enrollData));

    setTimeout(() => {
      dispatch(searchStudentGroupRequest(pagination));

      handleCloseDialogEnroll();

      handleClose();
    }, 1500);
  };

  const handleChange = evt => setCardVerificationValue(evt.target.value);

  const handleBlur = evt => setCardVerificationValue(evt.target.value);

  /**
   * Effects
   */
  useEffect(() => {
    if (openDialogEnroll) {
      dispatch(fetchPaymentMethodsRequest(idStudent));
    }
  }, [dispatch, idStudent, openDialogEnroll]);

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

      <DialogContent dividers>
        {paymentMethods && paymentMethods.length > 0 ? (
          <>
            <Typography variant="button" style={{ color: 'gold' }}>
              Selecione a forma de pagamento
            </Typography>
            <List style={{ marginBottom: '20px' }}>
              {paymentMethods.map(({ id, cardNumber }) => (
                <ListItem key={id} onClick={() => setPaymentMethodSelected(id)}>
                  <Radio
                    checked={paymentMethodSelected === id}
                    onChange={() => setPaymentMethodSelected(id)}
                    value={id}
                  />
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={`****${cardNumber.slice(-4)}`} />
                </ListItem>
              ))}
            </List>

            <TextField
              id="cardVerificationValue"
              label="CVV"
              variant="outlined"
              value={cardVerificationValue}
              onChange={handleChange}
              onBlur={handleBlur}
              InputLabelProps={{ style: { color: 'white' } }}
            />
          </>
        ) : (
          // Display error message
          <div
            style={{
              display: 'flex',
              flexFlow: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '5px',
            }}
          >
            <Typography variant="button" style={{ color: 'gold' }}>
              {(errorStudent && errorStudent.message) || ''}
            </Typography>
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button autoFocus onClick={handleCloseDialogEnroll} color="secondary">
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={makeEnrollRequest}
          color="primary"
          disabled={
            errorStudent !== null ||
            cardVerificationValue.length !== 3 ||
            paymentMethodSelected === 0
          }
        >
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
  idStudent: PropTypes.number,
};

export default DialogEnrollStudentGroup;
