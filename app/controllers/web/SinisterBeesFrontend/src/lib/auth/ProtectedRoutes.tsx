import { Navigate, useLocation } from 'react-router-dom';
import { paths } from '../../config/path';
import { useEffect, useState } from 'react';
import { HttpHandler } from '../HttpRequestHandler';
import axios from 'axios';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const user = useUser();
  const location = useLocation();
  const [user, updateUser] = useState();
  useEffect(() => {
    const re = async () => {
      const res = await axios.get('http://localhost:5000/auth/getUserSession', {
        withCredentials: true,
      });
      updateUser(() => res.data);
      console.log(user);
    };
    re();
  }, []);

  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
    );
  }

  return children;
};
