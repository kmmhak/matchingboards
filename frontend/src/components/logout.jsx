import { Button } from '@mui/material';
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
    <Button type="submit" onClick={handleLogout} variant="contained">
      Placeholder Logout-button
    </Button>
  );
}

export default Logout;
