import { Box, BoxProps, HStack } from '@chakra-ui/react';
import { type FC, useMemo } from 'react';

// constants
import { DEFAULT_GAP } from '@client/constants';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// types
import type { IProps } from './types';

const PulseLoader: FC<IProps> = ({ size = 'md' }) => {
  // hooks
  const foregroundColor = useForegroundColor();
  // memos
  const props = useMemo<Partial<BoxProps>>(() => {
    let _size = '0.5rem';

    switch (size) {
      case 'xs':
        _size = '0.25rem';
        break;
      case 'sm':
        _size = '0.375rem';
        break;
      case 'lg':
        _size = '0.75rem';
        break;
      case 'xl':
        _size = '1rem';
        break;
      case 'md':
      default:
        break;
    }

    return {
      background: foregroundColor,
      h: _size,
      w: _size,
    };
  }, []);

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
