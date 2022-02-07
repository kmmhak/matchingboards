import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

function ProtectedRoute() {
  const { loggedIn } = useUser();

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
