import { ChakraProvider } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

// themes
import theme from '@client/theme';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChakraProvider value={theme}>
      {children}
    </ChakraProvider>
  );
};

export default ThemeProvider;
