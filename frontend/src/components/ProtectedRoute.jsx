import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function ProtectedRoute() {
  const [isLoading, setIsLoading] = useState(true);
  const { login } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');

    axios
      .get('http://localhost:3001/authenticate', {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        const { user } = response.data;
        login(user, token);
        setIsLoading(false);
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);

  return !isLoading ? <Outlet /> : <p>Loading...</p>;
}

export default ProtectedRoute;
