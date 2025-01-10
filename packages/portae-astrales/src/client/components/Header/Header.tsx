import { Grid, GridItem, Heading, HStack, Link, Spinner, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Button from '@client/components/Button';
import PortaeAstralesIcon from '@client/components/PortaeAstralesIcon';

// constants
import { DEFAULT_GAP, HEADER_HEIGHT } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// utils
import useStore from '@client/utils/useStore';

const Header: FC = () => {
  const { t } = useTranslation();
  const { isFetchingWorldConfig, subtitle, title } = useStore();
  // hooks
  const foregroundColor = useForegroundColor();

  return (
    <Grid
      as="header"
      borderColor={foregroundColor}
      borderBottomWidth={1}
      h={HEADER_HEIGHT}
      templateColumns="repeat(4, 1fr)"
      w="full"
    >
      <GridItem display="flex" colSpan={1}>
        <Link href="/" ml={DEFAULT_GAP / 2}>
          <PortaeAstralesIcon fontSize="3xl" />
        </Link>
      </GridItem>

      {/*title/subtitle*/}
      <GridItem display="flex" colSpan={2}>
        <VStack flex={1} gap={0} justify="center" w="full">
          {title && (
            <>
              <Heading>
                {title}
              </Heading>

              {subtitle && (
                <Text fontSize="sm">
                  {subtitle}
                </Text>
              )}
            </>
          )}
        </VStack>
      </GridItem>

      {/*wallet connect*/}
      <GridItem display="flex" colSpan={1}>
        <HStack gap={DEFAULT_GAP / 3} justify="flex-end" h="full" w="full">
          {isFetchingWorldConfig && (
            <Spinner size="md" />
          )}

          <HStack gap={1} justify="flex-end" h="full">
            <Button borderColor={foregroundColor} borderLeftWidth={1}>
              {t('labels.connect')}
            </Button>
          </HStack>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default Header;
