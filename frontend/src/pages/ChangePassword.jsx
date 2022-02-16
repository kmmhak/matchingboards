import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  TextField,
  Paper,
  Button,
  Typography,
  Box,
  Snackbar,
  IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { useUser } from '../contexts/UserContext';

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        variant="filled"
        className="text-input"
        label={props.id}
        style={{
          backgroundColor: 'rgba(228, 212, 179, 0.824)',
          borderRadius: '5px',
          marginTop: '30px',
        }}
        {...field}
        {...props}
        fullWidth
        required
      />
      <br />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}
function ChangePassword() {
  const [openError, setOpenError] = React.useState(false);
  const [openSuccess, setOpenSuccess] = React.useState(false);

  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);

  const { token } = useUser();

  const paperStyle = {
    padding: 30,
    height: 'auto',
    borderRadius: '15px',
    width: 420,
    margin: '20px auto',
    backgroundColor: 'rgba(52, 45, 43, 0.959)',
    color: 'white',
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError(false);
    setOpenSuccess(false);
  };
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  const handleSubmit = (
    { oldPassword, newPassword, confirmNewPassword },
    actions,
  ) => {
    axios
      .put(
        'http://localhost:3001/users/password',
        {
          oldPassword,
          newPassword,
          confirmNewPassword,
        },
        {
          headers: {
            Authorization: `${token}`,
          },
        },
      )
      .then((response) => {
        if (response.status === 200) {
          setSuccess('Password changed successfully!');
          setOpenSuccess(true);
        }
        actions.resetForm();
      })
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        setOpenError(true);
      });
  };
  return (
    <Formik
      initialValues={{
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }}
      validationSchema={Yup.object({
        newPassword: Yup.string()
          .min(8, 'Must be at least 8 characters long')
          .max(20, 'Must be 20 characters or less')
          .required('Required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Please enter a strong password (1 lowercase, 1 uppercase, 1 special character, 1 number)',
          )
          .notOneOf(
            [Yup.ref('oldPassword'), null],
            'Can not be the same as your old password',
          ),
        oldPassword: Yup.string()
          .min(8, 'Must be at least 8 characters long')
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        confirmNewPassword: Yup.string()
          .required('Please confirm your password')
          .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
      })}
      onSubmit={handleSubmit}
    >
      <Paper elevation={10} style={paperStyle}>
        <Box style={{ paddingBottom: '15px' }}>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Change password
          </Typography>
        </Box>
        <Form>
          <MyTextInput
            label="Old Password"
            name="oldPassword"
            id="Old Password"
            type="password"
            placeholder="Old Password"
          />

          <MyTextInput
            label="New Password"
            name="newPassword"
            id="New Password"
            type="password"
            placeholder="New Password"
          />

          <MyTextInput
            label="Confirm New Password"
            name="confirmNewPassword"
            id="Confirm New Password"
            type="password"
            placeholder="Confirm New Password"
          />
          <br />
          <Box style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained">
              Change password
            </Button>
          </Box>
        </Form>
        <Snackbar
          open={openSuccess}
          autoHideDuration={6000}
          onClose={handleClose}
          message={success}
          action={action}
        />
        <Snackbar
          open={openError}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error}
          action={action}
        />
      </Paper>
    </Formik>
  );
}

export default ChangePassword;
