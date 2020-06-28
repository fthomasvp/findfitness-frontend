/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import MaterialTable from 'material-table';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import { tableIcons } from '../../assets/js/material-table-icons';
import * as StudentReducer from '../../store/ducks/Student';
import {
  DialogTitle,
  DialogContent,
  ContainerActionButtons,
  ActionButtons,
} from './styles';
import SForm from '../../components/Form';
import YupSchema, {
  cardNumber,
  cardOwnerName,
  cardVerificationValue,
} from '../validators';
import Utils from '../../utils';
import Alert from '../../components/Alert';
import 'moment/locale/pt-br';

/**
 * Yup Fields Schema
 */
const PaymentMethodSchema = YupSchema({
  cardNumber,
  cardOwnerName,
  cardVerificationValue,
});

const PaymentMethod = () => {
  const dispatch = useDispatch();

  // Only useful when the user is a Student
  const id = useSelector(state => state.auth.user.id);

  const paymentMethods = useSelector(state => state.student.paymentMethods);
  const paymentMethodToCreate = useSelector(
    state => state.student.paymentMethodToCreate
  );

  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => setOpenDialog(false);

  const [toggleVisibilityIcon, setToggleVisibilityIcon] = useState(false);

  /**
   * Table Columns
   */
  const columns = [
    {
      title: 'DATA DE VALIDADE',
      field: 'expiryDate',
      defaultSort: 'asc',
      render: rowData => (
        <Typography style={{ fontSize: '1.2rem' }}>
          {Utils.dateToDisplay(rowData.expiryDate)}
        </Typography>
      ),
    },
    {
      title: 'NÚMERO DO CARTÃO',
      field: 'cardNumber',
      render: rowData => (
        <Typography style={{ fontSize: '1.2rem' }}>
          {`****${rowData.cardNumber.slice(-4)}`}
        </Typography>
      ),
    },
    {
      title: 'TITULAR',
      field: 'cardOwnerName',
    },
  ];

  /**
   * Alert
   */
  const error = useSelector(state => state.student.error);
  const response = useSelector(state => state.student.response);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setAlertMessage('');
    setOpenAlert(false);
    setGrowTransition(false);

    dispatch(StudentReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    dispatch(StudentReducer.fetchPaymentMethodsRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (error && error.status === 400) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (response && response.status === 201) {
      setAlertMessage('Sua forma de pagamento foi adicionada');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      handleCloseDialog();

      dispatch(StudentReducer.fetchPaymentMethodsRequest(id));
    }
  }, [error, response, dispatch, id]);

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        title=""
        columns={columns}
        data={paymentMethods}
        actions={[
          {
            icon: () => <AddIcon />,
            tooltip: 'Adicionar forma de pagamento',
            isFreeAction: true,
            onClick: () => setOpenDialog(true),
          },
        ]}
        options={{
          padding: 'dense',
          pageSizeOptions: [], // Don't show Row size option
          actionsColumnIndex: -1, // Add actions on the end of row
          headerStyle: {
            fontSize: '1.2rem',
          },
          cellStyle: {
            fontSize: '1.2rem',
            color: '#d3d3d3',
          },
          searchFieldStyle: {
            fontSize: '1.2rem',
          },
          paginationType: 'stepped',
          pageSize: 4,
        }}
        localization={{
          toolbar: {
            searchPlaceholder: 'Buscar',
            searchTooltip: 'Buscar',
          },
          body: {
            emptyDataSourceMessage:
              'Hmmm... Parece que você ainda não possui dados :(',
          },
          pagination: {
            firstTooltip: 'Primeira página',
            previousTooltip: 'Página anterior',
            nextTooltip: 'Próxima página',
            lastTooltip: 'Última página',
          },
          header: {
            actions: 'Detalhes',
          },
        }}
        style={{ fontSize: '1.2rem' }}
      />

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        onBackdropClick={handleCloseDialog}
        aria-labelledby="payment_method"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          id="payment_method"
          onClose={handleCloseDialog}
          style={{ textAlign: 'center' }}
        >
          Forma de pagamento
        </DialogTitle>

        <DialogContent dividers>
          <Formik
            initialValues={paymentMethodToCreate}
            onSubmit={values => {
              values.expiryDate = Utils.formatDateToDatabase(values.expiryDate);

              dispatch(StudentReducer.createPaymentMethodsRequest(id, values));
            }}
            validationSchema={PaymentMethodSchema}
            validateOnChange={false}
          >
            {({ values, ...formikProps }) => {
              const {
                setFieldValue,
                handleChange,
                handleSubmit,
                handleBlur,
                touched,
                errors,
              } = formikProps;

              const {
                cardNumber,
                cardOwnerName,
                expiryDate,
                cardVerificationValue,
              } = values;

              return (
                <SForm onSubmit={handleSubmit}>
                  <div
                    style={{
                      display: 'flex',
                      flexFlow: 'column',
                      padding: '10px',
                    }}
                  >
                    <TextField
                      id="cardNumber"
                      label="Número do cartão"
                      variant="outlined"
                      value={cardNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { fontSize: '1rem' },
                      }}
                      inputProps={{ maxLength: 16 }}
                      error={
                        errors.cardNumber && touched.cardNumber ? true : false
                      }
                      helperText={
                        errors.cardNumber && touched.cardNumber
                          ? errors.cardNumber
                          : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem', minWidth: 'auto' },
                      }}
                      style={{ marginBottom: '20px' }}
                    />

                    <TextField
                      id="cardOwnerName"
                      label="Nome do titular"
                      variant="outlined"
                      value={cardOwnerName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { fontSize: '1rem' },
                      }}
                      error={
                        errors.cardOwnerName && touched.cardOwnerName
                          ? true
                          : false
                      }
                      helperText={
                        errors.cardOwnerName && touched.cardOwnerName
                          ? errors.cardOwnerName
                          : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem', minWidth: 'auto' },
                      }}
                      style={{ marginBottom: '20px' }}
                    />

                    <MuiPickersUtilsProvider
                      utils={MomentUtils}
                      locale={'pt-br'}
                    >
                      <DatePicker
                        id="expiryDate"
                        openTo="year"
                        views={['year', 'month']}
                        label="Data de validade"
                        value={expiryDate}
                        onChange={value => setFieldValue('expiryDate', value)}
                        minDate={Date.now()}
                        inputVariant="outlined"
                        cancelLabel="Cancelar"
                        okLabel="Confirmar"
                        style={{ marginBottom: '20px' }}
                      />
                    </MuiPickersUtilsProvider>

                    <TextField
                      id="cardVerificationValue"
                      label="Código de segurança"
                      type={toggleVisibilityIcon ? 'text' : 'password'}
                      variant="outlined"
                      value={cardVerificationValue}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      InputLabelProps={{
                        style: { fontSize: '1rem' },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            {!toggleVisibilityIcon ? (
                              <IconButton
                                aria-label="show password text"
                                onClick={() => setToggleVisibilityIcon(true)}
                              >
                                <VisibilityIcon />
                              </IconButton>
                            ) : (
                              <IconButton
                                aria-label="hide password text"
                                onClick={() => setToggleVisibilityIcon(false)}
                              >
                                <VisibilityOffIcon />
                              </IconButton>
                            )}
                          </InputAdornment>
                        ),
                      }}
                      inputProps={{ maxLength: 4 }}
                      error={
                        errors.cardVerificationValue &&
                        touched.cardVerificationValue
                          ? true
                          : false
                      }
                      helperText={
                        errors.cardVerificationValue &&
                        touched.cardVerificationValue
                          ? errors.cardVerificationValue
                          : ''
                      }
                      FormHelperTextProps={{
                        style: { fontSize: '1.1rem', minWidth: 'auto' },
                      }}
                      style={{ marginBottom: '20px' }}
                    />
                  </div>

                  {/* Step Control Buttons */}
                  <ContainerActionButtons>
                    <ActionButtons>
                      <Button
                        autoFocus
                        onClick={handleCloseDialog}
                        color="secondary"
                        variant="outlined"
                      >
                        Cancelar
                      </Button>

                      <Button
                        color="primary"
                        variant="contained"
                        type="submit"
                        style={{ marginLeft: '8px' }}
                      >
                        Adicionar
                      </Button>
                    </ActionButtons>
                  </ContainerActionButtons>
                </SForm>
              );
            }}
          </Formik>
        </DialogContent>
      </Dialog>

      <Alert
        open={openAlert}
        handleClose={handleCloseAlert}
        growTransition={growTransition}
        message={alertMessage}
        severity={severity}
      />
    </div>
  );
};

export default PaymentMethod;
