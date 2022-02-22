import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function Logout() {
  const navigate = useNavigate();
  const { logout } = useUser();
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Typography variant="white" onClick={handleLogout} >
      Logout
    </Typography>
  );
}

export default Logout;
