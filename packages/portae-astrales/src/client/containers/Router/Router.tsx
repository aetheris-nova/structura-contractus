import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// containers
import Root from '@client/containers/Root';

// pages
import SmartAssemblyPage from '@client/pages/SmartAssemblyPage';
import SplashPage from '@client/pages/SplashPage';

const Router: FC = () => {
  // misc
  const router = createBrowserRouter([
    {
      children: [
        {
          element: <SmartAssemblyPage />,
          path: '/',
        },
        {
          element: <SmartAssemblyPage />,
          path: '/:id',
        },
      ],
      element: <Root />,
      HydrateFallback: SplashPage,
      path: '/',
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
};

export default Router;

