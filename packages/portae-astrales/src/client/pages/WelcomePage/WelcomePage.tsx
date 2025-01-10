import { Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Page from '@client/components/Page';

const WelcomePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Page>
      <Spacer />

      <VStack w="full">
        <Heading fontSize="2xl">{t('headings.welcome')}</Heading>

        <Text fontSize="sm">{t('captions.description')}</Text>
      </VStack>

      <Spacer />
    </Page>
  );
};

export default WelcomePage;
