import {
  DEFAULT_GAP,
  useTabletAndUp,
} from '@aetherisnova/ui-components';
import { HStack, Icon, Link as ChakraLink, Spacer, Text, VStack } from '@chakra-ui/react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// types
import type { IProps } from './types';

const ListItem: FC<IProps> = ({ icon, isExternalLink, link, title, secondarySubtitle, secondaryTitle, subtitle }) => {
  // hooks
  const foregroundColor = useForegroundColor();
  const isTabletAndUp = useTabletAndUp();
  // renders
  const renderTitle = () => {
    const _title = (
      <Text
        fontSize="md"
        fontWeight="semibold"
        maxW={200}
        truncate={true}
        w="full"
        {...(isTabletAndUp && {
          maxW: 'auto',
        })}
      >
        {title}
      </Text>
    );

    if (!link) {
      return _title;
    }

    return (
      <ChakraLink asChild={true} variant="underline">
        <Link
          to={link}
          {...(isExternalLink && {
            target: '_blank',
          })}
        >
          {_title}
        </Link>
      </ChakraLink>
    );
  };

  return (
    <HStack
      align="center"
      borderBottomWidth={1}
      borderColor={foregroundColor}
      justify="start"
      p={DEFAULT_GAP / 3}
      w="full"
    >
      {/*icon*/}
      <Icon fontSize={!isTabletAndUp ? '2xl' : '3xl'} color={foregroundColor}>
        {icon}
      </Icon>

      <VStack
        align="start"
        gap={0}
        h="full"
        justify="space-between"
        w="full"
        {...(icon && {
          pl: DEFAULT_GAP / 3,
        })}
      >
        {/*title*/}
        {renderTitle()}

        <Spacer />

        {/*subtitle*/}
        {subtitle && (
          <Text
            fontSize="sm"
            maxW={200}
            truncate={true}
            {...(isTabletAndUp && {
              maxW: 'auto',
            })}
          >
            {subtitle}
          </Text>
        )}
      </VStack>

      <VStack
        align="end"
        gap={0}
        h="full"
        justify="space-between"
        pl={DEFAULT_GAP / 3}
        w="full"
      >
        {/*secondary title*/}
        {secondaryTitle && (
          <Text
            maxW={150}
            truncate={true}
            {...(isTabletAndUp && {
              maxW: 'auto',
            })}
          >
            {secondaryTitle}
          </Text>
        )}

        <Spacer />

        {/*secondary subtitle*/}
        {secondarySubtitle && (
          <Text
            fontSize="sm"
            maxW={150}
            truncate={true}
            {...(isTabletAndUp && {
              maxW: 'auto',
            })}
          >
            {secondarySubtitle}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default ListItem;
