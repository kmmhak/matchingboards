import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Paper, Button, Typography, Box, Link, Snackbar } from '@mui/material';
import { useUser } from '../contexts/UserContext';
import MyTextInput from '../components/MyTextInput';

function Login() {
  const { login } = useUser();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const paperStyle = {
    padding: 30,
    height: 'auto',
    borderRadius: '15px',
    width: 420,
    margin: '20px auto',
    backgroundColor: 'rgba(52, 45, 43, 0.959)',
    color: 'white',
  };

  const handleSubmit = ({ email, password }, actions) => {
    setError(null);
    axios
      .post('http://localhost:3001/login', {
        email,
        password,
      })
      .then((response) => {
        const { token, user } = response.data;
        login(user, token);
        navigate('/');
      })
      .catch((err) => {
        if (err && err.response) setError(err.response.data.message);
        setOpen(true);
        actions.resetForm();
      });
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required'),
      })}
      onSubmit={handleSubmit}
    >
      <Paper elevation={10} style={paperStyle}>
        <Box style={{ paddingBottom: '15px' }}>
          <Typography variant="h4" style={{ textAlign: 'center' }}>
            Login
          </Typography>
        </Box>
        <Form>
          <MyTextInput
            id="Email"
            name="email"
            type="email"
            placeholder="HungryHippo@formik.com"
          />
          <MyTextInput
            id="Password"
            name="password"
            type="password"
            placeholder="********"
          />
          <Box style={{ textAlign: 'right' }}>
            <Link href="/register" color="#848482" underline="hover">
              Register here
            </Link>
          </Box>
          <Box style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Box>
        </Form>
        <Snackbar
          open={open}
          autoHideDuration={2500}
          onClose={handleClose}
          message={error}
        />
      </Paper>
    </Formik>
  );
}

export default Login;
