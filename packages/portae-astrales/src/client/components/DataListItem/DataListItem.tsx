import { DataList as ChakraDataList, HStack, useClipboard } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes, useMemo,
} from 'react';
import { GrCheckmark, GrCopy } from 'react-icons/gr';

// components
import IconButton from '@client/components/IconButton';
import InfoTip from '@client/components/InfoTip';

// constants
import { DEFAULT_GAP } from '@client/constants';

// types
import type { IProps } from './types';

const DataListItem: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, IProps>(({
  children,
  copyText,
  grow,
  info,
  label,
  value,
  ...otherProps
}, ref) => {
  const {
    copied,
    copy,
  } = useClipboard({
    value: copyText,
  });
  // memos
  const minHeight = useMemo(() => 8, []);
  // handlers
  const handleOnCopyClick = () => copy();

  return (
    <ChakraDataList.Item minH={minHeight} ref={ref} {...otherProps}>
      <ChakraDataList.ItemLabel flex={grow ? '1' : undefined}>
        {label}
        {info && (
          <InfoTip>
            {info}
          </InfoTip>
        )}
      </ChakraDataList.ItemLabel>

      <ChakraDataList.ItemValue flex={grow ? '1' : undefined} justifyContent="flex-end" wordBreak="break-all">
        <HStack gap={1}>
          {value}

          {copyText && (
            <IconButton
              minH={minHeight}
              minW={minHeight}
              onClick={handleOnCopyClick}
              scheme="secondary"
              size="xs"
              variant="ghost"
            >
              {copied ? (
                <GrCheckmark />
              ) : (
                <GrCopy />
              )}
            </IconButton>
          )}
        </HStack>
      </ChakraDataList.ItemValue>

      {children}
    </ChakraDataList.Item>
  );
});

DataListItem.displayName = 'DataListItem';

export default DataListItem;
