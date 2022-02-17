import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import axios from 'axios';

function FriendGroups() {
  const [friends, setFriends] = useState([]);

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
      .get('http://localhost:3001/friends')
      .then((result) => setFriends(result.data));
  }, []);

  return (
    <Box>
      <Paper style={paperStyle}>
        <Typography variant="h4" style={{ textAlign: 'center' }}>
          Friends and friend groups
        </Typography>
        <Grid
          item
          md={8}
          xs={12}
          sx={{ textAlign: 'center', justifyContent: 'center' }}
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
                  <Card
                    style={{
                      maxWidth: 200,
                      backgroundColor: 'rgba(228, 212, 179, 0.824)',
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="190"
                      image={friend.imageUrl}
                      alt={friend.name}
                    />
                    <CardContent>
                      <Typography variant="subtitle1">{friend.name}</Typography>
                    </CardContent>
                  </Card>
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
