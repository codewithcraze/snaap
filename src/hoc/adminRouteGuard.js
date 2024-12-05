// AgentRouteGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRouteGuard = ({ children }) => {
  const users = useSelector((state) => state.users); // Assuming state.user contains the user info

  if (users.data.roleId < 3) {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default AdminRouteGuard;
