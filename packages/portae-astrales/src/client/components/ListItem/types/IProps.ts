import type { ReactNode } from 'react';

interface IProps {
  icon?: ReactNode;
  isExternalLink?: boolean;
  link?: string;
  title: string;
  secondarySubtitle?: string;
  secondaryTitle?: string;
  subtitle?: string;
}

export default IProps;
