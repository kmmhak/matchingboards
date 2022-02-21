import React from 'react';
import { contentColor } from '../../styles';
import picture from '../../assets/anonymous.png';

function ProfilePicture() {
  return (
    <img
      style={{
        width: '10rem',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '4rem',
        display: 'block',
        borderRadius: '50%',
        ...contentColor,
      }}
      src={picture}
      alt="profile"
    />
  );
}

export default ProfilePicture;
