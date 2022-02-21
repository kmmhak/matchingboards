import { Button } from '@mui/material';
import React from 'react';

function UpdateLocationButton({ handleLocationUpdate }) {
  return (
    <Button onClick={handleLocationUpdate} color="success" variant="contained">
      Update to current position
    </Button>
  );
}

export default UpdateLocationButton;
