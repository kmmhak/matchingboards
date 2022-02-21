import { React, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../contexts/UserContext';

function DeleteAccount() {
  const [openAlert, setOpenAlert] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token, logout, currentUser } = useUser();

  const handleClickDeleteButton = () => {
    setOpenAlert(true);
  };
  const handleCancelDelete = () => {
    setOpenAlert(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleDeleteAccount = () => {
    axios
      .delete(`http://localhost:3001/users/${currentUser.id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then(() => {
        logout();
        navigate('/register');
      })
      .catch((err) => {
        if (err && err.response) setError(err.response.data);
        setOpenSnackbar(true);
      });
  };

  return (
    <>
      <Button onClick={handleClickDeleteButton} variant="contained">
        Placeholder delete account button
      </Button>
      <Dialog
        open={openAlert}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ backgroundColor: 'rgba(228, 212, 179, 0.824)' }}
        >
          Delete account?
        </DialogTitle>
        <DialogContent
          style={{ backgroundColor: 'rgba(228, 212, 179, 0.824)' }}
        >
          <DialogContentText id="alert-dialog-description">
            This will delete all your saved games and sessions as well as clear
            out your friend list.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ backgroundColor: 'rgba(228, 212, 179, 0.824)' }}
        >
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleDeleteAccount} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        message={error}
      />
    </>
  );
}

export default DeleteAccount;
