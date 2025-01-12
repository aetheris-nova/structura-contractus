import { Box, Heading, HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { GrCaretNext } from 'react-icons/gr';
import { Link } from 'react-router-dom';

// components
import IconButton from '@client/components/IconButton';
import Tooltip from '@client/components/Tooltip';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// constants
import { ASSEMBLY_ITEM_HEIGHT, DEFAULT_GAP, SMART_ASSEMBLY_ROUTE } from '@client/constants';

// types
import type { IProps } from './types';

// utils
import ellipseText from '@client/utils/ellipseText';
import smartAssemblyIcon from '@client/utils/smartAssemblyIcon';

const SmartAssemblyItem: FC<IProps> = ({ smartAssembly }) => {
  const { t } = useTranslation();
  // hooks
  const foregroundColor = useForegroundColor();

  return (
    <HStack
      align="center"
      borderBottomWidth={1}
      borderColor={foregroundColor}
      justify="start"
      minH={ASSEMBLY_ITEM_HEIGHT}
      px={DEFAULT_GAP / 2}
      w="full"
    >
      {/*icon*/}
      <Icon fontSize="3xl" color={foregroundColor}>
        {smartAssemblyIcon(smartAssembly.assemblyType)}
      </Icon>

      <VStack
        gap={0}
        pl={DEFAULT_GAP / 3}
        w="full"
      >
        {/*name/id*/}
        <Tooltip content={smartAssembly.name?.length > 0 ? smartAssembly.name : smartAssembly.id}>
          <Heading fontSize="md" w="full">
            {smartAssembly.name?.length > 0 ? smartAssembly.name : ellipseText(smartAssembly.id, {
              end: 15,
              start: 15,
            })}
          </Heading>
        </Tooltip>

        {/*type*/}
        <Text fontSize="sm" w="full">
          {t('labels.smartAssemblyType', { context: smartAssembly.assemblyType })}
        </Text>

        {/*state*/}
        <Text fontSize="sm" w="full">
          {smartAssembly.state}
        </Text>
      </VStack>

      <VStack
        gap={0}
        justify="end"
        pl={DEFAULT_GAP / 3}
      >
        {/*location*/}
        <Text fontSize="sm">
          {smartAssembly.solarSystem.solarSystemName.length > 0 ? smartAssembly.solarSystem.solarSystemName.length : '-'}
        </Text>
      </VStack>

      <Box pl={DEFAULT_GAP / 3}>
        <IconButton as={Link} scheme="secondary" to={`${SMART_ASSEMBLY_ROUTE}/${smartAssembly.id}`}>
          <GrCaretNext />
        </IconButton>
      </Box>
    </HStack>
  );
};

export default SmartAssemblyItem;
