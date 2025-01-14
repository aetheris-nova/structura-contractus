import { DataList, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { isOwner as eveworldIsOwner } from '@eveworld/utils';
import { randomString } from '@stablelib/random';
import BigNumber from 'bignumber.js';
import { cloneElement, type FC, type ReactElement, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Button from '@client/components/Button';
import Card from '@client/components/Card';
import DataListItem from '@client/components/DataListItem';
import EmptyState from '@client/components/EmptyState';
import ListItem from '@client/components/ListItem';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// selectors
import { useSelectFuelItem } from '@client/selectors';

// types
import type { IContentProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';

const SmartStorageUnitContent: FC<IContentProps<'SmartStorageUnit'>> = ({ account, onEditMetadataClick, onToggleOnlineClick, smartAssembly }) => {
  const { t } = useTranslation();
  // hooks
  const foregroundColor = useForegroundColor();
  // selectors
  const fuelItem = useSelectFuelItem();
  // memos
  const context = useMemo(() => randomString(8), []);
  const ephemeralInventory = useMemo(() => {
    if (!account) {
      return null;
    }

    return smartAssembly.inventory.ephemeralInventoryList.find((value) => value.ownerId === account.id) || null;
  }, [account, smartAssembly.inventory.ephemeralInventoryList]);
  const fuelRemainingPercent = useMemo(() => {
    const baseUnitVolume = fuelItem?.metadata.attributes.find(({ trait_type }) => trait_type == 'volume')?.value.toString() || null;

    if (!baseUnitVolume) {
      return -1;
    }

    return new BigNumber(String(smartAssembly.fuel.fuelAmount)).dividedBy(new BigNumber(String(smartAssembly.fuel.fuelMaxCapacity))).toNumber();
  }, [fuelItem, smartAssembly.fuel]);
  const isOwner = useMemo(() => !!account && eveworldIsOwner(smartAssembly, account.address), [account, smartAssembly]);
  // renders
  const renderActions = () => {
    let buttons: ReactElement[] = [];

    if (isOwner) {
      buttons = [
        ...buttons,
        (
          <Button onClick={onEditMetadataClick} w="full">
            {t('labels.editDetails')}
          </Button>
        ),
        (
          <Button onClick={onToggleOnlineClick} w="full">
            {t(smartAssembly.isOnline ? 'labels.bringOffline' : 'labels.bringOnline')}
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
        <Card borderRightWidth={1} title={t('headings.terminalDetails')} w="full">
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
                  end: 15,
                  start: 15,
                })}
              />

              {/*owner*/}
              <DataListItem
                label={<Text fontWeight="600">{t('labels.owner').toUpperCase()}</Text>}
                value={`${smartAssembly.ownerName}${isOwner && ` (${t('captions.you')})`}`}
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
            </DataList.Root>
          </VStack>
        </Card>

        {/*actions*/}
        <Card title={t('headings.actions')} w="full">
          {renderActions()}
        </Card>
      </HStack>

      {/*inventories*/}
      <HStack
        gap={0}
        justify="space-evenly"
        w="full"
      >
        {/*ephemeral*/}
        <Card
          borderRightWidth={isOwner ? 1 : 0}
          h="50vh"
          p={0}
          subtitle={ephemeralInventory ? ephemeralInventory.ephemeralInventoryItems.length.toString() : '0'}
          title={t('headings.inventory')}
          w="full"
        >
          {ephemeralInventory && ephemeralInventory.ephemeralInventoryItems.length > 0  ? (
            <VStack overflow="scroll" w="full">
              {ephemeralInventory.ephemeralInventoryItems.map((value, index) => (
                <ListItem
                  key={`${context}__ephemeral-item-${index}`}
                  secondarySubtitle={value.quantity.toString()}
                  secondaryTitle={value.itemId.toString()}
                  title={value.name}
                  {...(value.name && {
                    icon: (
                      <Image
                        filter="grayscale(100%)"
                        src={value.image}
                      />
                    ),
                  })}
                />
              ))}
            </VStack>
          ) : (
            <VStack flex={1} w="full">
              <Spacer />

              <EmptyState title={t('headings.noItemsFound')} />

              <Spacer />
            </VStack>
          )}
        </Card>

        {isOwner && (
          <Card
            h="50vh"
            p={0}
            subtitle={smartAssembly.inventory.storageItems.length.toString()}
            title={t('headings.storedItems')}
            w="full"
          >
            {smartAssembly.inventory.storageItems.length > 0 ? (
              <VStack overflow="scroll" w="full">
                {smartAssembly.inventory.storageItems.map((value, index) => (
                  <ListItem
                    key={`${context}__storage-item-${index}`}
                    secondarySubtitle={value.quantity.toString()}
                    secondaryTitle={value.itemId.toString()}
                    title={value.name}
                    {...(value.name && {
                      icon: (
                        <Image
                          filter="grayscale(100%)"
                          src={value.image}
                        />
                      ),
                    })}
                  />
                ))}
              </VStack>
            ) : (
              <VStack flex={1} w="full">
                <Spacer />

                <EmptyState title={t('headings.noItemsFound')} />

                <Spacer />
              </VStack>
            )}
          </Card>
        )}
      </HStack>
    </VStack>
  );
};

export default SmartStorageUnitContent;
