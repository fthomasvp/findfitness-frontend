import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PhoneIcon from '@material-ui/icons/Phone';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Pin from '../../assets/images/google_maps_pin.png';
import Utils from '../../utils';

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

const Marker = ({ studentGroup }) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const {
    completeAddress,
    exercises,
    eventDate,
    eventDuration,
    eventPrice,
    maxStudentGroupAmount,
    minStudentGroupAmount,
    personal,
    contactPhone,
  } = studentGroup;

  const formatedAddress = Utils.formatAddress(completeAddress);

  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '18px',
          height: '18px',
          userSelect: 'none',
          transform: 'translate(-50%, -50%)',
        }}
        onClick={() => setOpen(true)}
      >
        <img
          alt="Pin icon"
          src={Pin}
          style={{ width: '25px', height: '30px' }}
        />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="student_group-details"
        maxWidth={'md'}
        fullWidth
      >
        <DialogTitle
          id="student_group-details"
          onClose={handleClose}
          style={{ textAlign: 'center' }}
        >
          Detalhes da aula
        </DialogTitle>
        <DialogContent dividers>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '50%' }}>
              <Typography gutterBottom variant="h6">
                Endereço
              </Typography>
              <Typography>
                {formatedAddress.street}, {formatedAddress.number} -{' '}
                {formatedAddress.complemento}
              </Typography>
              <Typography>{formatedAddress.referenceLocation}</Typography>
              <Typography>
                {formatedAddress.neighboor}, {formatedAddress.city} -{' '}
                {formatedAddress.state}
              </Typography>
            </div>
            <div style={{ width: '50%' }}>
              <Typography gutterBottom variant="h6">
                Importante !
              </Typography>
              <Typography>
                Mínimo de {minStudentGroupAmount} pessoas | Máximo de{' '}
                {maxStudentGroupAmount} pessoas
              </Typography>
              <Typography>
                Quando: {Utils.formatDateTime(eventDate)} | Duração:{' '}
                {eventDuration} minutos
              </Typography>
              <Typography>Valor: R${eventPrice}</Typography>
            </div>
          </div>

          <Divider style={{ marginBottom: '5px' }} />

          <Typography gutterBottom variant="h6">
            Exercícios
          </Typography>
          <div style={{ marginTop: '10px' }}>
            {exercises.map(({ name, description }, index) => (
              <ExpansionPanel key={index}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography variant="subtitle1">{description}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>

          <Divider style={{ marginBottom: '5px' }} />

          <Typography gutterBottom variant="h6" align="center">
            Personal
          </Typography>
          <Avatar alt={'Personal profile'} style={{ marginLeft: '48%' }}>
            {personal.name[0]}
          </Avatar>
          <Typography variant="h6" align="center">
            {personal.name}
          </Typography>
          <Typography align="center">
            <PhoneIcon />
            {Utils.formatPhone(contactPhone)}
          </Typography>
          <Typography align="center">CREF: {personal.cref}</Typography>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleClose} color="primary">
            Entrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Marker.propTypes = {
  studentGroup: PropTypes.shape({
    completeAddress: PropTypes.string.isRequired,
    contactPhone: PropTypes.string.isRequired,
    eventDate: PropTypes.string.isRequired,
    eventDuration: PropTypes.number.isRequired,
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
    }).isRequired,
  }).isRequired,
};

export default Marker;
