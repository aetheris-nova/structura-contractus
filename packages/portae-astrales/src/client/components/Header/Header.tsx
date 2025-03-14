import {
  Button,
  BUTTON_HEIGHT,
  DEFAULT_GAP, EvGas,
  type IBaseComponentProps,
  IconButton,
  Tooltip,
} from '@aetherisnova/ui-components';
import { truncateText } from '@aetherisnova/utils';
import { HStack, Spinner, Spacer, VStack, Heading, Text } from '@chakra-ui/react';
import { type FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GrLinkPrevious, GrPower } from 'react-icons/gr';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatUnits } from 'viem';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// icons
import PaLogo from '@client/icons/PaLogo';

// types
import { IProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';

const Header: FC<IProps> = ({ account, colorMode, fetchingWorldConfig, inGame, onConnectClick, onDisconnectClick, worldConfig }) => {
  const { t } = useTranslation();
  const { key } = useLocation();
  const navigate = useNavigate();
  // hooks
  const foregroundColor = useForegroundColor();
  // memos
  const baseProps = useMemo<Partial<IBaseComponentProps>>(() => ({
    colorMode,
  }), [colorMode]);
  const gasBalanceInStandardForm = useMemo(() => {
    if (!account || !worldConfig) {
      return '0';
    }

    return formatUnits(BigInt(account.gasBalanceWei), worldConfig.nativeCurrency.decimals);
  }, [account, worldConfig]);
  // handlers
  const handleOnBackClick = () => navigate(-1);

  return (
    <HStack
      as="header"
      borderColor={foregroundColor}
      borderBottomWidth={1}
      minH={BUTTON_HEIGHT}
      w="full"
    >
      {key === 'default' ? (
        <PaLogo
          size="2xl"
          ml={DEFAULT_GAP / 3}
        />
      ) : (
        <>
          <IconButton
            {...baseProps}
            borderRightWidth={1}
            onClick={handleOnBackClick}
            scheme="secondary"
            variant="ghost"
          >
            <GrLinkPrevious />
          </IconButton>

          <PaLogo size="2xl" />
        </>
      )}

      <Spacer />

      {/*wallet connect*/}
      <HStack gap={DEFAULT_GAP / 3} justify="flex-end" h="full" w="full">
        {fetchingWorldConfig && (
          <Spinner pr={worldConfig ? (DEFAULT_GAP / 3) : 0} size="md" />
        )}

        {worldConfig && (
          <HStack gap={1} justify="flex-end" h="full">
            {account ? (
              <HStack>
                <VStack
                  align="end"
                  gap={0}
                  justify="space-evenly"
                >
                  {/*name/account*/}
                  {account.isSmartCharacter ? (
                    <Tooltip content={account.name}>
                      <Heading fontSize="md" fontWeight="bold">
                        {account.name.length > 25 ? truncateText(account.name, {
                          length: 25,
                        }) : account.name}
                      </Heading>
                    </Tooltip>
                  ) : (
                    <Tooltip content={account.address}>
                      <Heading fontSize="md" fontWeight="bold">
                        {ellipseText(account.address, {
                          end: 5,
                          start: 5,
                        })}
                      </Heading>
                    </Tooltip>
                  )}

                  {/*gas balance*/}
                  <Tooltip content={`${gasBalanceInStandardForm} ${worldConfig.nativeCurrency.symbol}`}>
                    <HStack gap={1} justify="end" w="full">
                      <Text fontSize="sm">
                        {gasBalanceInStandardForm}
                      </Text>

                      <EvGas color={foregroundColor} />
                    </HStack>
                  </Tooltip>
                </VStack>

                <HStack gap={0}>
                  {/*disconnect button*/}
                  {!inGame && (
                    <Tooltip content={t('labels.disconnect')}>
                      <IconButton
                        {...baseProps}
                        borderLeftWidth={1}
                        onClick={onDisconnectClick}
                        scheme="secondary"
                        variant="ghost"
                      >
                        <GrPower />
                      </IconButton>
                    </Tooltip>
                  )}
                </HStack>
              </HStack>
            ) : (
              <Button
                {...baseProps}
                borderColor={foregroundColor}
                borderLeftWidth={1}
                onClick={onConnectClick}
                variant="ghost"
              >
                {t('labels.connect')}
              </Button>
            )}
          </HStack>
        )}
      </HStack>
    </HStack>
  );
};

export default Header;
