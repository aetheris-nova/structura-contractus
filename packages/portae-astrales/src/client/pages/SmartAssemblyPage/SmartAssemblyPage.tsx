import type { TSmartAssemblyWithExtendedProps } from '@aetherisnova/types';
import { DEFAULT_GAP, EmptyState, PulseLoader } from '@aetherisnova/ui-components';
import { ellipseText } from '@aetherisnova/utils';
import { Spacer, Text, VStack, useDisclosure } from '@chakra-ui/react';
import type { SmartAssemblies } from '@eveworld/types';
import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useConfig } from 'wagmi';

// components
import Page from '@client/components/Page';
import SmartGateContent from './SmartGateContent';
import SmartStorageUnitContent from './SmartStorageUnitContent';

// modals
import EditSmartAssemblyDetailsModal from '@client/modals/EditSmartAssemblyDetailsModal';

// selectors
import { useSelectSelectedAccount } from '@client/selectors';

// types
import type { IParams } from './types';

// utils
import useStore from '@client/utils/useStore';

const SmartAssemblyPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams() as Readonly<IParams>;
  const wagmiConfig = useConfig();
  const {
    onClose: onEditDetailsModalClose,
    onOpen: onEditDetailsModalOpen,
    open: editDetailsModalOpen,
  } = useDisclosure();
  // selectors
  const account = useSelectSelectedAccount();
  // hooks
  const { fetchingSmartAssembly, fetchSmartAssemblyAction, smartAssembly, startPollingForSmartAssemblyAction, stopPollingForSmartAssemblyAction, toggleSmartAssemblyOnlineAction } = useStore();
  // handlers
  const handleOnEditMetadataClick = () => onEditDetailsModalOpen();
  const handleOnToggleOnlineClick = async () => {
    await toggleSmartAssemblyOnlineAction({
      t,
      wagmiConfig,
    });
  };
  // renders
  const renderContent = () => {
    if (!smartAssembly && fetchingSmartAssembly) {
      return (
        <VStack flex={1} gap={DEFAULT_GAP - 2} w="full">
          <Spacer />

          <VStack gap={DEFAULT_GAP / 3}>
            <PulseLoader />

            <Text>
              {t('captions.retrievingDetails')}
            </Text>
          </VStack>

          <Spacer />
        </VStack>
      );
    }

    if (smartAssembly) {
      if (smartAssembly.assemblyType === 'SmartGate') {
        return (
          <SmartGateContent
            account={account}
            onEditMetadataClick={handleOnEditMetadataClick}
            onToggleOnlineClick={handleOnToggleOnlineClick}
            smartAssembly={smartAssembly}
          />
        );
      }

      if (smartAssembly.assemblyType === 'SmartStorageUnit') {
        return (
          <SmartStorageUnitContent
            account={account}
            onEditMetadataClick={handleOnEditMetadataClick}
            onToggleOnlineClick={handleOnToggleOnlineClick}
            smartAssembly={smartAssembly}
          />
        );
      }
    }

    return (
      <VStack flex={1} w="full">
        <Spacer />

        <EmptyState
          title={t('headings.noDataFound')}
        />

        <Spacer />
      </VStack>
    );
  };

  useEffect(() => {
    (async () => {
      let _smartAssembly: TSmartAssemblyWithExtendedProps<SmartAssemblies> | null;

      if (!id) {
        return;
      }

      _smartAssembly = await fetchSmartAssemblyAction(id);

      if (_smartAssembly) {
        startPollingForSmartAssemblyAction();
      }

      return () => stopPollingForSmartAssemblyAction();
    })();
  }, [id]);

  return (
    <>
      {smartAssembly && (
        <EditSmartAssemblyDetailsModal
          onClose={onEditDetailsModalClose}
          open={editDetailsModalOpen}
          smartAssembly={smartAssembly}
        />
      )}

      <Page
        {...(smartAssembly && {
          subtitle: smartAssembly.name.length > 0 ? smartAssembly.name : ellipseText(smartAssembly.id, {
            end: 5,
            start: 5,
          }),
          title: t('headings.smartAssemblyType', { context: smartAssembly.assemblyType }),
        })}
      >
        {renderContent()}
      </Page>
    </>
  );
};

export default SmartAssemblyPage;
