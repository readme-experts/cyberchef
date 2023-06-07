import React from 'react';
import { Navigate } from 'react-router-dom';
import { User } from '../services/models/User';

interface Props {
  user: User | null,
  children: React.FunctionComponent | React.JSX.Element
}


const ProtectedRoute = ({ user, children }: Props) => {
  if (!user) {
    return <Navigate to='/login' replace />;
  }
  return <>{children}</>;
};


export default ProtectedRoute;
