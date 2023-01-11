import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  user: PropTypes.shape({
    userRecipes: PropTypes.array.isRequired,
    username: PropTypes.string,
  }).isRequired,
  children: PropTypes.func.isRequired,
};

export default ProtectedRoute;
