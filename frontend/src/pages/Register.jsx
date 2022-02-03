import React from 'react';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function MyTextInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
}

function Register() {
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
      <Form>
        <MyTextInput
          label="Username"
          name="username"
          type="text"
          placeholder="HungryHippo"
        />

        <MyTextInput
          label="Password"
          name="password"
          type="password"
          placeholder="Password"
        />

        <MyTextInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
        />

        <MyTextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="HungryHippo@formik.com"
        />

        <MyTextInput
          label="Zip Code"
          name="zipCode"
          type="number"
          placeholder="00000"
        />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}

export default Register;
