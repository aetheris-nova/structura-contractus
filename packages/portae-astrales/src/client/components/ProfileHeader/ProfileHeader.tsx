import { type IBaseComponentProps, IconButton, Tooltip } from '@aetherisnova/ui-components';
import { truncateText } from '@aetherisnova/utils';
import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GrPower, GrUserSettings } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { formatUnits } from 'viem';

// constants
import { CHARACTER_ROUTE } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// icons
import EvGas from '@client/icons/EvGas';

// selectors
import { useSelectColorMode } from '@client/selectors';

// types
import type { IProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';

const ProfileHeader: FC<IProps> = ({ account, inGame, onDisconnectClick, worldConfig }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // hooks
  const foregroundColor = useForegroundColor();
  // selectors
  const colorMode = useSelectColorMode();
  // memos
  const baseProps = useMemo<Partial<IBaseComponentProps>>(() => ({
    colorMode,
  }), [colorMode]);
  const gasBalanceInStandardForm = useMemo(() => formatUnits(BigInt(account.gasBalanceWei), worldConfig.nativeCurrency.decimals), []);
  // handlers
  const handleOnCharacterDetailsClick = () => navigate(CHARACTER_ROUTE);
  const handleOnDisconnectClick = () => onDisconnectClick();

  return (
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
        {/*character details button*/}
        <Tooltip content={t('labels.characterDetails')}>
          <IconButton
            {...baseProps}
            borderLeftWidth={1}
            onClick={handleOnCharacterDetailsClick}
            scheme="secondary"
            variant="ghost"
          >
            <GrUserSettings />
          </IconButton>
        </Tooltip>

        {/*disconnect button*/}
        {!inGame && (
          <Tooltip content={t('labels.disconnect')}>
            <IconButton
              {...baseProps}
              borderLeftWidth={1}
              onClick={handleOnDisconnectClick}
              scheme="secondary"
              variant="ghost"
            >
              <GrPower />
            </IconButton>
          </Tooltip>
        )}
      </HStack>
    </HStack>
  );
};

export default ProfileHeader;
