import { Flex, VStack } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

// constants
import { BODY_BACKGROUND_COLOR, DEFAULT_GAP } from '@client/constants';

// hooks
import useBorderColor from '@client/hooks/useBorderColor';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  // hooks
  const borderColor = useBorderColor();

  return (
    <Flex
      as="main"
      backgroundColor={BODY_BACKGROUND_COLOR}
      minH="100vh"
      p={DEFAULT_GAP / 2}
    >
      <VStack
        borderColor={borderColor}
        borderWidth={1}
        flex={1}
        w="full"
      >
        {children}
      </VStack>
    </Flex>
  );
};

export default Layout;
