import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

function FriendGroups() {
  const [friends, setFriends] = useState([]);
  const { currentUser } = useUser();

  const { id } = currentUser.id;

  const paperStyle = {
    padding: 30,
    height: 'auto',
    borderRadius: '15px',
    width: '50vw',
    margin: '20px auto',
    backgroundColor: 'rgba(52, 45, 43, 0.959)',
    color: 'white',
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/friends/${id}`)
      .then((response) => setFriends(response.data));
  }, []);

  return (
    <Box>
      <Paper style={paperStyle}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Friends and friend groups
        </Typography>
        <Grid
          item
          md="auto"
          xs="auto"
          style={{ textAlign: 'center', justifyContent: 'center' }}
        >
          <br />
          <br />
          <Typography style={{ textAlign: 'center' }} variant="h4">
            Friends
          </Typography>
          <Box style={{ margin: '15px' }}>
            <Grid container spacing={2} style={{ justifyContent: 'center' }}>
              {friends.map((friend) => (
                <Grid item key={friend.id} style={{ textAlign: 'center' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <List>
                        <ListItem>
                          <ListItemAvatar />
                          <Avatar
                            src={friend.imageUrl}
                            variant="rounded"
                            style={{ margin: 10 }}
                          />
                          <Typography variant="h5">{friend.name}</Typography>
                        </ListItem>
                      </List>
                    </Grid>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Box>
          <hr />
          <Typography style={{ textAlign: 'center' }} variant="h4">
            Friend Groups
          </Typography>
          <br />
        </Grid>
      </Paper>
    </Box>
  );
}

export default FriendGroups;
