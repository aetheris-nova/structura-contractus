import { Popover as ChakraPopover } from '@chakra-ui/react';
import type { ReactNode, RefObject } from 'react';

interface IProps extends ChakraPopover.RootProps {
  content: ReactNode;
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement>;
  showArrow?: boolean;
}

export default IProps;
