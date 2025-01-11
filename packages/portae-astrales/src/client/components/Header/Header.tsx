import { Grid, GridItem, Heading, HStack, Link, Spinner, Text, VStack, useDisclosure } from '@chakra-ui/react';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDisconnect } from 'wagmi';

// components
import Button from '@client/components/Button';
import PortaeAstralesIcon from '@client/components/PortaeAstralesIcon';
import ProfileHeader from '@client/components/ProfileHeader';
import WalletSelectModal from '@client/components/WalletSelectModal';

// constants
import { DEFAULT_GAP, BUTTON_HEIGHT } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// selectors
import { useSelectSelectedAccount } from '@client/selectors';

// utils
import useStore from '@client/utils/useStore';

const Header: FC = () => {
  const { t } = useTranslation();
  const { disconnectAsync } = useDisconnect();
  const { onClose: onWalletSelectDialogClose, onOpen: onWalletSelectDialogOpen, open: walletSelectDialogOpen } = useDisclosure();
  const { isFetchingWorldConfig, setAccountsAction, subtitle, title } = useStore();
  // selectors
  const account = useSelectSelectedAccount();
  // hooks
  const foregroundColor = useForegroundColor();
  // handlers
  const handleOnConnectClick = () => onWalletSelectDialogOpen();
  const handleOnDisconnectClick = async () => {
    await disconnectAsync();
    await setAccountsAction([]); // remove any stored account data
  };

  return (
    <>
      <WalletSelectModal onClose={onWalletSelectDialogClose} open={walletSelectDialogOpen} />

      <Grid
        as="header"
        borderColor={foregroundColor}
        borderBottomWidth={1}
        minH={BUTTON_HEIGHT}
        templateColumns="repeat(3, 1fr)"
        w="full"
      >
        <GridItem display="flex" colSpan={1}>
          <Link href="/" ml={DEFAULT_GAP / 2}>
            <PortaeAstralesIcon fontSize="3xl" />
          </Link>
        </GridItem>

        {/*title/subtitle*/}
        <GridItem display="flex" colSpan={1}>
          <VStack flex={1} gap={0} justify="center" w="full">
            {title && (
              <>
                <Heading>
                  {title.toUpperCase()}
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
              {account ? (
                <ProfileHeader
                  account={account}
                  onDisconnectClick={handleOnDisconnectClick}
                />
              ) : (
                <Button
                  borderColor={foregroundColor}
                  borderLeftWidth={1}
                  onClick={handleOnConnectClick}
                  variant="ghost"
                >
                  {t('labels.connect')}
                </Button>
              )}
            </HStack>
          </HStack>
        </GridItem>
      </Grid>
    </>
  );
};

export default Header;
