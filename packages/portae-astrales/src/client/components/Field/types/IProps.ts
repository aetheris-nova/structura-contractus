import { Field as ChakraField } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface IProps extends Omit<ChakraField.RootProps, 'label'> {
  errorText?: ReactNode;
  helperText?: ReactNode;
  label: ReactNode;
  optionalText?: ReactNode;
}

export default IProps;
