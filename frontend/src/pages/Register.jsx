import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { TextField, Paper, Button, Typography, Box } from '@mui/material/';

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

function Register() {
  const paperStyle = {
    padding: 30,
    height: 'auto',
    borderRadius: '15px',
    width: 420,
    margin: '20px auto',
    backgroundColor: 'rgba(52, 45, 43, 0.959)',
    color: 'white',
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
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
            'Please enter a strong password',
          ),
        username: Yup.string()
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
      onSubmit={async () => {
        await axios
          .post('TODO: connect to a database', {
            username: '',
            email: '',
            password: '',
            zipCode: '',
          })
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
      }}
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
            name="username"
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
          <br />
          <Box style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained">
              Register
            </Button>
          </Box>
        </Form>
      </Paper>
    </Formik>
  );
}

export default Register;
