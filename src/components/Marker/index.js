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
import PhoneIcon from '@material-ui/icons/Phone';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import PersonIcon from '@material-ui/icons/Person';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import Badge from '@material-ui/core/Badge';
import GroupIcon from '@material-ui/icons/Group';

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

const Marker = React.memo(function Marker({ studentGroup }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const {
    completeAddress,
    exercises,
    eventDateTimeBegin,
    eventDateTimeEnd,
    eventPrice,
    maxStudentGroupAmount,
    personal,
    students,
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
        <LocationOnIcon color="secondary" fontSize="large" />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        onBackdropClick={() => setOpen(false)}
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
          {/* Personal info */}
          <Typography gutterBottom variant="h5" align="center">
            <PersonIcon /> PERSONAL
          </Typography>
          <Avatar alt={'Personal profile'} style={{ marginLeft: '48%' }}>
            {personal.name[0]}
          </Avatar>
          <Typography
            variant="h6"
            align="center"
            style={{
              fontSize: '1.2em',
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
              }}
            >
              {Utils.formatPhone(contactPhone)}
            </Typography>
          </div>
          <Typography
            align="center"
            style={{ marginBottom: '20px', fontSize: '1.2em' }}
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
                }}
              >
                {formatedAddress.street}, {formatedAddress.number} -{' '}
                {formatedAddress.complemento}
              </Typography>
              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{
                  fontSize: '1.2em',
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
                }}
              >
                {formatedAddress.neighboor}, {formatedAddress.city} -{' '}
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
                  width: '60%',
                  fontSize: '1.2em',
                }}
              >
                Vagas restantes:{' '}
                {students && students.length > 0 ? (
                  <Badge
                    badgeContent={maxStudentGroupAmount - students.length}
                    color="primary"
                  >
                    <GroupIcon />
                  </Badge>
                ) : (
                  <Badge badgeContent={maxStudentGroupAmount} color="primary">
                    <GroupIcon />
                  </Badge>
                )}
              </Typography>

              <Typography
                variant="button"
                display="block"
                gutterBottom
                style={{
                  fontSize: '1.2em',
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
                }}
              >
                Valor: R${eventPrice}
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
                  <Typography
                    variant="h6"
                    style={{
                      fontSize: '1.2em',
                    }}
                  >
                    {description}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        </DialogContent>

        <DialogActions>
          <Button autoFocus onClick={handleClose} color="secondary">
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleClose} color="primary">
            Participar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

Marker.propTypes = {
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
    }).isRequired,
    students: PropTypes.array,
  }).isRequired,
};

export default Marker;
