import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import PhoneIcon from '@material-ui/icons/Phone';
import Divider from '@material-ui/core/Divider';
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
import ImageIcon from '@material-ui/icons/Image';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import PaymentIcon from '@material-ui/icons/Payment';

import Utils from '../../utils';
import { DialogContent, DialogActions } from './styles';

const DialogPaymentDetails = ({ open, handleClose, payment }) => {
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
    paymentMethod,
    status,
  } = payment;

  const formatedAddress = Utils.formatAddress(completeAddress);

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, tabValue) => setTab(tabValue);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
      aria-labelledby="payment-details"
      maxWidth="md"
      fullWidth
    >
      <AppBar position="relative" color="transparent">
        <Tabs
          value={tab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          centered
          aria-label="payment details tabs"
        >
          <Tab label="Informações" />
          <Tab label="Pagamento" />
          <Tab label="Avaliações" />
        </Tabs>
      </AppBar>

      <DialogContent
        dividers
        style={{ minHeight: '645px', maxHeight: '645px' }}
      >
        {/* Info Tab */}
        {tab === 0 && (
          <>
            {/* Personal info */}
            <Typography gutterBottom variant="h5" align="center">
              <PersonIcon /> PERSONAL
            </Typography>
            <div style={{ display: 'flex', flex: 1, justifyContent: 'center' }}>
              <Avatar
                src={personal.profilePicture}
                alt={'Personal profile'}
                style={{ width: '64px', height: '64px' }}
              />
            </div>
            <Typography
              variant="h6"
              align="center"
              style={{
                fontSize: '1.2em',
                color: '#d3d3d3',
              }}
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
                align="center"
                style={{
                  fontSize: '1.2em',
                  color: '#d3d3d3',
                }}
              >
                {Utils.formatPhone(contactPhone)}
              </Typography>
            </div>
            <Typography
              align="center"
              style={{
                marginBottom: '20px',
                fontSize: '1.2em',
                color: '#d3d3d3',
              }}
            >
              CREF: {personal.cref}
            </Typography>

            <Divider style={{ marginBottom: '20px' }} />

            {/* Localization and StudentGroup info */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                marginBottom: '20px',
              }}
            >
              <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <Typography gutterBottom variant="h5">
                  <LocationOnIcon /> ENDEREÇO
                </Typography>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '1.2em',
                    color: '#d3d3d3',
                  }}
                >
                  {formatedAddress.street}
                  {formatedAddress.number}
                  {formatedAddress.complemento}
                </Typography>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '1.2em',
                    color: '#d3d3d3',
                  }}
                >
                  {formatedAddress.referenceLocation}
                </Typography>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '1.2em',
                    color: '#d3d3d3',
                  }}
                >
                  {formatedAddress.neighboor}
                  {formatedAddress.city}
                  {formatedAddress.state}
                </Typography>
              </div>
              <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                <Typography gutterBottom variant="h5" style={{ color: 'gold' }}>
                  <PriorityHighIcon /> IMPORTANTE
                </Typography>

                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '1.2em',
                    color: '#d3d3d3',
                  }}
                >
                  Quando: {Utils.formatDateTime(eventDateTimeBegin)} ~{' '}
                  {Utils.formatDateTime(eventDateTimeEnd)}
                </Typography>
                <Typography
                  variant="button"
                  display="block"
                  gutterBottom
                  style={{
                    fontSize: '1.2em',
                    color: '#d3d3d3',
                  }}
                >
                  Valor: R$ {eventPrice}
                </Typography>
              </div>
            </div>

            <Divider style={{ marginBottom: '20px' }} />

            {/* Exercises info */}
            <Typography gutterBottom variant="h5">
              <FitnessCenterIcon /> ATIVIDADE
            </Typography>

            <div style={{ marginTop: '10px' }}>
              {exercises.map(({ name, description }, index) => (
                <ExpansionPanel expanded key={index}>
                  <ExpansionPanelSummary>
                    <Typography variant="h6" gutterBottom>
                      {name}
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div
                      style={{
                        display: 'flex',
                        flex: 1,
                      }}
                    >
                      <div style={{ display: 'flex', width: '20%' }}>
                        <img
                          src="https://media.istockphoto.com/vectors/cartoon-people-doing-wrist-extension-stretch-exercise-vector-id540566306"
                          width="100%"
                          height="100%"
                          alt="Activity Example"
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          width: '80%',
                          marginLeft: '45px',
                        }}
                      >
                        <Typography
                          variant="h6"
                          style={{
                            fontSize: '1.1rem',
                            color: '#d3d3d3',
                          }}
                        >
                          {description}
                        </Typography>
                      </div>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </div>
          </>
        )}

        {tab === 1 && (
          <div>
            {paymentMethod && (
              <List style={{ marginBottom: '20px' }}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`****${paymentMethod.cardNumber.slice(-4)}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end">
                      <PaymentIcon />
                    </IconButton>

                    <Typography variant="button" style={{ marginLeft: '10px' }}>
                      {status.length > 0
                        ? status.description
                        : 'Aguardando confirmação'}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            )}
          </div>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            setTab(0);

            handleClose();
          }}
          color="secondary"
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
    }).isRequired,
    paymentMethod: PropTypes.object.isRequired,
    status: PropTypes.array.isRequired,
  }),
};

export default DialogPaymentDetails;
