import { DEFAULT_GAP } from '@aetherisnova/ui-components';
import { Flex, VStack } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

// constants
import { BODY_BACKGROUND_COLOR } from '@client/constants';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      backgroundColor={BODY_BACKGROUND_COLOR}
      justify="center"
      w="full"
    >
      <VStack
        gap={0}
        maxW="1024px"
        minH="100vh"
        pt={DEFAULT_GAP / 2}
        px={DEFAULT_GAP / 2}
        w="full"
      >
        {children}
      </VStack>
    </Flex>
  );
};

export default Layout;
