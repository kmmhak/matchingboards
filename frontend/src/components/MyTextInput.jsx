import { TextField } from '@mui/material';
import { useField } from 'formik';

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

export default MyTextInput;
