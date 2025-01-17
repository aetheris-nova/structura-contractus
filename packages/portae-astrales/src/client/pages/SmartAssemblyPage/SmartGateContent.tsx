import { DataList, HStack, Link as ChakraLink, Spacer, Text, VStack } from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import BigNumber from 'bignumber.js';
import { cloneElement, type FC, type ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// components
import Button from '@client/components/Button';
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
import type { IContentProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';
import formatUnit from '@client/utils/formatUnit';
import isOwner from '@client/utils/isOwner';
import smartAssemblyIcon from '@client/utils/smartAssemblyIcon';
import calculateDistanceBetweenPoints from '@client/utils/calculateDistanceBetweenPoints';
import metersToLightYears from '@client/utils/metersToLightYears';

const SmartGateContent: FC<IContentProps<'SmartGate'>> = ({ account, onEditMetadataClick, smartAssembly }) => {
  const { t } = useTranslation();
  // hooks
  const foregroundColor = useForegroundColor();
  // selectors
  const fuelItem = useSelectFuelItem();
  // memos
  const _isOwner = useMemo(() => !!account && isOwner(smartAssembly, account.address), [account, smartAssembly]);
  const context = useMemo(() => randomString(8), []);
  const destinationGate = useMemo(() => smartAssembly.gateLink.gatesInRange.find(({ id }) => smartAssembly.gateLink.destinationGate && id === smartAssembly.gateLink.destinationGate) || null, [smartAssembly]);
  const fuelRemainingPercent = useMemo(() => {
    const baseUnitVolume = fuelItem?.metadata.attributes.find(({ trait_type }) => trait_type == 'volume')?.value.toString() || null;

    if (!baseUnitVolume) {
      return -1;
    }

    return new BigNumber(String(smartAssembly.fuel.fuelAmount)).dividedBy(new BigNumber(String(smartAssembly.fuel.fuelMaxCapacity))).toNumber();
  }, [fuelItem, smartAssembly.fuel]);
  // renders
  const renderActions = () => {
    let buttons: ReactElement[] = [];

    if (_isOwner) {
      buttons = [
        ...buttons,
        (
          <Button onClick={onEditMetadataClick} w="full">
            {t('labels.editDetails')}
          </Button>
        ),
      ];
    }

    return buttons.length > 0 ? (
      <VStack gap={1} p={DEFAULT_GAP / 2} w="full">
        {buttons.map((value, index) => cloneElement(value, {
          key: `${context}__action-buttons-${index}`,
        }))}
      </VStack>
    ) : (
      <VStack flex={1} w="full">
        <Spacer />

        <EmptyState title={t('headings.noActionsAvailable')} />

        <Spacer />
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
                value={smartAssembly.name.length > 0 ? smartAssembly.name : '-'}
              />

              {/*id*/}
              <DataListItem
                copyText={smartAssembly.id}
                label={<Text fontWeight="600">{t('labels.id').toUpperCase()}</Text>}
                value={ellipseText(smartAssembly.id, {
                  end: 5,
                  start: 5,
                })}
              />

              {/*owner*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.owner').toUpperCase()}</Text>}
                value={`${smartAssembly.ownerName}${_isOwner ? ` (${t('captions.you')})` : ''}`}
              />

              {/*location*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.location').toUpperCase()}</Text>}
                value={smartAssembly.solarSystem.solarSystemName.length > 0 ? smartAssembly.solarSystem.solarSystemName : '-'}
                {...(smartAssembly.solarSystem.solarSystemName.length > 0 && {
                  copyText: smartAssembly.solarSystem.solarSystemName,
                })}
              />

              {/*state*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.state').toUpperCase()}</Text>}
                value={smartAssembly.state}
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
                  destinationGate ? (
                    <ChakraLink asChild={true}>
                      <Link to={`${SMART_ASSEMBLY_ROUTE}/${destinationGate.id}`}>
                        {ellipseText(destinationGate.id, {
                          end: 5,
                          start: 5,
                        })}
                      </Link>
                    </ChakraLink>
                  ) : (
                    '-'
                  )
                }
                {...(smartAssembly.gateLink.destinationGate && {
                  copyText: smartAssembly.gateLink.destinationGate,
                })}
              />
            </DataList.Root>
          </VStack>
        </Card>

        {/*actions*/}
        <Card title={t('headings.actions')} w="full">
          {renderActions()}
        </Card>
      </HStack>

      {/*gates in range*/}
      <Card
        h="50vh"
        p={0}
        subtitle={smartAssembly.gateLink.gatesInRange.length.toString()}
        title={t('headings.gatesInRange')}
        w="full"
      >
        {smartAssembly.gateLink.gatesInRange.length > 0 ? (
          <VStack overflow="scroll" w="full">
            {smartAssembly.gateLink.gatesInRange
              .sort((a, b) => calculateDistanceBetweenPoints(smartAssembly.location, a.location).minus(calculateDistanceBetweenPoints(smartAssembly.location, b.location)).toNumber())
              .map((value, index) => {
                let distance: BigNumber | null = null;

                if (value.location && smartAssembly.location) {
                  distance = calculateDistanceBetweenPoints(smartAssembly.location, value.location);
                }

                return (
                  <ListItem
                    icon={smartAssemblyIcon('SmartGate')}
                    key={`${context}__gates-in-range-item-${index}`}
                    link={`${SMART_ASSEMBLY_ROUTE}/${value.id}`}
                    secondarySubtitle={`${value.state.toString()}${destinationGate && destinationGate.id === value.id ? ' (Linked)' : ''}`}
                    secondaryTitle={value.ownerName}
                    subtitle={`${value.solarSystem.solarSystemName.length > 0 ? value.solarSystem.solarSystemName : '-'}${distance ? ` ▪ ${formatUnit(metersToLightYears(distance))}ly` : ''}`}
                    title={
                      value.name?.length > 0
                        ? value.name
                        : ellipseText(value.id, {
                          end: 15,
                          start: 15,
                        })
                    }
                  />
                );
              })}
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
