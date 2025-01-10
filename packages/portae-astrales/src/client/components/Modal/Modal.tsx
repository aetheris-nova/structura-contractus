import {
  Box,
  Flex,
  Heading,
  HStack,
  Portal,
  Text,
  VStack,
} from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import { cloneElement, type FC, useMemo } from 'react';
import { GrClose } from 'react-icons/gr';

// components
import IconButton from '@client/components/IconButton';

// constants
import { DEFAULT_GAP, HEADER_HEIGHT } from '@client/constants';

// hooks
import useBackgroundColor from '@client/hooks/useBackgroundColor';
import useForegroundColor from '@client/hooks/useForegroundColor';

// types
import type { IProps } from './types';

const Modal: FC<IProps> = ({ body, closeButton, footer, onClose, open, subtitle, title }) => {
  // hooks
  const backgroundColor = useBackgroundColor();
  const foregroundColor = useForegroundColor();
  // memos
  const context = useMemo(() => randomString(8), []);
  // handlers
  const handleClose = () => onClose && onClose();

  return (
    <>
      {open && (
        <Portal>
          <Box
            bottom={0}
            position="absolute"
            left={0}
            right={0}
            top={0}
          >
            <Flex align="center" h="full" justify="center" w="full">
              <VStack
                background={backgroundColor}
                borderColor={foregroundColor}
                borderWidth={1}
                flex={0}
                minW="45%"
              >
                {/*header*/}
                {(closeButton || subtitle || title) && (
                  <HStack
                    borderBottomWidth={1}
                    borderColor={foregroundColor}
                    h={HEADER_HEIGHT}
                    justify="space-between"
                    pl={DEFAULT_GAP / 2}
                    w="full"
                  >
                    <VStack flex={1} gap={0} justify="center" w="full">
                      {title && (
                        <Heading>
                          {title.toUpperCase()}
                        </Heading>
                      )}

                      {subtitle && (
                        <Text fontSize="sm">
                          {subtitle}
                        </Text>
                      )}
                    </VStack>

                    {closeButton && (
                      <IconButton
                        borderColor={foregroundColor}
                        borderLeftWidth={1}
                        onClick={handleClose}
                        w={HEADER_HEIGHT}
                      >
                        <GrClose />
                      </IconButton>
                    )}
                  </HStack>
                )}

                {/*body*/}
                <VStack
                  flex={1}
                  p={DEFAULT_GAP / 2}
                  w="full"
                >
                  {body}
                </VStack>

                {/*footer*/}
                {footer && footer.length > 0 && (
                  <HStack
                    borderColor={foregroundColor}
                    borderTopWidth={1}
                    gap={0}
                    h={HEADER_HEIGHT}
                    w="full"
                  >
                    {footer.map((value, index, array) => cloneElement(value, {
                      borderColor: foregroundColor,
                      flex: 1,
                      key: `${context}__footer-${index}`,
                      ...(index < array.length - 1 && {
                        borderRightWidth: 1,
                      })
                    }))}
                  </HStack>
                )}
              </VStack>
            </Flex>
          </Box>
        </Portal>
      )}
    </>
  );
};

export default Modal;
