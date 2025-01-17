import type { ReactElement, ReactNode } from 'react';

// types
import type { IProps as IButtonProps } from '@client/components/Button';

interface IProps {
  body: ReactNode;
  closeButton?: boolean;
  footer?: ReactElement<IButtonProps>[];
  onClose?: () => void;
  open: boolean;
  subtitle?: string;
  title?: string;
}

export default IProps;
