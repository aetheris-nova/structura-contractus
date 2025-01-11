import { DataList as ChakraDataList } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// components
import InfoTip from '@client/components/InfoTip';

// types
import type { IProps } from './types';

const DataListItem: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, IProps>(({
  children,
  grow,
  info,
  label,
  value,
  ...otherProps
}, ref) => {
  return (
    <ChakraDataList.Item ref={ref} {...otherProps}>
      <ChakraDataList.ItemLabel flex={grow ? '1' : undefined}>
        {label}
        {info && (
          <InfoTip>
            {info}
          </InfoTip>
        )}
      </ChakraDataList.ItemLabel>

      <ChakraDataList.ItemValue flex={grow ? '1' : undefined}>
        {value}
      </ChakraDataList.ItemValue>

      {children}
    </ChakraDataList.Item>
  );
});

DataListItem.displayName = 'DataListItem';

export default DataListItem;
