import { Popover as ChakraPopover, Portal } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// types
import type { IProps } from './types';

const ToggleTip: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, IProps>(({
  children,
  content,
  portalled = true,
  portalRef,
  showArrow,
  ...otherProps
}, ref) => {
  return (
    <ChakraPopover.Root
      {...otherProps}
      positioning={{ ...otherProps.positioning, gutter: 4 }}
    >
      <ChakraPopover.Trigger asChild={true}>
        {children}
      </ChakraPopover.Trigger>

      <Portal disabled={!portalled} container={portalRef}>
        <ChakraPopover.Positioner>
          <ChakraPopover.Content
            width="auto"
            px="2"
            py="1"
            textStyle="xs"
            rounded="sm"
            ref={ref}
          >
            {showArrow && (
              <ChakraPopover.Arrow>
                <ChakraPopover.ArrowTip />
              </ChakraPopover.Arrow>
            )}

            {content}

          </ChakraPopover.Content>
        </ChakraPopover.Positioner>
      </Portal>
    </ChakraPopover.Root>
  );
});

ToggleTip.displayName = 'ToggleTip';

export default ToggleTip;
