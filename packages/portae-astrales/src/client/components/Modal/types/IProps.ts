import type { ButtonProps } from '@chakra-ui/react';
import type { ReactElement, ReactNode } from 'react';

// components
import Button from '@client/components/Button';

interface IProps {
  body: ReactNode;
  closeButton?: boolean;
  footer?: ReactElement<ButtonProps>[];
  onClose?: () => void;
  open: boolean;
  subtitle?: string;
  title?: string;
}

export default IProps;
