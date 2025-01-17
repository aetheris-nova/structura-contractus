import { DataList as ChakraDataList } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface IProps extends ChakraDataList.ItemProps {
  copyText?: string;
  grow?: boolean;
  info?: ReactNode;
  label: ReactNode;
  value: ReactNode;
}

export default IProps;
