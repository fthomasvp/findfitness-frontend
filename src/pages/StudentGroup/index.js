import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoogleMapReact from 'google-map-react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import DialogAddStudentGroup from './DialogAddStudentGroup';
import Marker from '../../components/Marker';
import {
  searchStudentGroupRequest,
  clearCreateStudentGroupData,
} from '../../store/ducks/StudentGroup';
import { searchExercisesRequest } from '../../store/ducks/Exercise';

const StudentGroup = () => {
  const MAP_CENTER_POSITION = { lat: -8.05428, lng: -34.8813 };

  const dispatch = useDispatch();

  const { studentGroups, pagination } = useSelector(
    state => state.studentGroup
  );

  const { pagination: exercisePagination } = useSelector(
    state => state.exercise
  );

  const { user } = useSelector(state => state.auth);

  // Persistir estado no Redux
  const [open, setOpen] = useState(false);

  const handleOpen = async () => {
    await dispatch(searchExercisesRequest(exercisePagination));

    await setOpen(true);
  };

  const handleClose = async () => {
    await setOpen(false);

    await dispatch(clearCreateStudentGroupData());
  };

  useEffect(() => {
    (async () => {
      await dispatch(searchStudentGroupRequest(pagination));
    })();
  }, [dispatch, pagination]);

  return (
    <div style={{ width: '100%', height: '100%', padding: '1px' }}>
      <GoogleMapReact
        // eslint-disable-next-line no-undef
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={MAP_CENTER_POSITION}
        defaultZoom={13}
        options={{ fullscreenControl: false, zoomControl: false }}
      >
        {studentGroups.map((studentGroup, index) => {
          return (
            <Marker
              key={index}
              lat={studentGroup.latitude}
              lng={studentGroup.longitude}
              studentGroup={studentGroup}
            />
          );
        })}
      </GoogleMapReact>

      {user.profile !== 'ROLE_STUDENT' && (
        <Fab
          aria-label="add"
          style={{
            position: 'absolute',
            top: '80%',
            left: '90%',
          }}
          onClick={handleOpen}
        >
          <AddIcon />
        </Fab>
      )}
      <DialogAddStudentGroup open={open} handleClose={handleClose} />
    </div>
  );
};

export default StudentGroup;
