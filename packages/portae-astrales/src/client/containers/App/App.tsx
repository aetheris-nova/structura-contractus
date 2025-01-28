import { AppProvider } from '@aetherisnova/ui-components';
import { type FC } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// constants
import { CHARACTER_ROUTE, SMART_ASSEMBLY_ROUTE } from '@client/constants';

// containers
import Root from '@client/containers/Root';

// pages
import CharacterPage from '@client/pages/CharacterPage';
import SmartAssemblyPage from '@client/pages/SmartAssemblyPage';
import WelcomePage from '@client/pages/WelcomePage';

// types
import type { IProps } from './types';

const App: FC<IProps> = ({ i18n }) => {
  // misc
  const router = createBrowserRouter([
    {
      children: [
        {
          element: <WelcomePage />,
          path: '/',
        },
        {
          element: <CharacterPage />,
          path: CHARACTER_ROUTE,
        },
        {
          element: <SmartAssemblyPage />,
          path: `${SMART_ASSEMBLY_ROUTE}/:id`,
        },
      ],
      element: <Root />,
      path: '/',
    },
  ]);

  return (
    <AppProvider i18n={i18n}>
      <RouterProvider router={router} />
    </AppProvider>
  );
};

export default App;
