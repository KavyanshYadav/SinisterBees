import { Navigate, useLocation } from 'react-router-dom';
import { paths } from '../../config/path';
import { useEffect, useState } from 'react';
import { HttpHandler } from '../HttpRequestHandler';
import axios from 'axios';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // const user = useUser();
  const location = useLocation();
  const [user, updateUser] = useState();
  const [loading,setloading] = useState(true);
  useEffect(() => {
    const re = async () => {
      const res = await axios.get('http://localhost:5000/auth/getUserSession', {
        withCredentials: true,
      });
      updateUser(() => res.data);
      setloading(()=>false)
    };
    re();


  }, []);
  if(loading){
    return <div>Loading</div>
  }
  if (!user) {
    return (
      <Navigate to={paths.auth.login.getHref(location.pathname)} replace />
      // <h1>{JSON.stringify(user?.data)}</h1>
    );
  }

  return children;
};
