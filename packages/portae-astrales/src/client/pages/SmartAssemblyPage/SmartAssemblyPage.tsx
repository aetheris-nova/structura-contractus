import { Spacer, Text, VStack } from '@chakra-ui/react';
import type { SmartAssemblyType } from '@eveworld/types';
import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

// components
import EmptyState from '@client/components/EmptyState';
import PulseLoader from '@client/components/PulseLoader';
import Page from '@client/components/Page';
import SmartGateContent from './SmartGateContent';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useSmartAssembly from '@client/hooks/useSmartAssembly';

// selectors
import { useSelectSelectedAccount } from '@client/selectors';

// types
import type { IParams } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';

const SmartAssemblyPage: FC = () => {
  const { t } = useTranslation();
  const { id } = useParams() as Readonly<IParams>;
  // selectors
  const account = useSelectSelectedAccount();
  // hooks
  const { fetching, fetchSmartAssemblyAction, smartAssembly } = useSmartAssembly();
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
      if (smartAssembly.assemblyType === 'SmartGate') {
        return (
          <SmartGateContent account={account} smartGate={smartAssembly as SmartAssemblyType<'SmartGate'>} />
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
    (async () => id && (await fetchSmartAssemblyAction(id)))();
  }, [id]);

  return (
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
  );
};

export default SmartAssemblyPage;
