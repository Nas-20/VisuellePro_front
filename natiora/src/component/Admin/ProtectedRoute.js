// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    console.log('Redirection vers /');
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
