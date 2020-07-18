import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ImageIcon from '@material-ui/icons/Image';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';

import * as StudentGroupReducer from '../../../store/ducks/student_group';
import { fetchPaymentMethodsRequest } from '../../../store/ducks/student';
import STextLink from '../../../components/TextLink';
import { useGlobalStyles } from '../../../global/styles';
import { DialogTitle, DialogContent, DialogActions } from './styles';

const DialogEnrollStudentGroup = ({
  openDialogEnroll,
  handleCloseDialogEnroll,
  idStudentGroup,
  idStudent,
}) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

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

    dispatch(StudentGroupReducer.enrollStudentGroupRequest(enrollData));
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
    <>
      <Dialog
        open={openDialogEnroll}
        onClose={handleCloseDialogEnroll}
        onBackdropClick={handleCloseDialogEnroll}
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
              <Typography color="primary" variant="button">
                Selecione a forma de pagamento
              </Typography>
              <List style={{ marginBottom: '20px' }}>
                {paymentMethods.map(({ id, cardNumber }) => (
                  <ListItem
                    key={id}
                    onClick={() => setPaymentMethodSelected(id)}
                  >
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
                className={globalClasses.textField}
                InputLabelProps={{ className: globalClasses.inputLabel }}
              />
            </>
          ) : (
            // Display error message and an option to add a payment method
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

              <STextLink to="/paymentmethod">
                Adicione uma forma de pagamento clicando aqui!
              </STextLink>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            color="secondary"
            variant="outlined"
            onClick={handleCloseDialogEnroll}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={makeEnrollRequest}
            disabled={
              errorStudent !== null ||
              cardVerificationValue.length !== 3 ||
              paymentMethodSelected === 0
            }
            className={globalClasses.primaryButton}
          >
            Concluir
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

DialogEnrollStudentGroup.propTypes = {
  openDialogEnroll: PropTypes.bool.isRequired,
  handleCloseDialogEnroll: PropTypes.func.isRequired,
  idStudentGroup: PropTypes.number.isRequired,
  idStudent: PropTypes.number,
};

export default DialogEnrollStudentGroup;
