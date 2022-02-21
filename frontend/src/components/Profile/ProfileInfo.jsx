import {
  Container,
  Divider,
  Grid,
  Snackbar,
  Typography as Text,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { altStyle } from '../../styles';
import PersonalInfo from './PersonalInfo';
import GameList from './GameList';
import ProfilePicture from './ProfilePicture';
import FriendRequestButton from './FriendRequestButton';
import EditProfileButton from './EditProfileButton';
import PublicInfo from './PublicInfo';
import { useUser } from '../../contexts/UserContext';

// TODO get users own games when its implemented
function ProfileInfo({ user, isOwnProfile }) {
  const [games, setGames] = useState([]);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const { token } = useUser();

  useEffect(() => {
    axios
      .get('http://localhost:3001/games')
      .then((result) => {
        if (result.data.length > 0) {
          setGames(result.data);
        }
      })
      .catch((err) => {
        setOpen(true);
        setMessage(err.response.data);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFriendRequest = () => {
    axios
      .post(
        'http://localhost:3001/friends/add',
        { receiverId: user.id },
        {
          headers: {
            Authorization: token,
          },
        },
      )
      .catch((err) => {
        setOpen(true);
        setMessage(err.response.data);
      });
  };

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
          {isOwnProfile ? (
            <EditProfileButton />
          ) : (
            <FriendRequestButton handleRequest={handleFriendRequest} />
          )}
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
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={handleClose}
        message={message}
      />
      <br />
    </Container>
  );
}

export default ProfileInfo;
