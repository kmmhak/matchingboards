import { Container, Typography as Text } from '@mui/material';
import React from 'react';
import { contentBox } from '../../styles';

// TODO replace placeholder data
function PersonalInfo({ user, isOwnProfile, numberOfGames }) {
  if (!isOwnProfile) return null;

  return (
    <>
      <Text sx={{ textAlign: 'center' }} variant="h5">
        Email
      </Text>
      <Text sx={{ textAlign: 'center', ...contentBox }} variant="body1">
        {user.email}
      </Text>
      <br />
      <Text variant="h5" sx={{ textAlign: 'center' }}>
        Stats
      </Text>
      <Container sx={contentBox}>
        <Text>
          <b>Rating: </b>4.5 (90)
        </Text>
        <Text>
          <b>Games owned: </b>
          {numberOfGames}
        </Text>
        <Text>
          <b>Play distance: </b>
          {user.distance} km
        </Text>
        <Text>
          <b>Latitude: </b>
          {user.latitude}
        </Text>
        <Text>
          <b>Longitude: </b>
          {user.longitude}
        </Text>
      </Container>
    </>
  );
}

export default PersonalInfo;
