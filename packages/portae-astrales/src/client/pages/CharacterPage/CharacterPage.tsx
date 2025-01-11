import { Box, DataList, Heading, HStack, Image, Spacer, Text, VStack } from '@chakra-ui/react';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// components
import DataListItem from '@client/components/DataListItem';
import EmptyState from '@client/components/EmptyState';
import Page from '@client/components/Page';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// selectors
import { useSelectSelectedAccount } from '@client/selectors';

// utils
import ellipseText from '@client/utils/ellipseText';

const CharacterPage: FC = () => {
  const { t } = useTranslation();
  // selectors
  const account = useSelectSelectedAccount();
  // hooks
  const foregroundColor = useForegroundColor();
  // memos
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
      <HStack
        borderColor={foregroundColor}
        borderBottomWidth={1}
        gap={0}
        justify="space-evenly"
        w="full"
      >
        {/*details*/}
        <VStack
          align="start"
          borderColor={foregroundColor}
          borderRightWidth={1}
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
                w={imageSize}
              />
            </Box>

            {/*name*/}
            <Heading fontSize="xl">
              {account.name}
            </Heading>
          </HStack>

          <DataList.Root orientation="horizontal">
            {/*id*/}
            <DataListItem
              label={t('labels.id').toUpperCase()}
              value={ellipseText(account.id, {
                end: 15,
                start: 15,
              })}
            />

            {/*address*/}
            <DataListItem
              label={t('labels.address').toUpperCase()}
              value={account.address}
            />
          </DataList.Root>
        </VStack>

        {/*balances*/}
        <VStack
          p={DEFAULT_GAP / 2}
          w="full"
        >

        </VStack>
      </HStack>
    );
  };

  return (
    <Page>
      {renderContent()}
    </Page>
  );
};

export default CharacterPage;
