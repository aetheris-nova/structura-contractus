import {
  Card,
  DataList,
  DataListItem,
  DEFAULT_GAP,
  EmptyState,
  // useTabletAndUp,
} from '@aetherisnova/ui-components';
import { Box, Heading, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import { type FC, type ReactNode, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';

// components
import ListItem from '@client/components/ListItem';
import Page from '@client/components/Page';

// constants
import { SMART_ASSEMBLY_ROUTE } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';
import useTabletAndUp from '@client/hooks/useTabletAndUp';

// icons
import EvEVEToken from '@client/icons/EvEVEToken';

// selectors
import { useSelectEVEToken, useSelectSelectedAccount } from '@client/selectors';

// utils
import ellipseText from '@client/utils/ellipseText';
import smartAssemblyIcon from '@client/utils/smartAssemblyIcon';

const CharacterPage: FC = () => {
  const { t } = useTranslation();
  // selectors
  const account = useSelectSelectedAccount();
  const eveToken = useSelectEVEToken();
  // hooks
  const foregroundColor = useForegroundColor();
  const isTabletAndUp = useTabletAndUp();
  // memos
  const context = useMemo(() => randomString(8), []);
  const imageSize = useMemo(() => 14, []);
  // renders
  const renderContent = () => {
    let characterDetailsNode: ReactNode;
    let tokensNode: ReactNode;
    let smartAssembliesNode: ReactNode;

    if (!account || !account.isSmartCharacter) {
      return (
        <VStack flex={1} p={DEFAULT_GAP} w="full">
          <Spacer />

          <EmptyState
            title={t('headings.noCharacterDataFound')}
          />

          <Spacer />
        </VStack>
      );
    }

    characterDetailsNode = (
      <Card
        borderBottomWidth={1}
        title={t('headings.details')}
        w="full"
        {...(isTabletAndUp && {
          borderBottomWidth: 0,
          borderRightWidth: 1,
        })}
      >
        <VStack
          gap={DEFAULT_GAP - 2}
          p={DEFAULT_GAP / 2}
          w="full"
        >
          <HStack
            align="start"
            gap={DEFAULT_GAP - 2}
            w="full"
          >
            {/*image*/}
            <Box
              borderColor={foregroundColor}
              borderWidth={1}
            >
              <Image
                h={imageSize}
                src={account.image}
                style={{
                  filter: 'grayscale(100%)',
                }}
                w={imageSize}
              />
            </Box>

            {/*name*/}
            <Heading fontSize="xl">
              {account.name}
            </Heading>
          </HStack>

          <DataList gap={DEFAULT_GAP / 3} orientation="horizontal" w="full">
            {/*id*/}
            <DataListItem
              copyText={account.id}
              label={<Text fontWeight="600">{t('labels.id').toUpperCase()}</Text>}
              value={ellipseText(account.id, {
                end: 5,
                start: 5,
              })}
            />

            {/*address*/}
            <DataListItem
              copyText={account.address}
              label={<Text fontWeight="600">{t('labels.address').toUpperCase()}</Text>}
              value={ellipseText(account.address, {
                end: 5,
                start: 5,
              })}
            />
          </DataList>
        </VStack>
      </Card>
    );
    tokensNode = (
      <Card
        borderBottomWidth={1}
        title={t('headings.tokens')}
        w="full"
        {...(isTabletAndUp && {
          borderBottomWidth: 0,
        })}
      >
        <VStack
          gap={DEFAULT_GAP - 2}
          p={DEFAULT_GAP / 2}
          w="full"
        >
          <DataList orientation="horizontal" w="full">
            {/*eve token*/}
            {eveToken && (
              <DataListItem
                label={<Text fontWeight="600">{(eveToken?.name || 'EVE Token').toUpperCase()}</Text>}
                value={(
                  <HStack>
                    <Text>
                      {formatUnits(BigInt(account.eveBalanceWei), eveToken.decimals)}
                    </Text>

                    <EvEVEToken />
                  </HStack>
                )}
              />
            )}
          </DataList>
        </VStack>
      </Card>
    );
    smartAssembliesNode = (
      <Card
        p={0}
        subtitle={account.smartAssemblies.length.toString()}
        title={t('headings.assemblies')}
        w="full"
        {...(isTabletAndUp && {
          h: '60vh',
        })}
      >
        {account.smartAssemblies.length > 0 ? (
          <VStack
            overflow="scroll"
            w="full"
          >
            {account.smartAssemblies.map((value, index) => (
              <ListItem
                icon={smartAssemblyIcon(value.assemblyType)}
                key={`${context}__smart-assembly-item-${index}`}
                link={`${SMART_ASSEMBLY_ROUTE}/${value.id}`}
                secondarySubtitle={value.state.toString()}
                secondaryTitle={value.solarSystem.solarSystemName.length > 0 ? value.solarSystem.solarSystemName : '-'}
                subtitle={t('labels.smartAssemblyType', { context: value.assemblyType })}
                title={value.name?.length > 0 ? value.name : ellipseText(value.id, {
                  end: 5,
                  start: 5,
                })}
              />
            ))}
          </VStack>
        ) : (
          <VStack flex={1} w="full">
            <Spacer />

            <EmptyState
              title={t('headings.noAssembliesFound')}
            />

            <Spacer />
          </VStack>
        )}
      </Card>
    );

    return (
      <VStack flex={1} gap={0} w="full">
        {!isTabletAndUp ? (
          <>
            {characterDetailsNode}
            {tokensNode}
            {smartAssembliesNode}
          </>
        ) : (
          <>
            <HStack
              align="stretch"
              borderColor={foregroundColor}
              borderBottomWidth={1}
              flex={1}
              gap={0}
              justify="space-evenly"
              w="full"
            >
              {characterDetailsNode}
              {tokensNode}

            </HStack>

            {smartAssembliesNode}
          </>
        )}
      </VStack>
    );
  };

  return (
    <Page>
      {renderContent()}
    </Page>
  );
};

export default CharacterPage;
