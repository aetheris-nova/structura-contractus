import { Box, DataList, Heading, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { randomString } from '@stablelib/random';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';

// components
import Card from '@client/components/Card';
import DataListItem from '@client/components/DataListItem';
import EmptyState from '@client/components/EmptyState';
import Page from '@client/components/Page';
import SmartAssemblyItem from '@client/components/SmartAssemblyItem';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// icons
import EvEVEToken from '@client/icons/EvEVEToken';

// selectors
import { useSelectEVEToken, useSelectSelectedAccount } from '@client/selectors';

// utils
import ellipseText from '@client/utils/ellipseText';

const CharacterPage: FC = () => {
  const { t } = useTranslation();
  // selectors
  const account = useSelectSelectedAccount();
  const eveToken = useSelectEVEToken();
  // hooks
  const foregroundColor = useForegroundColor();
  // memos
  const context = useMemo(() => randomString(8), []);
  const imageSize = useMemo(() => 14, []);
  // renders
  const renderContent = () => {
    if (!account) {
      return (
        <VStack flex={1} w="full">
          <Spacer />

          <EmptyState
            title={t('headings.noCharacterDataFound')}
          />

          <Spacer />
        </VStack>
      );
    }

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
          <Card
            borderRightWidth={1}
            title={t('headings.details')}
            w="full"
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

              <DataList.Root orientation="horizontal" w="full">
                {/*id*/}
                <DataListItem
                  label={<Text fontWeight="600">{t('labels.id').toUpperCase()}</Text>}
                  value={ellipseText(account.id, {
                    end: 15,
                    start: 15,
                  })}
                />

                {/*address*/}
                <DataListItem
                  label={<Text fontWeight="600">{t('labels.address').toUpperCase()}</Text>}
                  value={account.address}
                />
              </DataList.Root>
            </VStack>
          </Card>

          {/*tokens*/}
          <Card
            title={t('headings.tokens')}
            w="full"
          >
            <VStack
              gap={DEFAULT_GAP - 2}
              p={DEFAULT_GAP / 2}
              w="full"
            >
              <DataList.Root orientation="horizontal" w="full">
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
              </DataList.Root>
            </VStack>
          </Card>
        </HStack>

        {/*assemblies*/}
        <Card
          h="60vh"
          p={0}
          subtitle={account.smartAssemblies.length.toString()}
          title={t('headings.assemblies')}
          w="full"
        >
          {account.smartAssemblies.length > 0 ? (
              <VStack
                overflow="scroll"
                w="full"
              >
                {account.smartAssemblies.map((value, index) => (
                  <SmartAssemblyItem
                    key={`${context}__smart-assembly-item-${index}`}
                    smartAssembly={value}
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
