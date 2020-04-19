import React from 'react';
import GoogleMapReact from 'google-map-react';

const MarkerExample = ({ text }) => (
  <div
    style={{
      color: 'white',
      background: 'grey',
      padding: '15px 10px',
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '100%',
      transform: 'translate(-50%, -50%)',
    }}
  >
    {text}
  </div>
);

const StudentGroup = () => {
  const centerPernambuco = { lat: -8.05428, lng: -34.8813 };

  return (
    <div style={{ width: '100%', height: '100%', padding: '1px' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={centerPernambuco}
        defaultZoom={13}
      >
        <MarkerExample lat={-8.0315782} lng={-34.9177016} text="My Marker" />
      </GoogleMapReact>
    </div>
  );
};

export default StudentGroup;
