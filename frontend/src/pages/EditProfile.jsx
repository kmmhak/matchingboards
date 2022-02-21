import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import ProfileEditForm from '../components/ProfileEditForm';

function EditProfile() {
  const { currentUser, update, token } = useUser();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleEdit = ({
    zipCode,
    description,
    distance,
    latitude,
    longitude,
  }) => {
    currentUser.zipCode = zipCode;
    currentUser.description = description;
    currentUser.distance = distance;
    currentUser.latitude = latitude;
    currentUser.longitude = longitude;

    axios
      .put('http://localhost:3001/users', currentUser, {
        headers: { Authorization: token },
      })
      .then(() => {
        update(currentUser);
        navigate('/profile');
      })
      .catch((err) => {
        setMessage(err.response.data);
        setOpen(true);
      });
  };

  return (
    <>
      <ProfileEditForm
        currentUser={currentUser}
        handleEdit={handleEdit}
        update={update}
      />
      <Snackbar
        open={open}
        autoHideDuration={2500}
        onClose={() => setOpen(false)}
        message={message}
      />
    </>
  );
}

export default EditProfile;
