import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import * as StudentGroupReducer from '../../store/ducks/student_group';
import DialogAddStudentGroup from './DialogAddStudentGroup';
import DialogStudentGroupDetails from '../../components/DialogStudentGroupDetails';

const StudentGroup = () => {
  const dispatch = useDispatch();

  const { studentGroups, pagination, activeStep } = useSelector(
    state => state.studentGroup
  );

  const user = useSelector(state => state.auth.user);

  const [MAP_CENTER_POSITION, setMapCenterPosition] = useState({
    lat: -8.05428,
    lng: -34.8813,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = useCallback(async () => {
    await setOpen(false);

    if (activeStep !== 0) {
      await dispatch(StudentGroupReducer.clearCreateStudentGroupData());

      await dispatch(StudentGroupReducer.searchStudentGroupRequest(pagination));
    }
  }, [dispatch, pagination, activeStep]);

  /**
   * Variables and functions to DialogStudentGroupDetails
   */
  const [openDialogDetails, setOpenDialogDetails] = useState(false);
  const [selectedStudentGroupIndex, setSelectedStudentGroupIndex] = useState(
    null
  );

  const handleCloseDialogDetails = useCallback(
    () => setOpenDialogDetails(false),
    []
  );

  /**
   * Effects
   */
  useEffect(() => {
    dispatch(StudentGroupReducer.searchStudentGroupRequest(pagination));
  }, [dispatch, pagination]);

  // Get user's latitude and longitude
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      setMapCenterPosition({
        lat,
        lng,
      });
    });
  }, []);

  return (
    <div style={{ width: '100%', height: '85%' }}>
      <GoogleMapReact
        // eslint-disable-next-line no-undef
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        center={MAP_CENTER_POSITION} // defaultCenter prop needs a constant object
        defaultZoom={13}
        options={{ fullscreenControl: false, zoomControl: false }}
      >
        {studentGroups?.map(({ latitude, longitude }, index) => (
          <IconButton
            key={index}
            lat={latitude}
            lng={longitude}
            onClick={() => {
              setOpenDialogDetails(true);

              setSelectedStudentGroupIndex(index);
            }}
            style={{
              position: 'absolute',
              transform: 'translate(-50%, -50%)',
            }}
          >
            <LocationOnIcon fontSize="large" style={{ color: '#51389b' }} />
          </IconButton>
        ))}
      </GoogleMapReact>

      {user.profile !== 'ROLE_STUDENT' && (
        <Fab
          aria-label="add"
          color="primary"
          style={{
            position: 'absolute',
            bottom: '150px',
            right: '100px',
          }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      )}

      {studentGroups && studentGroups[selectedStudentGroupIndex] && (
        <DialogStudentGroupDetails
          open={openDialogDetails}
          handleClose={handleCloseDialogDetails}
          studentGroup={studentGroups[selectedStudentGroupIndex]}
        />
      )}

      <DialogAddStudentGroup open={open} handleClose={handleClose} />
    </div>
  );
};

export default StudentGroup;
