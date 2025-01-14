import { Icon, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GrStatusWarning } from 'react-icons/gr';

// constants
import { DEFAULT_GAP } from '@client/constants';

// components
import Modal from '@client/components/Modal';

// types
import type { IProps } from './types';

const ErrorModal: FC<IProps> = ({ error, onClose }) => {
  const { t } = useTranslation();
  // handlers
  const handleClose = () => onClose();

  return (
    <Modal
      body={(
        <VStack gap={DEFAULT_GAP - 2} w="full">
          <Icon fontSize="3xl">
            <GrStatusWarning />
          </Icon>

          <VStack gap={DEFAULT_GAP / 3} w="full">
            <Text fontWeight={600} textAlign="center" w="full">
              {error?.reference}
            </Text>

            <Text textAlign="center" w="full">
              {error?.message}
            </Text>
          </VStack>
        </VStack>
      )}
      closeButton={true}
      open={!!error}
      onClose={handleClose}
      title={t('headings.errorCode', { code: error?.code })}
    />
  );
};

export default ErrorModal;
