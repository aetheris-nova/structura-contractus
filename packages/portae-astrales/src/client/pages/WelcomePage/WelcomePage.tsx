import { Heading, Spacer, Text, VStack } from '@chakra-ui/react';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Page from '@client/components/Page';

// selectors
import { useSelectSelectedAccount } from '@client/selectors';

const WelcomePage: FC = () => {
  const { t } = useTranslation();
  // selectors
  const account = useSelectSelectedAccount();

  return (
    <Page>
      <Spacer />

      <VStack w="full">
        <Heading fontSize="2xl">
          {account ? t('headings.welcomeWithCharacter', { name: account.name }) : t('headings.welcome')}
        </Heading>

        <Text fontSize="sm">
          {t('captions.description')}
        </Text>
      </VStack>

      <Spacer />
    </Page>
  );
};

export default WelcomePage;
