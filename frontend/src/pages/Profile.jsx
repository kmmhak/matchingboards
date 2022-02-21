import React from 'react';
import ProfileInfo from '../components/Profile/ProfileInfo';
import { useUser } from '../contexts/UserContext';

function Profile() {
  const { currentUser } = useUser();

  return <ProfileInfo user={currentUser} isOwnProfile />;
}

export default Profile;
