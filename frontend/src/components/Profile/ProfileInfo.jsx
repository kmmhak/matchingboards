import { Container, Divider, Grid, Typography as Text } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { altStyle } from '../../styles';
import PersonalInfo from './PersonalInfo';
import GameList from './GameList';
import ProfilePicture from './ProfilePicture';
import FriendRequestButton from './FriendRequestButton';
import EditProfileButton from './EditProfileButton';
import PublicInfo from './PublicInfo';

// TODO get users own games when its implemented
function ProfileInfo({ user, isOwnProfile }) {
  const [games, setGames] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/games')
      .then((result) => {
        if (result.data.length > 0) {
          setGames(result.data);
        }
      })
      .catch((err) => setMessage(err.response.data));
  }, []);

  return (
    <Container style={altStyle}>
      <Text sx={{ display: 'inline' }} variant="h2">
        Character sheet
      </Text>
      <Grid container spacing={4}>
        <Grid item md={4} xs={12}>
          <br />
          <ProfilePicture />
          <br />
          <PublicInfo user={user} />
          <br />
          <PersonalInfo
            user={user}
            isOwnProfile={isOwnProfile}
            numberOfGames={games.length}
          />
          {isOwnProfile ? <EditProfileButton /> : <FriendRequestButton />}
        </Grid>
        <Grid
          item
          md={8}
          xs={12}
          sx={{ textAlign: 'center', justifyContent: 'center' }}
        >
          <br />
          <br />
          <Text sx={{ textAlign: 'center' }} variant="h4">
            Owned games
          </Text>
          <Divider sx={{ background: 'grey', marginTop: '0.3rem' }} />
          <br />
          <GameList games={games} />
          {message}
        </Grid>
      </Grid>
      <br />
    </Container>
  );
}

export default ProfileInfo;
