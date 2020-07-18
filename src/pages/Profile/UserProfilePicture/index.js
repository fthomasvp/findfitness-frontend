import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import * as AuthReducer from '../../../store/ducks/auth';
import { useGlobalStyles } from '../../../global/styles';
import Alert from '../../../components/Alert';

const UserProfilePicture = ({ id, profilePicture, profile }) => {
  const dispatch = useDispatch();
  const globalClasses = useGlobalStyles();

  /**
   * Profile picture field
   */
  const [imageFile, setImageFile] = useState(null);

  const [showInputField, setShowInputField] = useState(false);

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
  }, [error, response, dispatch, profile, id]);

  return (
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
        Clique no pequeno ícone da câmera para alterar sua foto :)
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
              <AddAPhotoIcon fontSize="large" color="primary" />
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
          <Button
            color="secondary"
            variant="outlined"
            onClick={clearProfilePictureFields}
            className={globalClasses.secondaryButton}
          >
            Cancelar
          </Button>
        )}

        <Button
          color="primary"
          variant="contained"
          onClick={handleClickUpload}
          disabled={imageFile === null}
          className={globalClasses.primaryButton}
        >
          Atualizar
        </Button>
      </div>

      <Alert
        open={openAlert}
        handleClose={handleCloseAlert}
        growTransition={growTransition}
        message={alertMessage}
        severity={severity}
      />
    </Paper>
  );
};

UserProfilePicture.propTypes = {
  id: PropTypes.number.isRequired,
  profilePicture: PropTypes.string,
  profile: PropTypes.string.isRequired,
};

export default UserProfilePicture;
