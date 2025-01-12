import { Spacer, Text, VStack } from '@chakra-ui/react';
import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// components
import EmptyState from '@client/components/EmptyState';
import PulseLoader from '@client/components/PulseLoader';
import Page from '@client/components/Page';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useSmartAssembly from '@client/hooks/useSmartAssembly';

// types
import type { IParams } from './types'

const SmartAssemblyPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams() as Readonly<IParams>;
  // hooks
  const { error, fetching, fetchSmartAssemblyAction, smartAssembly } = useSmartAssembly<'SmartStorageUnit'>();
  // renders
  const renderContent = () => {
    if (fetching) {
      return (
        <VStack flex={1} w="full">
          <Spacer />

          <VStack gap={DEFAULT_GAP - 2} w="full">
            <PulseLoader size="lg" />

            <Text>{t('captions.retrievingDetails')}</Text>
          </VStack>

          <Spacer />
        </VStack>
      );
    }

    if (smartAssembly) {
      if (smartAssembly.assemblyType === 'SmartStorageUnit') {
        return (
          <div>{`Hello ${smartAssembly?.id}`}</div>
        );
      }
    }

    return (
      <VStack flex={1} w="full">
        <Spacer />

        <EmptyState
          title={t('headings.noTerminalFound')}
        />

        <Spacer />
      </VStack>
    );
  };

  useEffect(() => {
    (async () => id && (await fetchSmartAssemblyAction(id)))();
  }, [id]);

  return (
    <Page subtitle={id} title={t('titles.page', { context: 'terminal' })}>
      {renderContent()}
    </Page>
  );
};

export default SmartAssemblyPage;
