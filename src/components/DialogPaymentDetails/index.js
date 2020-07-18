import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import PhoneIcon from '@material-ui/icons/Phone';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PersonIcon from '@material-ui/icons/Person';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

import Utils from '../../utils';
import DialogPersonalEvaluation from '../../components/DialogPersonalEvaluation';
import { useGlobalStyles } from '../../global/styles';
import { DialogContent, DialogActions } from './styles';

const DialogPaymentDetails = ({ open, handleClose, payment, profile }) => {
  const globalClasses = useGlobalStyles();

  const {
    studentGroup: {
      completeAddress,
      contactPhone,
      exercises,
      eventDateTimeBegin,
      eventDateTimeEnd,
      eventPrice,
      personal,
    },
  } = payment;

  const formatedAddress = Utils.formatAddress(completeAddress);

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, tabValue) => setTab(tabValue);

  /**
   * Evaluation Dialog
   */
  const INITIAL_STUDENT_EVALUATION = {
    commentary: '',
    id: 0,
    liked: false,
    personal: {
      id: 0,
      name: '',
      profilePicture: '',
    },
    idStudentGroup: 0,
  };

  const [openDialogEvaluation, setOpenDialogEvaluation] = useState(false);
  const [studentEvaluation, setStudentEvaluation] = useState(
    INITIAL_STUDENT_EVALUATION
  );

  const handleCloseDialogEvaluation = () => {
    setStudentEvaluation(INITIAL_STUDENT_EVALUATION);
    setOpenDialogEvaluation(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="payment-details"
      maxWidth="md"
      fullWidth
    >
      <AppBar position="relative" className={globalClasses.appBar}>
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          centered
          aria-label="payment details tabs"
          classes={{ indicator: globalClasses.tabIndicator }}
        >
          <Tab label="Informações" />
          <Tab label="Alunos" />
          <Tab label="Avaliações" />
        </Tabs>
      </AppBar>

      <DialogContent
        dividers
        style={{ minHeight: '600px', maxHeight: '600px' }}
      >
        {/* Info Tab */}
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
                  variant="button"
                  display="block"
                  gutterBottom
                  className={globalClasses.primaryTypography}
                >
                  Começa em: {Utils.formatDateTime(eventDateTimeBegin)}
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="button"
                  display="block"
                  className={globalClasses.primaryTypography}
                >
                  Término em: {Utils.formatDateTime(eventDateTimeEnd)}
                </Typography>
                <Typography
                  color="textSecondary"
                  variant="button"
                  display="block"
                  gutterBottom
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

        {/* Student list Tab */}
        {tab === 1 && (
          <List>
            {profile === 'ROLE_PERSONAL'
              ? payment.studentGroup.payments.map(({ id, student }) => (
                  <ListItem key={id}>
                    <ListItemAvatar>
                      <Avatar
                        src={`${student.profilePicture}?${Date.now()}`}
                        style={{
                          width: '64px',
                          height: '64px',
                          marginRight: '20px',
                        }}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={student.name} />
                    <IconButton
                      onClick={() => {
                        const {
                          studentGroup: { id, personal, personalEvaluations },
                        } = payment;

                        // Verificar se o personal já possui avaliação
                        const storedEvaluation = personalEvaluations.find(
                          evaluation => evaluation.personal.id === personal.id
                        );

                        // Caso não possua, add alguns dados do personal mesmo assim
                        const studentInfo = {
                          id: personal.id,
                          name: personal.name,
                          profilePicture: personal.profilePicture,
                        };

                        setStudentEvaluation({
                          ...studentEvaluation,
                          ...storedEvaluation,
                          personal: {
                            ...studentInfo,
                          },
                          idStudentGroup: id,
                        });

                        // Abrir o modal
                        setOpenDialogEvaluation(true);
                      }}
                    >
                      <ThumbsUpDownIcon color="primary" />
                    </IconButton>
                  </ListItem>
                ))
              : null}
          </List>
        )}

        {studentEvaluation && (
          <DialogPersonalEvaluation
            open={openDialogEvaluation}
            handleClose={handleCloseDialogEvaluation}
            evaluation={studentEvaluation}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button
          autoFocus
          variant="outlined"
          color="secondary"
          onClick={() => {
            setTab(0);

            handleClose();
          }}
        >
          Voltar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogPaymentDetails.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  payment: PropTypes.shape({
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
      personal: PropTypes.shape({
        cref: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        profilePicture: PropTypes.string,
      }).isRequired,
      personalEvaluations: PropTypes.array,
      studentEvaluations: PropTypes.array,
      payments: PropTypes.array,
    }).isRequired,
  }),
  profile: PropTypes.string.isRequired,
};

export default DialogPaymentDetails;
