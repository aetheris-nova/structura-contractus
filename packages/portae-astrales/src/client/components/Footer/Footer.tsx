import { HStack, Text } from '@chakra-ui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

const Footer: FC = () => {
  const { t } = useTranslation();

  return (
    <HStack
      align="center"
      as="footer"
      justify="space-between"
      py={1}
      w="full"
    >
      <Text fontSize="xs">{t('titles.page')}</Text>

      {/*version*/}
      <Text fontSize="xs">{`v${__VERSION__}`}</Text>
    </HStack>
  );
};

export default Footer;
