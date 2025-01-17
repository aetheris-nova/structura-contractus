import { Heading, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import type { FC, PropsWithChildren } from 'react';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// types
import type { IProps } from './types';

const Card: FC<PropsWithChildren<IProps>> = ({ children, subtitle, title, ...stackProps }) => {
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
      {(subtitle || title) && (
        <HStack
          borderColor={foregroundColor}
          borderBottomWidth={1}
          px={DEFAULT_GAP / 2}
          py={1}
          w="full"
        >
          {title && (
            <Heading fontSize="md" w="full">
              {title.toUpperCase()}
            </Heading>
          )}

          <Spacer />

          {subtitle && (
            <Text fontSize="sm">{subtitle}</Text>
          )}
        </HStack>
      )}

      {/*body*/}
      {children}
    </VStack>
  );
};

export default Card;
