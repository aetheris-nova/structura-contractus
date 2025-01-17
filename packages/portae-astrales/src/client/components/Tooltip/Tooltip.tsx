import { Tooltip as ChakraTooltip, Portal } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// types
import type { IProps } from './types';

const Tooltip: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, IProps>(({
  children,
  content,
  contentProps,
  disabled,
  portalled,
  portalRef,
  showArrow,
  ...otherProps
}, ref) => {
  if (disabled) {
    return children;
  }

  return (
    <ChakraTooltip.Root closeDelay={100} openDelay={300} {...otherProps}>
      <ChakraTooltip.Trigger asChild={true}>
        {children}
      </ChakraTooltip.Trigger>

      <Portal disabled={!portalled} container={portalRef}>
        <ChakraTooltip.Positioner>
          <ChakraTooltip.Content ref={ref} {...contentProps}>
            {showArrow && (
              <ChakraTooltip.Arrow>
                <ChakraTooltip.ArrowTip />
              </ChakraTooltip.Arrow>
            )}

            {content}
          </ChakraTooltip.Content>

        </ChakraTooltip.Positioner>

      </Portal>

    </ChakraTooltip.Root>
  );
});

Tooltip.displayName = 'Tooltip';

export default Tooltip;
