import { Typography as Text } from '@mui/material';
import React from 'react';
import { contentBox } from '../../styles';

// TODO replace placeholder data
function PublicInfo({ user }) {
  return (
    <>
      <Text sx={{ textAlign: 'center' }} variant="h5">
        Username
      </Text>
      <Text sx={{ textAlign: 'center', ...contentBox }}>{user.userName}</Text>
      <br />
      <Text sx={{ textAlign: 'center' }} variant="h5">
        About me
      </Text>
      <Text sx={{ textAlign: 'center', ...contentBox }}>
        {user.description || 'Nothing yet...'}
      </Text>
    </>
  );
}

export default PublicInfo;
