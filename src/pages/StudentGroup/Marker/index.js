import React from 'react';
import PropTypes from 'prop-types';

const Marker = props => {
  const { icon, personalName } = props;

  return (
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
    >
      <img src={icon} style={{ width: '25px', height: '30px' }} />
      {personalName}
    </div>
  );
};

Marker.propTypes = {
  icon: PropTypes.any.isRequired,
  personalName: PropTypes.string,
};

export default Marker;
