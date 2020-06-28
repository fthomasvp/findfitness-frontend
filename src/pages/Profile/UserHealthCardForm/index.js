import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Formik } from 'formik';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import * as AuthReducer from '../../../store/ducks/Auth';
import * as S from '../styles';
import SForm from '../../../components/Form';
import Alert from '../../../components/Alert';

const UserHealthCardForm = ({ id, profile, healthCard }) => {
  const dispatch = useDispatch();

  /**
   * Alert
   */
  const error = useSelector(state => state.auth.error);
  const response = useSelector(state => state.auth.response);

  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [growTransition, setGrowTransition] = useState(false);
  const [severity, setSeverity] = useState('error');

  const handleCloseAlert = () => {
    setAlertMessage('');
    setOpenAlert(false);
    setGrowTransition(false);

    dispatch(AuthReducer.clearSnackbar());
  };

  /**
   * Effects
   */
  useEffect(() => {
    if (error && error.status !== 200) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (
      response &&
      (response.config?.method === 'patch' ||
        response.config?.method === 'post') &&
      (response.status === 201 || response.status === 204)
    ) {
      setAlertMessage('Seus dados foram atualizados');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      dispatch(AuthReducer.fetchUserDataRequest(profile, id));
    }
  }, [error, response, dispatch, profile, id]);

  return (
    <Formik
      initialValues={healthCard}
      onSubmit={values => {
        // Means that the health card does not exist yet
        if (values.id === 0) {
          dispatch(AuthReducer.createUserHealthCardRequest(id, values));
        } else {
          dispatch(AuthReducer.patchUserHealthCardDataRequest(id, values));
        }
      }}
      enableReinitialize
    >
      {({ values, ...formikProps }) => {
        const {
          setFieldValue,
          handleChange,
          handleBlur,
          handleSubmit,
        } = formikProps;

        const {
          sedentaryTime,
          regularPhysicalActivity,
          heartProblem,
          respiratoryAllergy,
          orthopedicProblem,
          surgicalIntervention,
          regularMedication,
          comments,
          diabetes,
          epilepsy,
          smoking,
          rheumatism,
          hypertension,
        } = values;

        return (
          <SForm onSubmit={handleSubmit}>
            <S.Panel>
              <S.PanelContent>
                <TextField
                  autoFocus
                  id="sedentaryTime"
                  label="Sendentarismo"
                  variant="outlined"
                  value={sedentaryTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <TextField
                  id="regularPhysicalActivity"
                  label="Atividade física regular"
                  variant="outlined"
                  value={regularPhysicalActivity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <TextField
                  id="heartProblem"
                  label="Problemas no coração"
                  variant="outlined"
                  value={heartProblem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <TextField
                  id="respiratoryAllergy"
                  label="Alergia respiratória"
                  type="respiratoryAllergy"
                  variant="outlined"
                  value={respiratoryAllergy}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <TextField
                  id="orthopedicProblem"
                  label="Problemas ortopédicos"
                  variant="outlined"
                  value={orthopedicProblem}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <TextField
                  id="surgicalIntervention"
                  label="Interveção cirúrgica"
                  variant="outlined"
                  value={surgicalIntervention}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <TextField
                  id="regularMedication"
                  label="Medicação regular"
                  variant="outlined"
                  value={regularMedication}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <TextField
                  id="comments"
                  label="Comentários em geral"
                  variant="outlined"
                  value={comments}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  multiline
                  rows={2}
                  InputLabelProps={{
                    style: { fontSize: '1rem' },
                  }}
                  inputProps={{ maxLength: 250 }}
                  style={{ marginBottom: '20px' }}
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={diabetes}
                      onChange={event => {
                        setFieldValue(
                          `${event.target.name}`,
                          event.target.checked
                        );
                      }}
                      color="primary"
                      name="diabetes"
                    />
                  }
                  label="Diabetes"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={epilepsy}
                      onChange={event => {
                        setFieldValue(
                          `${event.target.name}`,
                          event.target.checked
                        );
                      }}
                      color="primary"
                      name="epilepsy"
                    />
                  }
                  label="Epilepsia"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={smoking}
                      onChange={event => {
                        setFieldValue(
                          `${event.target.name}`,
                          event.target.checked
                        );
                      }}
                      color="primary"
                      name="smoking"
                    />
                  }
                  label="Fumante"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={rheumatism}
                      onChange={event => {
                        setFieldValue(
                          `${event.target.name}`,
                          event.target.checked
                        );
                      }}
                      color="primary"
                      name="rheumatism"
                    />
                  }
                  label="Reumatismo"
                  labelPlacement="end"
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={hypertension}
                      onChange={event => {
                        setFieldValue(
                          `${event.target.name}`,
                          event.target.checked
                        );
                      }}
                      color="primary"
                      name="hypertension"
                    />
                  }
                  label="Hipertensão"
                  labelPlacement="end"
                />
              </S.PanelContent>

              <S.PanelActions>
                <Button color="primary" variant="contained" type="submit">
                  Atualizar
                </Button>
              </S.PanelActions>

              <Alert
                open={openAlert}
                handleClose={handleCloseAlert}
                growTransition={growTransition}
                message={alertMessage}
                severity={severity}
              />
            </S.Panel>
          </SForm>
        );
      }}
    </Formik>
  );
};

UserHealthCardForm.propTypes = {
  id: PropTypes.number.isRequired,
  profile: PropTypes.string.isRequired,
  healthCard: PropTypes.object.isRequired,
};

export default UserHealthCardForm;
