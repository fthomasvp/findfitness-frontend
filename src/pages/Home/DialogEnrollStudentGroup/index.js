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

import * as StudentGroupReducer from '../../../store/ducks/StudentGroup';
import { fetchPaymentMethodsRequest } from '../../../store/ducks/Student';
import { DialogTitle, DialogContent, DialogActions } from './styles';
import STextLink from '../../../components/TextLink';

const DialogEnrollStudentGroup = ({
  openDialogEnroll,
  handleCloseDialogEnroll,
  idStudentGroup,
  idStudent,
}) => {
  const dispatch = useDispatch();

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
              <Typography variant="button" style={{ color: 'gold' }}>
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

              <STextLink to="/paymentmethod">
                Adicione uma forma de pagamento clicando aqui!
              </STextLink>
            </div>
          )}
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            onClick={handleCloseDialogEnroll}
            color="secondary"
            variant="outlined"
          >
            Cancelar
          </Button>
          <Button
            onClick={makeEnrollRequest}
            color="primary"
            variant="contained"
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
