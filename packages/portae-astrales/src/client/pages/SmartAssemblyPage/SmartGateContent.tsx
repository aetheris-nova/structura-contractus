import { DataList, HStack, Link as ChakraLink, Spacer, Text, VStack } from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import BigNumber from 'bignumber.js';
import { type FC, type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// components
import Card from '@client/components/Card';
import DataListItem from '@client/components/DataListItem';
import EmptyState from '@client/components/EmptyState';
import ListItem from '@client/components/ListItem';

// constants
import { DEFAULT_GAP, SMART_ASSEMBLY_ROUTE } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// selectors
import { useSelectFuelItem } from '@client/selectors';

// types
import type { ISmartGateContentProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';
import smartAssemblyIcon from '@client/utils/smartAssemblyIcon';

const SmartGateContent: FC<ISmartGateContentProps> = ({ account, smartGate }) => {
  const { t } = useTranslation();
  // hooks
  const foregroundColor = useForegroundColor();
  // selectors
  const fuelItem = useSelectFuelItem();
  // memos
  const context = useMemo(() => randomString(8), []);
  const fuelRemainingPercent = useMemo(() => {
    const baseUnitVolume = fuelItem?.metadata.attributes.find(({ trait_type }) => trait_type == 'volume')?.value.toString() || null;

    if (!baseUnitVolume) {
      return -1;
    }

    return new BigNumber(String(smartGate.fuel.fuelAmount)).dividedBy(new BigNumber(String(smartGate.fuel.fuelMaxCapacity))).toNumber();
  }, [fuelItem, smartGate.fuel]);
  // renders
  const renderActions = () => {
    const buttons: ReactNode[] = [];

    return (
      <VStack gap={1} p={DEFAULT_GAP / 2} w="full">

      </VStack>
    );
  };

  return (
    <VStack flex={1} gap={0} w="full">
      <HStack
        align="stretch"
        borderColor={foregroundColor}
        borderBottomWidth={1}
        flex={1}
        gap={0}
        justify="space-evenly"
        w="full"
      >
        {/*details*/}
        <Card borderRightWidth={1} title={t('headings.gateDetails')} w="full">
          <VStack p={DEFAULT_GAP / 2} w="full">
            <DataList.Root gap={DEFAULT_GAP / 3} orientation="horizontal" w="full">
              {/*name*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.name').toUpperCase()}</Text>}
                value={smartGate.name.length > 0 ? smartGate.name : '-'}
              />

              {/*id*/}
              <DataListItem
                copyText={smartGate.id}
                label={<Text fontWeight="600">{t('labels.id').toUpperCase()}</Text>}
                value={ellipseText(smartGate.id, {
                  end: 15,
                  start: 15,
                })}
              />

              {/*owner*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.owner').toUpperCase()}</Text>}
                value={smartGate.ownerName}
              />

              {/*location*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.location').toUpperCase()}</Text>}
                value={smartGate.solarSystem.solarSystemName.length > 0 ? smartGate.solarSystem.solarSystemName : '-'}
                {...(smartGate.solarSystem.solarSystemName.length > 0 && {
                  copyText: smartGate.solarSystem.solarSystemName,
                })}
              />

              {/*state*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.state').toUpperCase()}</Text>}
                value={smartGate.state}
              />

              {/*fuel remaining*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.fuelRemaining').toUpperCase()}</Text>}
                value={fuelRemainingPercent >= 0 ? `${fuelRemainingPercent.toFixed(2)}%` : '-'}
              />

              {/*fuel estimated depletion*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.fuelEstimatedDepletion').toUpperCase()}</Text>}
                value={'-'}
              />

              {/*linked gate*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.destinationGate').toUpperCase()}</Text>}
                value={
                  smartGate.gateLink.destinationGate ? (
                    <ChakraLink asChild={true}>
                      <Link to={`${SMART_ASSEMBLY_ROUTE}/${smartGate.gateLink.destinationGate}`}>
                        {ellipseText(smartGate.gateLink.destinationGate, {
                          end: 15,
                          start: 15,
                        })}
                      </Link>
                    </ChakraLink>
                  ) : (
                    '-'
                  )
                }
                {...(smartGate.gateLink.destinationGate && {
                  copyText: smartGate.gateLink.destinationGate,
                })}
              />
            </DataList.Root>
          </VStack>
        </Card>

        {/*actions*/}
        <Card title={t('headings.actions')} w="full"></Card>
      </HStack>

      {/*gates in range*/}
      <Card
        h="50vh"
        p={0}
        subtitle={smartGate.gateLink.gatesInRange.length.toString()}
        title={t('headings.gatesInRange')}
        w="full"
      >
        {smartGate.gateLink.gatesInRange.length > 0 ? (
          <VStack overflow="scroll" w="full">
            {smartGate.gateLink.gatesInRange.map((value, index) => (
              <ListItem
                icon={smartAssemblyIcon('SmartGate')}
                key={`${context}__gates-in-range-item-${index}`}
                link={`${SMART_ASSEMBLY_ROUTE}/${value.id}`}
                secondarySubtitle={value.state.toString()}
                secondaryTitle={value.ownerName}
                subtitle={value.solarSystem.solarSystemName.length > 0 ? value.solarSystem.solarSystemName : '-'}
                title={
                  value.name?.length > 0
                    ? value.name
                    : ellipseText(value.id, {
                        end: 15,
                        start: 15,
                      })
                }
              />
            ))}
          </VStack>
        ) : (
          <VStack flex={1} w="full">
            <Spacer />

            <EmptyState title={t('headings.noGatesFound')} />

            <Spacer />
          </VStack>
        )}
      </Card>
    </VStack>
  );
};

export default SmartGateContent;
