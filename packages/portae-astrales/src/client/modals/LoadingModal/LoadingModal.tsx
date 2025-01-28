import { Modal, PulseLoader } from '@aetherisnova/ui-components';
import { Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';

// constants
import { DEFAULT_GAP } from '@client/constants';

// types
import type { IProps } from './types';

const LoadingModal: FC<IProps> = ({ message, onClose, open, title }) => {
  // handlers
  const handleClose = () => onClose && onClose();

  return (
    <Modal
      body={(
        <VStack gap={DEFAULT_GAP - 2} w="full">
          <PulseLoader />

          {message && (
            <Text>
              {message}
            </Text>
          )}
        </VStack>
      )}
      open={open}
      onClose={handleClose}
      title={title}
    />
  );
};

export default LoadingModal;
