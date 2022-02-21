import { Button } from '@mui/material';
import React from 'react';

function FriendRequestButton({ handleRequest }) {
  return (
    <Button
      onClick={handleRequest}
      color="success"
      sx={{ margin: '1.5rem' }}
      variant="contained"
    >
      Send friend request
    </Button>
  );
}

export default FriendRequestButton;
