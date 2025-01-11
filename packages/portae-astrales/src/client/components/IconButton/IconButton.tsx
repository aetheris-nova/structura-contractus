import { IconButton as ChakraIconButton } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// constants
import { BUTTON_HEIGHT } from '@client/constants';

// hooks
import useBackgroundColor from '@client/hooks/useBackgroundColor';
import useForegroundColor from '@client/hooks/useForegroundColor';

// types
import type { IProps } from './types';

const IconButton: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, IProps>(({ scheme, ...buttonProps }, ref) => {
  // hooks
  const backgroundColor = useBackgroundColor();
  const foregroundColor = useForegroundColor();

  return (
    <ChakraIconButton
      _hover={{
        bg: scheme === 'secondary' ? foregroundColor : backgroundColor,
        color: scheme === 'secondary' ? backgroundColor : foregroundColor,
      }}
      background={scheme === 'secondary' ? backgroundColor : foregroundColor}
      borderColor={foregroundColor}
      borderRadius={0}
      borderWidth={buttonProps.variant === 'ghost' ? 0 : 1}
      color={scheme === 'secondary' ? foregroundColor : backgroundColor}
      colorPalette="gray"
      fontFamily="{fonts.mono}"
      minH={BUTTON_HEIGHT}
      minW={BUTTON_HEIGHT}
      textTransform="uppercase"
      transition="ease-in-out 300ms"
      {...buttonProps}
      ref={ref}
    />
  );
});

IconButton.displayName = 'IconButton';

export default IconButton;
