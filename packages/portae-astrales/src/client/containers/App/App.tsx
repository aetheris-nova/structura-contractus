import { type FC } from 'react';
import { I18nextProvider } from 'react-i18next';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// constants
import { CHARACTER_ROUTE, GATE_ROUTE, TERMINAL_ROUTE } from '@client/constants';

// containers
import Root from '@client/containers/Root';
import ThemeProvider from '@client/containers/ThemeProvider';
import WalletConnectionProvider from '@client/containers/WalletConnectionProvider';

// pages
import CharacterPage from '@client/pages/CharacterPage';
import GatePage from '@client/pages/GatePage';
import TerminalPage from '@client/pages/TerminalPage';
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
          element: <GatePage />,
          path: `${GATE_ROUTE}/:id`,
        },
        {
          element: <TerminalPage />,
          path: `${TERMINAL_ROUTE}/:id`,
        },
      ],
      element: <Root />,
      path: '/',
    },
  ]);

  return (
    <I18nextProvider i18n={i18n}>
      <ThemeProvider>
        <WalletConnectionProvider>
          <RouterProvider router={router} />
        </WalletConnectionProvider>
      </ThemeProvider>
    </I18nextProvider>
  );
};

export default App;
