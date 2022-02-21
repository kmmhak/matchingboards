import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function EditProfileButton() {
  const navigate = useNavigate();

  return (
    <Button
      sx={{ margin: '1.5rem' }}
      variant="contained"
      onClick={() => navigate('/edit-profile')}
    >
      Edit profile
    </Button>
  );
}

export default EditProfileButton;
