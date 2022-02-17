import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Paper,
  Button,
  Typography,
  Box,
  IconButton,
  Snackbar,
  Link,
} from '@mui/material/';
import { Close as CloseIcon } from '@mui/icons-material/';
import { useNavigate } from 'react-router-dom';
import MyTextInput from '../components/MyTextInput';

function Register() {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const paperStyle = {
    padding: 30,
    height: 'auto',
    borderRadius: '15px',
    width: 420,
    margin: '20px auto',
    backgroundColor: 'rgba(52, 45, 43, 0.959)',
    color: 'white',
  };
  const [open, setOpen] = React.useState(false);

  const snackbar = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
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

  const handleSubmit = ({ userName, email, password, zipCode }, actions) => {
    axios
      .post('http://localhost:3001/register', {
        userName,
        email,
        password,
        zipCode,
      })
      .then(() => {
        navigate(`/login`);
      })
      .catch((err) => {
        if (err) setError(err.response.data.message);
        snackbar();
      });
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        userName: '',
        zipCode: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(8, 'Must be at least 8 characters long')
          .max(20, 'Must be 20 characters or less')
          .required('Required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            'Please enter a strong password (1 lower case, 1 upper case, 1 special character, 1 number)',
          ),
        userName: Yup.string()
          .min(4, 'Must be at least 4 characters long')
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        confirmPassword: Yup.string()
          .required('Please confirm your password')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
        zipCode: Yup.string()
          .required('Zip code is required')
          .matches(/^[0-9]{5}/, 'Please enter valid zip code'),
      })}
      onSubmit={handleSubmit}
    >
      <Paper elevation={10} style={paperStyle}>
        <Box style={{ paddingBottom: '15px' }}>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Register
          </Typography>
        </Box>
        <Form>
          <MyTextInput
            label="Username"
            name="userName"
            id="Username"
            type="text"
            placeholder="HungryHippo"
          />

          <MyTextInput
            label="Password"
            name="password"
            id="Password"
            type="password"
            placeholder="Password"
          />

          <MyTextInput
            label="Confirm password"
            name="confirmPassword"
            id="Confirm Password"
            type="password"
            placeholder="Confirm password"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            id="Email Address"
            type="email"
            placeholder="HungryHippo@formik.com"
          />

          <MyTextInput
            label="Zip Code"
            name="zipCode"
            id="Zip Code"
            type="number"
            placeholder="00000"
          />
          <Box style={{ textAlign: 'right', margin: '10px' }}>
            <Link href="/login" color="#848482" underline="hover">
              Already have an account? Log in here.
            </Link>
          </Box>
          <Box style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </Form>
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          message={error}
          action={action}
        />
      </Paper>
    </Formik>
  );
}

export default Register;
