import { Text, VStack } from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import { FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { type Connector, useConnect } from 'wagmi';

// components
import Button from '@client/components/Button';
import Modal from '@client/components/Modal';
import PulseLoader from '@client/components/PulseLoader';

// constants
import { DEFAULT_GAP } from '@client/constants';

// selectors
import { useSelectLogger } from '@client/selectors';

// types
import type { IProps } from './types';

const WalletSelectModal: FC<IProps> = ({ onClose, open }) => {
  const { t } = useTranslation();
  const { connectors, connect, isPending, isSuccess } = useConnect();
  // selectors
  const logger = useSelectLogger();
  // memos
  const context = useMemo(() => randomString(8), []);
  // handlers
  const handleOnConnectorClick = (connector: Connector) => () =>  {
    const __function = 'handleOnConnectorClick';

    logger.debug(`${__function}: connecting to wallet "${connector.name}"`);

    connect({ connector });
  };
  const handleClose = () => {
    onClose();
  };
  // renders
  const renderBody = () => {
    if (isPending) {
      return (
        <VStack gap={DEFAULT_GAP - 2} w="full">
          <PulseLoader />

          <Text>{t('captions.connectingToWallet')}</Text>
        </VStack>
      );
    }

    return (
      <VStack gap={DEFAULT_GAP} w="full">
        <Text>
          {t(connectors.length > 0 ? 'captions.selectAWallet' : 'captions.noWalletsAvailable')}
        </Text>

        <VStack gap={1} w="full">
          {connectors.map((value, index) => (
            <Button
              key={`${context}__connectors-${index}`}
              onClick={handleOnConnectorClick(value)}
              w="full"
            >
              {value.name}
            </Button>
          ))}
        </VStack>
      </VStack>
    );
  };

  useEffect(() => {
    if (open && isSuccess) {
      handleClose();
    }
  }, [isSuccess]);

  return (
    <Modal
      body={renderBody()}
      closeButton={true}
      open={open}
      onClose={handleClose}
      title={t('headings.selectAWallet')}
    />
  );
};

export default WalletSelectModal;
