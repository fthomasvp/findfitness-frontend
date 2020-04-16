import React from 'react';
import { faStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user from '../../assets/images/user.webp';
import { SInformation, SProfile, SProfileInformation } from './styles';

const Profile = () => {
  return (
    <>
      <SProfile>
        <img src={user} alt="User" />
        <p>Fellipe Thomás</p>
      </SProfile>
      <SProfileInformation>
        <SInformation>
          <FontAwesomeIcon
            icon={faStar}
            style={{ height: '45px', marginRight: '5px' }}
          />
          <p>4.5</p>
        </SInformation>

        <SInformation>
          <FontAwesomeIcon
            icon={faUsers}
            style={{ height: '45px', marginRight: '5px' }}
          />
          <p>Qtd aulas</p>
        </SInformation>
      </SProfileInformation>
    </>
  );
};

export default Profile;
