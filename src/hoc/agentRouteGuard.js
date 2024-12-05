// AgentRouteGuard.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AgentRouteGuard = ({ children }) => {
  const users = useSelector((state) => state.users); // Assuming state.user contains the user info
  if (users.data.role === 'agent') {
    return children;
  } else {
    return <Navigate to="/unauthorized" />;
  }
};

export default AgentRouteGuard;
