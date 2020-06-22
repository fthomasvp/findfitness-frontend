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
import Alert from '../../components/Alert';

import * as AuthReducer from '../../store/ducks/Auth';

const Profile = () => {
  const dispatch = useDispatch();

  const { profilePicture, profile, id } = useSelector(state => state.auth.user);

  const [imageFile, setImageFile] = useState(null);

  const [showInputField, setShowInputField] = useState(false);

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
    // Only for uploadProfilePicture
    if (error && error.status !== 200) {
      setAlertMessage(error.data?.message || error.message);
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('error');
    }

    if (response && response.status === 200) {
      setAlertMessage('A sua foto foi atualizada');
      setOpenAlert(true);
      setGrowTransition(true);
      setSeverity('success');

      clearProfilePictureFields();
    }
  }, [error, response]);

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
              Concluir
            </Button>
          </div>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <Paper>xs=12</Paper>
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
