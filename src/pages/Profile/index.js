import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import { MuiPickersUtilsProvider, DatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { Formik } from 'formik';

import * as AuthReducer from '../../store/ducks/Auth';
import Alert from '../../components/Alert';
import YupSchema, {
  errorMessages,
  email,
  password,
  name,
  birthdate,
} from '../validators';
import * as S from './styles';
import SForm from '../../components/Form';
import Utils from '../../utils';

/**
 * Yup Fields Schema
 */
const StudentOrPersonalSchema = YupSchema({
  email,
  password,
  name,
  birthdate,
});

const Profile = () => {
  const dispatch = useDispatch();

  const { profilePicture, profile, id } = useSelector(state => state.auth.user);

  const { userToUpdate } = useSelector(state => state.auth);

  const { gender } = userToUpdate;

  /**
   * Gender Tab
   */
  let [tabGender, setTabGender] = useState(0);

  const _getSelectedTab = gender => {
    if (!gender || gender === 'F') {
      setTabGender(0);

      return 0;
    }

    if (gender === 'M') {
      setTabGender(1);

      return 1;
    }

    // OUTRO
    setTabGender(2);

    return 2;
  };

  const [userGender, setUserGender] = useState(gender);

  const handleChangeTabGender = (event, tabValue) => {
    setTabGender(tabValue);

    if (tabValue === 0) {
      setUserGender('F');
    } else if (tabValue === 1) {
      setUserGender('M');
    } else {
      setUserGender('O');
    }
  };

  const [toggleVisibilityIcon, setToggleVisibilityIcon] = useState(false);

  /**
   * Profile picture field
   */
  const [imageFile, setImageFile] = useState(null);

  const [showInputField, setShowInputField] = useState(false);

  /**
   * Profile page Tab
   */
  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, tabValue) => setTab(tabValue);

  /**
   * Others functions
   */
  const handleClickUpload = () => {
    let formData = new FormData();
    formData.append('profilePicture', imageFile);

    dispatch(AuthReducer.uploadProfilePictureRequest(formData, profile, id));
  };

  const clearProfilePictureFields = () => {
    setShowInputField(false);
    setImageFile(null);
  };

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

    // Only for uploadProfilePicture
    if (
      response &&
      response.config?.method === 'put' &&
      response.status === 200
    ) {
      setAlertMessage('A sua foto foi atualizada!');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      clearProfilePictureFields();
    }

    // Only for tab "Dados pessoais"
    if (
      response &&
      response.config?.method === 'patch' &&
      response.status === 204
    ) {
      setAlertMessage('Seus dados foram atualizados!');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      dispatch(AuthReducer.fetchUserDataRequest(profile, id));
    }
  }, [error, response, dispatch, profile, id]);

  // Get user data to update
  useEffect(() => {
    dispatch(AuthReducer.fetchUserDataRequest(profile, id));
  }, [dispatch, profile, id]);

  // Get gender on redux from request "fetchUserData"
  useEffect(() => {
    _getSelectedTab(gender);
  }, [gender]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          style={{
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'center',
            padding: '10px',
          }}
        >
          <Typography
            variant="body2"
            align="center"
            style={{
              marginBottom: '20px',
              fontSize: '1.2rem',
            }}
          >
            Clique no ícone da foto para alterar ;)
          </Typography>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Badge
              overlap="circle"
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              badgeContent={
                <IconButton
                  aria-label="add profile picture"
                  onClick={() => setShowInputField(true)}
                >
                  <AddAPhotoIcon />
                </IconButton>
              }
            >
              <Avatar
                src={`${profilePicture}?${Date.now()}`}
                alt={'user profile picture'}
                style={{ width: '128px', height: '128px' }}
              />
            </Badge>
          </div>

          <div
            style={{
              visibility: `${!showInputField ? 'hidden' : 'visible'}`,
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '20px',
            }}
          >
            <Input
              name="profilePicture"
              type="file"
              onChange={evt => {
                setImageFile(evt.target.files[0]);
              }}
            />
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            {showInputField && (
              <Button onClick={clearProfilePictureFields} color="secondary">
                Cancelar
              </Button>
            )}

            <Button
              onClick={handleClickUpload}
              variant="contained"
              color="primary"
              disabled={imageFile === null}
            >
              Atualizar
            </Button>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>
          <AppBar position="relative" color="transparent">
            <Tabs
              value={tab}
              onChange={handleChangeTab}
              indicatorColor="primary"
              aria-label="payment details tabs"
              centered
            >
              <Tab label="Dados pessoais" />
              <Tab label="Endereço" />
              {profile === 'ROLE_STUDENT' && <Tab label="Cartão de saúde" />}
            </Tabs>
          </AppBar>

          {tab === 0 && (
            <Formik
              initialValues={userToUpdate}
              onSubmit={values => {
                // Remove unecessary objects to make request
                delete values.profilePicture;
                delete values.address;
                delete values.healthCard;
                delete values.validCref;

                if (profile === 'ROLE_STUDENT') {
                  delete values.cref;
                }

                // Get character gender value
                values = { ...values, gender: userGender };

                // Endpoint only knows YYYY-MM-DD date format
                values.birthdate = Utils.formatDateToDatabase(values.birthdate);

                dispatch(AuthReducer.patchUserDataRequest(profile, values));
              }}
              validationSchema={StudentOrPersonalSchema}
              validate={values => {
                const { cpf, phone, cref, validCref } = values;
                const {
                  requiredNumericField,
                  specialCharactersField,
                } = errorMessages;
                const errors = {};

                if (!cpf) {
                  errors.cpf = requiredNumericField;
                } else if (/\D/.test(cpf)) {
                  errors.cpf = specialCharactersField;
                } else if (cpf.replace(/\D/, '').length !== 11) {
                  errors.cpf = 'Não possui 11 dígitos';
                }

                if (!phone) {
                  errors.phone = requiredNumericField;
                } else if (/\D/.test(phone)) {
                  errors.phone = specialCharactersField;
                } else if (phone.replace(/\D/, '').length !== 11) {
                  errors.phone = 'Não possui 11 dígitos';
                }

                if (profile === 'ROLE_PERSONAL') {
                  if (!cref) {
                    errors.cref = 'Preencha o campo';
                  } else if (cref.length !== 11) {
                    errors.cref = 'Deve conter 11 caracteres';
                  } else if (!/^[0-9]{6}-[A-Z]{1}\/[A-Z]{2}/gm.test(cref)) {
                    errors.cref = 'Precisa seguir o padrão: 000000-X/XX';
                  } else if (!validCref) {
                    errors.cref = 'CREF não está registrado na CONFEF';
                  }
                }

                return errors;
              }}
              enableReinitialize
            >
              {({ values, ...formikProps }) => {
                const {
                  birthdate,
                  cpf,
                  cref,
                  email,
                  name,
                  password,
                  phone,
                } = values;

                const {
                  setFieldError,
                  setFieldValue,
                  handleChange,
                  handleSubmit,
                  handleBlur,
                  touched,
                  errors,
                } = formikProps;

                return (
                  <SForm onSubmit={handleSubmit}>
                    <S.Panel>
                      <S.PanelContent>
                        {profile === 'ROLE_PERSONAL' && (
                          <TextField
                            autoFocus
                            id="cref"
                            label="CREF"
                            variant="outlined"
                            value={cref}
                            onChange={handleChange}
                            onBlur={evt => {
                              if (/^[0-9]{6}-[A-Z]{1}\/[A-Z]{2}/gm.test(cref)) {
                                fetch(
                                  // eslint-disable-next-line no-undef
                                  `${process.env.REACT_APP_AXIOS_BASE_URL}/personals/search?cref=${cref}`
                                )
                                  .then(response => {
                                    return response.status;
                                  })
                                  .then(status => {
                                    if (status !== 200) {
                                      setFieldError(
                                        'cref',
                                        'CREF não está registrado na CONFEF'
                                      );

                                      setFieldValue('validCref', false);
                                    } else {
                                      setFieldValue('validCref', true);
                                    }
                                  });
                              }

                              handleBlur(evt);
                            }}
                            InputLabelProps={{
                              style: { /*color: 'white',*/ fontSize: '1.2rem' },
                            }}
                            style={{
                              marginBottom: '20px',
                              width: '40%',
                            }}
                            error={errors.cref && touched.cref ? true : false}
                            helperText={
                              errors.cref && touched.cref ? errors.cref : ''
                            }
                            FormHelperTextProps={{
                              style: { fontSize: '1.1rem' },
                            }}
                          />
                        )}

                        <TextField
                          autoFocus={profile === 'ROLE_STUDENT'}
                          id="name"
                          label="Nome"
                          variant="outlined"
                          value={name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { /*color: 'white',*/ fontSize: '1.2rem' },
                          }}
                          style={{ marginBottom: '20px' }}
                          error={errors.name && touched.name ? true : false}
                          helperText={
                            errors.name && touched.name ? errors.name : ''
                          }
                          FormHelperTextProps={{
                            style: { fontSize: '1.1rem' },
                          }}
                        />

                        <TextField
                          id="phone"
                          label="Celular"
                          variant="outlined"
                          value={phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { /*color: 'white',*/ fontSize: '1.2rem' },
                          }}
                          style={{ marginBottom: '20px', width: '140px' }}
                          error={errors.phone && touched.phone ? true : false}
                          helperText={
                            errors.phone && touched.phone ? errors.phone : ''
                          }
                          FormHelperTextProps={{
                            style: { fontSize: '1.1rem' },
                          }}
                        />

                        <TextField
                          id="cpf"
                          label="CPF"
                          variant="outlined"
                          value={cpf}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { /*color: 'white',*/ fontSize: '1.2rem' },
                          }}
                          style={{ marginBottom: '20px', width: '160px' }}
                          error={errors.cpf && touched.cpf ? true : false}
                          helperText={
                            errors.cpf && touched.cpf ? errors.cpf : ''
                          }
                          FormHelperTextProps={{
                            style: { fontSize: '1.1rem' },
                          }}
                        />

                        <Typography
                          variant="body1"
                          style={{
                            marginBottom: '5px',
                            marginLeft: '13px',
                            fontSize: '1.2rem',
                          }}
                        >
                          Gênero
                        </Typography>
                        <AppBar
                          position="relative"
                          color="transparent"
                          style={{ marginBottom: '20px' }}
                        >
                          <Tabs
                            // value={_getSelectedTab(gender)}
                            value={tabGender}
                            onChange={handleChangeTabGender}
                            indicatorColor="primary"
                            centered
                          >
                            <Tab label="FEMININO" />
                            <Tab label="MASCULINO" />
                            <Tab label="OUTRO" />
                          </Tabs>
                        </AppBar>

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <div
                            style={{
                              width: '100%',
                              display: 'flex',
                              marginBottom: '20px',
                            }}
                          >
                            <div>
                              <DatePicker
                                id="birthdate"
                                label="Data de Nascimento"
                                format="DD/MM/YYYY"
                                margin="normal"
                                size="medium"
                                value={birthdate}
                                onChange={value => {
                                  setFieldValue('birthdate', value);
                                }}
                                InputLabelProps={{
                                  style: {
                                    /*color: 'white',*/ fontSize: '1.2rem',
                                  },
                                }}
                                error={
                                  errors.birthdate && touched.birthdate
                                    ? true
                                    : false
                                }
                                helperText={
                                  errors.birthdate && touched.birthdate
                                    ? errors.birthdate
                                    : ''
                                }
                                FormHelperTextProps={{
                                  style: {
                                    width: 'max-content',
                                    fontSize: '1.1rem',
                                  },
                                }}
                              />
                            </div>
                          </div>
                        </MuiPickersUtilsProvider>

                        <TextField
                          id="email"
                          label="Email"
                          type="email"
                          variant="outlined"
                          value={email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { /*color: 'white',*/ fontSize: '1.2rem' },
                          }}
                          style={{ marginBottom: '20px' }}
                          error={errors.email && touched.email ? true : false}
                          helperText={
                            errors.email && touched.email ? errors.email : ''
                          }
                          FormHelperTextProps={{
                            style: { fontSize: '1.1rem' },
                          }}
                        />

                        <TextField
                          id="password"
                          label="Senha"
                          type={toggleVisibilityIcon ? 'text' : 'password'}
                          variant="outlined"
                          value={password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputLabelProps={{
                            style: { /*color: 'white',*/ fontSize: '1.2rem' },
                          }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                {!toggleVisibilityIcon ? (
                                  <IconButton
                                    aria-label="show password text"
                                    onClick={() =>
                                      setToggleVisibilityIcon(true)
                                    }
                                  >
                                    <VisibilityIcon />
                                  </IconButton>
                                ) : (
                                  <IconButton
                                    aria-label="hide password text"
                                    onClick={() =>
                                      setToggleVisibilityIcon(false)
                                    }
                                  >
                                    <VisibilityOffIcon />
                                  </IconButton>
                                )}
                              </InputAdornment>
                            ),
                          }}
                          style={{ marginBottom: '20px' }}
                          error={
                            errors.password && touched.password ? true : false
                          }
                          helperText={
                            errors.password && touched.password
                              ? errors.password
                              : ''
                          }
                          FormHelperTextProps={{
                            style: { fontSize: '1.1rem' },
                          }}
                        />
                      </S.PanelContent>

                      <S.PanelActions>
                        <Button
                          color="primary"
                          variant="contained"
                          type="submit"
                        >
                          Atualizar
                        </Button>
                      </S.PanelActions>
                    </S.Panel>
                  </SForm>
                );
              }}
            </Formik>
          )}
        </Paper>
      </Grid>

      <Alert
        open={openAlert}
        handleClose={handleCloseAlert}
        growTransition={growTransition}
        message={alertMessage}
        severity={severity}
      />
    </Grid>
  );
};

export default Profile;
