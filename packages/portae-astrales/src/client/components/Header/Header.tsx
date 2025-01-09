import { Box, Grid, GridItem, Heading, HStack, Link, Spacer, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Button from '@client/components/Button';
import PortaeAstralesIcon from '@client/components/PortaeAstralesIcon';

// constants
import { DEFAULT_GAP, HEADER_HEIGHT } from '@client/constants';

// hooks
import useBorderColor from '@client/hooks/useBorderColor';

// utils
import useStore from '@client/utils/useStore';

const Header: FC = () => {
  const { t } = useTranslation();
  const { subtitle, title } = useStore();
  // hooks
  const borderColor = useBorderColor();

  return (
    <Grid
      as="header"
      borderColor={borderColor}
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
        <HStack flex={1} gap={1} justify="flex-end" h="full">
          <Button borderColor={borderColor} borderLeftWidth={1}>
            {t('labels.connect')}
          </Button>
        </HStack>
      </GridItem>
    </Grid>
  );
};

export default Header;
