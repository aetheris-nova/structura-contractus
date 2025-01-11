import { HStack, Text, VStack } from '@chakra-ui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GrPower, GrUserSettings } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

// components
import IconButton from '@client/components/IconButton';
import Tooltip from '@client/components/Tooltip';

// constants
import { CHARACTER_ROUTE } from '@client/constants';

// types
import type { IProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';
import truncateText from '@client/utils/truncateText';

const ProfileHeader: FC<IProps> = ({ account, onDisconnectClick }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
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
        {/*name*/}
        <Tooltip content={account.name}>
          <Text fontSize="lg" fontWeight="bold">
            {account.name.length > 25 ? truncateText(account.name, {
              length: 25,
            }) : account.name}
          </Text>
        </Tooltip>

        {/*id*/}
        <Tooltip content={account.id}>
          <Text fontSize="sm">
            {ellipseText(account.id, {
              end: 10,
              start: 10,
            })}
          </Text>
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
      </HStack>
    </HStack>
  );
};

export default ProfileHeader;
