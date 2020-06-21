import React, { useState } from 'react';
import PropTypes from 'prop-types';

import LocationOnIcon from '@material-ui/icons/LocationOn';

import DialogStudentGroupDetails from '../../components/DialogStudentGroupDetails';

const Marker = React.memo(function MemodMarker({ studentGroup }) {
  /**
   * Variables and functions to DialogStudentGroupDetails
   */
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

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

      {/* Será exibido após clicar no Pin dentro do mapa */}
      <DialogStudentGroupDetails
        open={open}
        handleClose={handleClose}
        studentGroup={studentGroup}
      />
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
