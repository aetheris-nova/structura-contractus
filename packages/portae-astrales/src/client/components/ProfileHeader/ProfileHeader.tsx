import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GrPower, GrUserSettings } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import { formatUnits } from 'viem';

// components
import IconButton from '@client/components/IconButton';
import Tooltip from '@client/components/Tooltip';

// constants
import { CHARACTER_ROUTE } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// icons
import EvGas from '@client/icons/EvGas';

// types
import type { IProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';
import truncateText from '@client/utils/truncateText';

const ProfileHeader: FC<IProps> = ({ account, inGame, onDisconnectClick, worldConfig }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // hooks
  const foregroundColor = useForegroundColor();
  // memos
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
