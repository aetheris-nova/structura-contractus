import { Button, type IBaseComponentProps, IconButton } from '@aetherisnova/ui-components';
import { HStack, Link, Spinner, useDisclosure, Spacer } from '@chakra-ui/react';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GrLinkPrevious } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDisconnect } from 'wagmi';

// components
import ProfileHeader from '@client/components/ProfileHeader';

// constants
import { DEFAULT_GAP, BUTTON_HEIGHT } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// icons
import PaLogo from '@client/icons/PaLogo';

// modals
import WalletSelectModal from '@client/modals/WalletSelectModal';

// selectors
import { useSelectSelectedAccount } from '@client/selectors';

// utils
import useStore from '@client/utils/useStore';

const Header: FC = () => {
  const { t } = useTranslation();
  const { key } = useLocation();
  const navigate = useNavigate();
  const { disconnectAsync } = useDisconnect();
  const { onClose: onWalletSelectDialogClose, onOpen: onWalletSelectDialogOpen, open: walletSelectDialogOpen } = useDisclosure();
  const { colorMode, inGame, isFetchingWorldConfig, setAccountsAction, worldConfig } = useStore();
  // selectors
  const account = useSelectSelectedAccount();
  // hooks
  const foregroundColor = useForegroundColor();
  // memos
  const baseProps = useMemo<Partial<IBaseComponentProps>>(() => ({
    colorMode,
  }), [colorMode]);
  // handlers
  const handleOnConnectClick = () => onWalletSelectDialogOpen();
  const handleOnBackClick = () => navigate(-1);
  const handleOnDisconnectClick = async () => {
    await disconnectAsync();
    await setAccountsAction([]); // remove any stored account data
  };

  return (
    <>
      <WalletSelectModal onClose={onWalletSelectDialogClose} open={walletSelectDialogOpen} />

      <HStack
        as="header"
        borderColor={foregroundColor}
        borderBottomWidth={1}
        minH={BUTTON_HEIGHT}
        w="full"
      >
        {key !== 'default' && (
          <IconButton
            {...baseProps}
            borderRightWidth={1}
            onClick={handleOnBackClick}
            scheme="secondary"
            variant="ghost"
          >
            <GrLinkPrevious />
          </IconButton>
        )}

        <Link href="/" ml={DEFAULT_GAP / 2}>
          <PaLogo fontSize="2xl" />
        </Link>

        <Spacer />

        {/*wallet connect*/}
        <HStack gap={DEFAULT_GAP / 3} justify="flex-end" h="full" w="full">
          {isFetchingWorldConfig && (
            <Spinner pr={worldConfig ? (DEFAULT_GAP / 3) : 0} size="md" />
          )}

          {worldConfig && (
            <HStack gap={1} justify="flex-end" h="full">
              {account ? (
                <ProfileHeader
                  account={account}
                  inGame={inGame}
                  onDisconnectClick={handleOnDisconnectClick}
                  worldConfig={worldConfig}
                />
              ) : (
                <Button
                  {...baseProps}
                  borderColor={foregroundColor}
                  borderLeftWidth={1}
                  onClick={handleOnConnectClick}
                  variant="ghost"
                >
                  {t('labels.connect')}
                </Button>
              )}
            </HStack>
          )}
        </HStack>
      </HStack>
    </>
  );
};

export default Header;
