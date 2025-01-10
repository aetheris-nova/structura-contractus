import { Box, BoxProps, HStack } from '@chakra-ui/react';
import { type FC, useMemo } from 'react';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

const PulseLoader: FC = () => {
  // hooks
  const foregroundColor = useForegroundColor();
  // misc
  const props = useMemo<Partial<BoxProps>>(() => ({
    background: foregroundColor,
    h: DEFAULT_GAP - 2,
    w: DEFAULT_GAP - 2,
  }), []);

  return (
    <HStack gap={DEFAULT_GAP / 3}>
      <Box
        animation="pulse 1.2s infinite steps(1) -0.8s"
        {...props}
      />

      <Box
        animation="pulse 1.2s infinite steps(1) -0.4s"
        {...props}
      />

      <Box
        animation="pulse 1.2s infinite steps(1)"
        {...props}
      />
    </HStack>
  )
};

export default PulseLoader;
