import { Heading, HStack, Icon, Link as ChakraLink, Spacer, Text, VStack } from '@chakra-ui/react';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// constants
import { DEFAULT_GAP } from '@client/constants';

// types
import type { IProps } from './types';

const ListItem: FC<IProps> = ({ icon, isExternalLink, link, title, secondarySubtitle, secondaryTitle, subtitle }) => {
  // hooks
  const foregroundColor = useForegroundColor();
  // renders
  const renderTitle = () => {
    const _title = (
      <Text fontSize="md" fontWeight="semibold" w="full">
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
      p={DEFAULT_GAP / 2}
      w="full"
    >
      {/*icon*/}
      <Icon fontSize="3xl" color={foregroundColor}>
        {icon}
      </Icon>

      <VStack
        align="start"
        gap={0}
        h="full"
        justify="space-between"
        w="full"
        {...(icon && {
          pl: DEFAULT_GAP / 2,
        })}
      >
        {/*title*/}
        {renderTitle()}

        <Spacer />

        {/*subtitle*/}
        {subtitle && (
          <Text fontSize="sm" truncate={true}>
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
          <Text truncate={true}>
            {secondaryTitle}
          </Text>
        )}

        <Spacer />

        {/*secondary subtitle*/}
        {secondarySubtitle && (
          <Text fontSize="sm" truncate={true}>
            {secondarySubtitle}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default ListItem;
