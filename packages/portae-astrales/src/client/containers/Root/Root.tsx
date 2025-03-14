import { LoadingModal, WalletSelectModal } from '@aetherisnova/ui-components';
import { useDisclosure, VStack } from '@chakra-ui/react';
import { type FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';
import type { Address } from 'viem';
import { useAccount, useDisconnect } from 'wagmi';

// components
import Footer from '@client/components/Footer';
import Header from '@client/components/Header';
import Layout from '@client/components/Layout';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// modals
import ErrorModal from '@client/modals/ErrorModal';

// selectors
import { useSelectSelectedAccount } from '@client/selectors';

// utils
import useStore from '@client/utils/useStore';

const Root: FC = () => {
  const { t } = useTranslation();
  const { addresses } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { onClose: onWalletSelectDialogClose, onOpen: onWalletSelectDialogOpen, open: walletSelectDialogOpen } = useDisclosure();
  // selectors
  const {
    colorMode,
    error,
    fetchingWorldConfig,
    inGame,
    loadingModalDetails,
    setAccountsAction,
    setErrorAction,
    subtitle,
    title,
    worldConfig,
  } = useStore();
  const account = useSelectSelectedAccount();
  // hooks
  const foregroundColor = useForegroundColor();
  // handlers
  const handleOnConnectClick = () => onWalletSelectDialogOpen();
  const handleOnErrorModalClose = () => setErrorAction(null);
  const handleOnDisconnectClick = async () => {
    await disconnectAsync();
    await setAccountsAction([]); // remove any stored account data
  };

  useEffect(() => {
    (async () => addresses && await setAccountsAction(addresses as Address[]))();
  }, [addresses]);

  return (
    <>
      <Helmet>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <title>{`${import.meta.env.VITE_TITLE}${title ? ` | ${title}` : ''}${subtitle ? ` - ${subtitle}` : ''}`}</title>

        <meta content={t('captions.description')} name="description" />
      </Helmet>

      {/*modals*/}
      <ErrorModal error={error} onClose={handleOnErrorModalClose} />
      <LoadingModal
        message={loadingModalDetails?.message || t('captions.pleaseWait')}
        open={!!loadingModalDetails && loadingModalDetails.loading}
        title={loadingModalDetails?.title || t('headings.loading')}
      />
      <WalletSelectModal onClose={onWalletSelectDialogClose} open={walletSelectDialogOpen} />

      <Layout>
        <VStack
          borderColor={foregroundColor}
          borderWidth={1}
          flex={1}
          gap={0}
          w="full"
        >
          <Header
            account={account}
            colorMode={colorMode}
            fetchingWorldConfig={fetchingWorldConfig}
            inGame={inGame}
            onConnectClick={handleOnConnectClick}
            onDisconnectClick={handleOnDisconnectClick}
            worldConfig={worldConfig}
          />

          {/*content*/}
          <VStack as="main" flex={1} w="full">
            <Outlet />
          </VStack>
        </VStack>

        <Footer />
      </Layout>
    </>
  );
};

export default Root;
