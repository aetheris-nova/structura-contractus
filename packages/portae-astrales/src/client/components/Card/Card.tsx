import { Heading, HStack, VStack } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// types
import type { IProps } from './types';

const Card: FC<PropsWithChildren<IProps>> = ({ children, title, ...stackProps }) => {
  // hooks
  const foregroundColor = useForegroundColor();

  return (
    <VStack
      align="start"
      borderColor={foregroundColor}
      gap={0}
      {...stackProps}
    >
      {/*header*/}
      {title && (
        <HStack
          align="start"
          borderColor={foregroundColor}
          borderBottomWidth={1}
          px={DEFAULT_GAP / 2}
          py={1}
          w="full"
        >
          <Heading fontSize="md" fontWeight={600} w="full">
            {title.toUpperCase()}
          </Heading>
        </HStack>
      )}

      {/*body*/}
      <VStack
        gap={DEFAULT_GAP - 2}
        p={DEFAULT_GAP / 2}
        w="full"
      >
        {children}
      </VStack>
    </VStack>
  );
};

export default Card;
