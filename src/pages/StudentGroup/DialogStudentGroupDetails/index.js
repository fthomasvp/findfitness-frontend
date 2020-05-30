import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

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
import Badge from '@material-ui/core/Badge';
import GroupIcon from '@material-ui/icons/Group';

import Utils from '../../../utils';
import PersonalPicture from '../../../assets/images/guilian-fremaux-personal.jpg';
import { DialogTitle, DialogContent, DialogActions } from './styles';
import DialogEnrollStudentGroup from '../../StudentGroup/DialogEnrollStudentGroup';

const DialogStudentGroupDetails = ({ open, handleClose, studentGroup }) => {
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

  const profile = useSelector(state => state.auth.user.profile);

  // This will be valid only if the user is a Student
  const idStudent = useSelector(state => state.auth.user.id);

  /**
   * Variables and functions to DialogEnrollStudentGroup
   */
  const [openDialogEnroll, setOpenDialogEnroll] = useState(false);

  const handleCloseDialogEnroll = () => setOpenDialogEnroll(false);

  const isEnrolledStudent = () => {
    const hasStudent = studentGroup.students.filter(
      student => student.id === idStudent
    );

    return hasStudent.length > 0;
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      onBackdropClick={handleClose}
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
        <Avatar
          src={PersonalPicture} // Mock picture
          alt={'Personal profile'}
          style={{ marginLeft: '48%', width: '48px', height: '48px' }}
        />
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
          style={{ marginBottom: '20px', fontSize: '1.2em', color: '#d3d3d3' }}
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
              {formatedAddress.street}, {formatedAddress.number} -{' '}
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
                color: '#d3d3d3',
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
                    color: '#d3d3d3',
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
          {!isEnrolledStudent() ? 'Cancelar' : 'Voltar'}
        </Button>
        {profile === 'ROLE_STUDENT' && !isEnrolledStudent() && (
          <Button
            variant="contained"
            onClick={() => setOpenDialogEnroll(true)}
            color="primary"
          >
            Participar
          </Button>
        )}
      </DialogActions>

      {/* Exibir apenas quando o usuário clicar no botão de PARTICIPAR */}
      <DialogEnrollStudentGroup
        openDialogEnroll={openDialogEnroll}
        setOpenDialogEnroll={setOpenDialogEnroll}
        handleCloseDialogEnroll={handleCloseDialogEnroll}
        handleClose={handleClose}
        idStudentGroup={studentGroup.id}
        idStudent={idStudent}
      />
    </Dialog>
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
    }).isRequired,
    students: PropTypes.array,
  }).isRequired,
};

export default DialogStudentGroupDetails;
