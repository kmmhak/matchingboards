import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import MultiLineInput from './MultiLineInput';
import MyTextInput from './MyTextInput';
import UpdateLocationButton from './UpdateLocationButton';

function ProfileEditForm({ handleEdit, currentUser, update }) {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const paperStyle = {
    padding: 30,
    height: 'auto',
    borderRadius: '15px',
    width: 420,
    margin: '20px auto',
    backgroundColor: 'rgba(52, 45, 43, 0.959)',
    color: 'white',
  };

  const handleLocationUpdate = () => {
    const geo = navigator.geolocation;
    geo.getCurrentPosition(
      (pos) => {
        const user = currentUser;
        user.latitude = pos.coords.latitude;
        user.longitude = pos.coords.longitude;
        update(user);
        navigate('/');
        navigate('/edit-profile');
      },
      (error) => setMessage(error.response.data),
    );
  };

  return (
    <Formik
      initialValues={{
        zipCode: currentUser?.zipCode,
        description: currentUser?.description,
        distance: currentUser?.distance,
        latitude: currentUser?.latitude,
        longitude: currentUser?.longitude,
      }}
      validationSchema={Yup.object({
        zipCode: Yup.string()
          .required('Zip code is required')
          .matches(/^[0-9]{5}/, 'Please enter valid zip code'),
        description: Yup.string().required('Required'),
        distance: Yup.number().required('Required'),
        latitude: Yup.number().required('Required'),
        longitude: Yup.number().required('Required'),
      })}
      onSubmit={handleEdit}
    >
      <Paper elevation={10} style={paperStyle}>
        <Box style={{ paddingBottom: '15px' }}>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Edit profile
          </Typography>
        </Box>
        <Form>
          <MyTextInput
            label="Zip Code"
            name="zipCode"
            id="Zip Code"
            type="number"
            placeholder="00000"
          />
          <MultiLineInput
            label="Description"
            name="description"
            id="Description"
            type="text"
          />
          <MyTextInput
            label="Distance"
            name="distance"
            id="Distance"
            type="number"
            placeholder="00000"
          />
          <br />
          <Typography variant="h6" style={{ textAlign: 'center' }}>
            Location
          </Typography>
          <Divider sx={{ background: 'grey' }} />
          <br />
          <UpdateLocationButton handleLocationUpdate={handleLocationUpdate} />
          <MyTextInput
            label="Latitude"
            name="latitude"
            id="Latitude"
            type="number"
            placeholder="00000"
          />
          <MyTextInput
            label="Longitude"
            name="longitude"
            id="longitude"
            type="number"
            placeholder="00000"
          />
          <br />
          <Box style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained">
              Edit
            </Button>{' '}
            <Button
              variant="contained"
              color="error"
              onClick={() => navigate('/profile')}
            >
              Cancel
            </Button>
          </Box>
          {message}
        </Form>
      </Paper>
    </Formik>
  );
}

export default ProfileEditForm;
