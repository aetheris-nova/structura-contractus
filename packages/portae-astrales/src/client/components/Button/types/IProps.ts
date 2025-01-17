import type { ButtonProps } from '@chakra-ui/react';

interface IProps extends Omit<ButtonProps, 'children'> {
  children: string;
  scheme?: 'primary' | 'secondary';
}

export default IProps;
