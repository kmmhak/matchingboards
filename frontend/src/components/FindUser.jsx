import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FindUser() {
  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-basic"
        label="Search by username"
        variant="outlined"
        style={{ backgroundColor: 'rgba(228, 212, 179, 0.824)' }}
      />
    </Box>
  );
}
