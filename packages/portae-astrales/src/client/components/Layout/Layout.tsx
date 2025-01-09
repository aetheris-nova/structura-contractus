import { VStack } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

// components
import Footer from '@client/components/Footer';
import Header from '@client/components/Header';

// constants
import { BODY_BACKGROUND_COLOR, DEFAULT_GAP } from '@client/constants';

// hooks
import useBorderColor from '@client/hooks/useBorderColor';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // hooks
  const borderColor = useBorderColor();

  return (
    <VStack
      backgroundColor={BODY_BACKGROUND_COLOR}
      gap={0}
      minH="100vh"
      pt={DEFAULT_GAP / 2}
      px={DEFAULT_GAP / 2}
    >
      <VStack
        borderColor={borderColor}
        borderWidth={1}
        flex={1}
        gap={0}
        w="full"
      >
        <Header />

        <VStack as="main" flex={1} w="full">
          {children}
        </VStack>
      </VStack>

      <Footer />
    </VStack>
  );
};

export default Layout;
