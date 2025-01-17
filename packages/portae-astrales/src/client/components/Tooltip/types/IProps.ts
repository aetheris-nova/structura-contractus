import { Tooltip } from '@chakra-ui/react';
import type { ReactNode, RefObject } from 'react';

interface IProps extends Tooltip.RootProps {
  content: ReactNode;
  contentProps?: Tooltip.ContentProps;
  disabled?: boolean;
  portalled?: boolean;
  portalRef?: RefObject<HTMLElement>;
  showArrow?: boolean;
}

export default IProps;
