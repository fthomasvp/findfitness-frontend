import React, { useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import { useDispatch, useSelector } from 'react-redux';
import { searchStudentGroupRequest } from '../../store/ducks/StudentGroup';
import Marker from '../../components/Marker';

const StudentGroup = () => {
  const MAP_CENTER_POSITION = { lat: -8.05428, lng: -34.8813 };

  const dispatch = useDispatch();

  const { studentGroups, pagination } = useSelector(
    state => state.studentGroup
  );

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
    </div>
  );
};

export default StudentGroup;
