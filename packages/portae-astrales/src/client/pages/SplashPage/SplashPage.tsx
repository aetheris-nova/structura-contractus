import { DEFAULT_GAP, PulseLoader } from '@aetherisnova/ui-components';
import { Text, VStack } from '@chakra-ui/react';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

// components
import Footer from '@client/components/Footer';
import Layout from '@client/components/Layout';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

const SplashPage: FC = () => {
  const { t } = useTranslation();
  // hooks
  const foregroundColor = useForegroundColor();

  return (
    <Layout>
      <VStack
        align="center"
        as="main"
        borderColor={foregroundColor}
        borderWidth={1}
        flex={1}
        gap={DEFAULT_GAP - 2}
        justify="center"
        w="full"
      >
        <PulseLoader size="lg" />

        <Text>
          {t('captions.pleaseWait')}
        </Text>
      </VStack>

      <Footer />
    </Layout>
  );
};

export default SplashPage;
