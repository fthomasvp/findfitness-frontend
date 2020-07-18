import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PersonIcon from '@material-ui/icons/Person';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Badge from '@material-ui/core/Badge';
import GroupIcon from '@material-ui/icons/Group';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Grid from '@material-ui/core/Grid';

import * as StudentGroupReducer from '../../store/ducks/student_group';
import Utils from '../../utils';
import DialogEnrollStudentGroup from '../../pages/Home/DialogEnrollStudentGroup';
import Alert from '../../components/Alert';
import { useGlobalStyles } from '../../global/styles';
import { DialogContent, DialogActions } from './styles';

const DialogStudentGroupDetails = ({ open, handleClose, studentGroup }) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

  const {
    completeAddress,
    contactPhone,
    exercises,
    eventDateTimeBegin,
    eventDateTimeEnd,
    eventPrice,
    maxStudentGroupAmount,
    payments,
    personal,
  } = studentGroup;

  const pagination = useSelector(state => state.studentGroup.pagination);
  const profile = useSelector(state => state.auth.user.profile);

  // This will be valid only if the user is a Student
  const idStudent = useSelector(state => state.auth.user.id);

  const formatedAddress = Utils.formatAddress(completeAddress);

  const [tab, setTab] = useState(0);
  const handleChangeTab = (event, tabValue) => setTab(tabValue);

  /**
   * EnrollStudentGroup Dialog
   */
  const [openDialogEnroll, setOpenDialogEnroll] = useState(false);
  const handleCloseDialogEnroll = () => setOpenDialogEnroll(false);

  const isEnrolledStudent = () => {
    const hasStudent = studentGroup.payments.filter(
      payment => payment.student.id === idStudent
    );

    return hasStudent.length > 0;
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
    if (error && error.status !== 200) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (
      response?.status === 201 &&
      response?.config?.url === '/student_groups/enroll'
    ) {
      setAlertMessage('Hey! Te vejo na aula :)');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      handleClose();
      handleCloseDialogEnroll();

      dispatch(StudentGroupReducer.searchStudentGroupRequest(pagination));
    }
  }, [dispatch, pagination, handleClose, error, response]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        onBackdropClick={handleClose}
        aria-labelledby="student_group-details"
        maxWidth="md"
        fullWidth
      >
        <AppBar position="relative" className={globalClasses.appBar}>
          <Tabs
            value={tab}
            onChange={handleChangeTab}
            centered
            aria-label="student group detail tabs"
            classes={{ indicator: globalClasses.tabIndicator }}
          >
            <Tab label="Informações" />
            <Tab label="Alunos" />
          </Tabs>
        </AppBar>

        <DialogContent
          dividers
          style={{ maxHeight: '600px', minHeight: '600px' }}
        >
          {/* Show content by Tab */}
          {tab === 0 && (
            <Grid container spacing={3}>
              {/* Personal info */}
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" align="center">
                  <PersonIcon /> PERSONAL
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center',
                    marginBottom: '15px',
                  }}
                >
                  <Avatar
                    src={`${personal.profilePicture}?${Date.now()}`}
                    alt={'Personal profile'}
                    style={{ width: '100px', height: '100px' }}
                  />
                </div>
                <Typography
                  color="textSecondary"
                  variant="h6"
                  align="center"
                  className={globalClasses.primaryTypography}
                >
                  {personal.name}
                </Typography>
                <div
                  style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PhoneIcon style={{ marginRight: '3px' }} />
                  <Typography
                    color="textSecondary"
                    align="center"
                    className={globalClasses.primaryTypography}
                  >
                    {Utils.formatPhone(contactPhone)}
                  </Typography>
                </div>
                <Typography
                  color="textSecondary"
                  align="center"
                  className={globalClasses.primaryTypography}
                >
                  CREF: {personal.cref}
                </Typography>
              </Grid>

              {/* Localization */}
              <Grid container justify="center" item xs={12} sm={6}>
                <div>
                  <Typography gutterBottom variant="h5" align="center">
                    <LocationOnIcon /> ENDEREÇO
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="button"
                    display="block"
                    gutterBottom
                    className={globalClasses.primaryTypography}
                  >
                    {formatedAddress.street}
                    {formatedAddress.number}
                    {formatedAddress.complemento}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="button"
                    display="block"
                    gutterBottom
                    className={globalClasses.primaryTypography}
                  >
                    {formatedAddress.referenceLocation}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="button"
                    display="block"
                    gutterBottom
                    className={globalClasses.primaryTypography}
                  >
                    {formatedAddress.neighboor}
                    {formatedAddress.city}
                    {formatedAddress.state}
                  </Typography>
                </div>
              </Grid>

              {/* StudentGroup info */}
              <Grid container justify="center" item xs={12} sm={6}>
                <div>
                  <Typography
                    color="primary"
                    gutterBottom
                    variant="h5"
                    align="center"
                  >
                    <PriorityHighIcon color="primary" /> IMPORTANTE
                  </Typography>

                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="button"
                    display="block"
                    className={globalClasses.primaryTypography}
                  >
                    Vagas restantes:{' '}
                    {payments && payments.length > 0 ? (
                      <Badge
                        badgeContent={maxStudentGroupAmount - payments.length}
                        color={
                          maxStudentGroupAmount - payments.length !== 0
                            ? 'primary'
                            : 'secondary'
                        }
                        showZero
                      >
                        <GroupIcon
                          color={
                            maxStudentGroupAmount - payments.length !== 0
                              ? 'primary'
                              : 'secondary'
                          }
                        />
                      </Badge>
                    ) : (
                      <Badge
                        badgeContent={maxStudentGroupAmount}
                        color="primary"
                      >
                        <GroupIcon color="primary" />
                      </Badge>
                    )}
                  </Typography>

                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="button"
                    display="block"
                    className={globalClasses.primaryTypography}
                  >
                    Começa em: {Utils.formatDateTime(eventDateTimeBegin)}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="button"
                    display="block"
                    style={{
                      fontSize: '1.2em',
                    }}
                  >
                    Término em: {Utils.formatDateTime(eventDateTimeEnd)}
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="button"
                    display="block"
                    className={globalClasses.primaryTypography}
                  >
                    Valor: R$ {eventPrice}
                  </Typography>
                </div>
              </Grid>

              {/* Exercises info */}
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5" align="center">
                  <FitnessCenterIcon /> ATIVIDADE
                </Typography>
                {exercises.map(({ name, description, picture }, index) => (
                  <Grid container key={index}>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="h6">
                        {name}
                      </Typography>
                    </Grid>

                    <Grid container justify="center" item xs={12} sm={3}>
                      <div>
                        <img
                          src={picture}
                          width="200px"
                          height="200px"
                          alt="Activity Example"
                        />
                      </div>
                    </Grid>

                    <Grid container justify="center" item xs={12} sm={9}>
                      <Typography
                        color="textSecondary"
                        variant="h6"
                        className={globalClasses.primaryTypography}
                      >
                        {description}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          )}

          {tab === 1 &&
            (payments && payments.length > 0 ? (
              <List>
                {payments.map(({ id, student }) => (
                  <ListItem key={id}>
                    <ListItemAvatar>
                      <Avatar
                        src={`${student.profilePicture}?${Date.now()}`}
                        style={{
                          width: '64px',
                          height: '64px',
                          marginRight: '10px',
                        }}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={student.name} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <div
                style={{
                  height: '-webkit-fill-available',
                  display: 'flex',
                  flexFlow: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '5px',
                  minHeight: '600px',
                }}
              >
                <Typography variant="h5">
                  Calma... daqui a pouco alguém aparece por aqui!
                </Typography>
              </div>
            ))}
        </DialogContent>

        <DialogActions>
          <Button
            autoFocus
            color="secondary"
            variant="outlined"
            onClick={() => {
              setTab(0);

              handleClose();
            }}
          >
            Voltar
          </Button>
          {profile === 'ROLE_STUDENT' &&
            !isEnrolledStudent() &&
            payments.length < maxStudentGroupAmount && (
              <Button
                color="primary"
                variant="contained"
                onClick={() => setOpenDialogEnroll(true)}
                className={globalClasses.primaryButton}
              >
                Participar
              </Button>
            )}
        </DialogActions>

        {/* Show only when user clicks on PARTICIPAR button */}
        <DialogEnrollStudentGroup
          openDialogEnroll={openDialogEnroll}
          handleCloseDialogEnroll={handleCloseDialogEnroll}
          idStudentGroup={studentGroup.id}
          idStudent={idStudent}
        />
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

DialogStudentGroupDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  studentGroup: PropTypes.shape({
    completeAddress: PropTypes.string.isRequired,
    contactPhone: PropTypes.string.isRequired,
    eventDateTimeBegin: PropTypes.string.isRequired,
    eventDateTimeEnd: PropTypes.string.isRequired,
    eventPrice: PropTypes.number.isRequired,
    exercises: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    id: PropTypes.number.isRequired,
    maxStudentGroupAmount: PropTypes.number.isRequired,
    minStudentGroupAmount: PropTypes.number.isRequired,
    personal: PropTypes.shape({
      cref: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profilePicture: PropTypes.string,
    }).isRequired,
    payments: PropTypes.array,
  }).isRequired,
};

export default DialogStudentGroupDetails;
