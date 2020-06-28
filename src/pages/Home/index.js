import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DialogAddStudentGroup from './DialogAddStudentGroup';
import DialogStudentGroupDetails from '../../components/DialogStudentGroupDetails';
import * as StudentGroupReducer from '../../store/ducks/StudentGroup';

const StudentGroup = () => {
  const dispatch = useDispatch();

  const { studentGroups, pagination } = useSelector(
    state => state.studentGroup
  );

  const user = useSelector(state => state.auth.user);

  const [MAP_CENTER_POSITION, setMapCenterPosition] = useState({
    lat: -8.05428,
    lng: -34.8813,
  });

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);

    dispatch(StudentGroupReducer.clearCreateStudentGroupData());
  };

  /**
   * Variables and functions to DialogStudentGroupDetails
   */
  const [openDialogDetails, setOpenDialogDetails] = useState(false);
  const [selectedStudentGroupIndex, setSelectedStudentGroupIndex] = useState(
    null
  );

  const handleCloseDialogDetails = () => setOpenDialogDetails(false);

  /**
   * About Google Maps (Markers...)
   */
  const handleApiLoaded = (map, maps) => {
    studentGroups.forEach((studentGroup, index) => {
      const { id, latitude: lat, longitude: lng } = studentGroup;

      const marker = new maps.Marker({
        title: `Aula ${id}`,
        animation: maps.Animation.DROP,
        position: { lat, lng },
        map,
      });

      // Trigger DialogDetails by click on Marker
      marker.addListener('click', () => {
        setOpenDialogDetails(true);

        setSelectedStudentGroupIndex(index);
      });

      // Places search

      // Create the autocomplete object, restricting the search predictions to
      // geographical location types.
      // const autocomplete = new maps.places.Autocomplete(
      //   document.getElementById('autocomplete'),
      //   { types: ['geocode'] }
      // );

      // // Avoid paying for data that you don't need by restricting the set of
      // // place fields that are returned to just the address components.
      // autocomplete.setFields(['address_component']);

      // // When the user selects an address from the drop-down, populate the
      // // address fields in the form.
      // autocomplete.addListener('place_changed', evt => {
      //   console.log('places', evt);
      // });
    });
  };

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
        yesIWantToUseGoogleMapApiInternals={true}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        options={{ fullscreenControl: false, zoomControl: false }}
      />

      {user.profile !== 'ROLE_STUDENT' && (
        <Fab
          aria-label="add"
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
