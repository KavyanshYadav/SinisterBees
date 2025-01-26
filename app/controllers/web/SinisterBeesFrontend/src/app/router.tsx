import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { paths } from '../config/path';
import NotFound from './not-found';
import LoginButtons from '../pages/pagesComp/logincomp/LoginButtons';
import { ProtectedRoute } from '../lib/auth/ProtectedRoutes';

function AppRouter() {
  // const CreateRouterAuto = () =>{

  // }

  const Router = createBrowserRouter(
    [
      {
        path: paths.home.path,
        element: <paths.home.component />,
      },
      {
        path: paths.app.dashboard.path,
        element: (
          <ProtectedRoute>
            <paths.app.dashboard.component />,
          </ProtectedRoute>
        ),
      },
      {
        path: paths.app.playground.path,
        element: (
          <paths.app.playground.component />,
        ),
        
      },
      {
        path: paths.auth.login.path,
        element: <paths.auth.login.component />,
      },
      {
        path: paths.auth.register.path,
        element: <paths.auth.register.component />,
      },

      {
        path: paths.auth.forgetPassword.path,
        element: <paths.auth.forgetPassword.component />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
    { basename: '/web' },
  );

  return <RouterProvider router={Router} />;
}

export default AppRouter;
