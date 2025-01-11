import { Button as ChakraButton } from '@chakra-ui/react';
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

const Button: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, IProps>(({ scheme, ...buttonProps }, ref) => {
  // hooks
  const backgroundColor = useBackgroundColor();
  const foregroundColor = useForegroundColor();

  return (
    <ChakraButton
      _hover={{
        bg: scheme === 'secondary' ? foregroundColor : backgroundColor,
        color: scheme === 'secondary' ? backgroundColor : foregroundColor,
      }}
      background={foregroundColor}
      borderColor={foregroundColor}
      borderRadius={0}
      borderWidth={buttonProps.variant === 'ghost' ? 0 : 1}
      color={scheme === 'secondary' ? foregroundColor : backgroundColor}
      colorPalette="gray"
      fontFamily="{fonts.mono}"
      minH={BUTTON_HEIGHT}
      textTransform="uppercase"
      transition="ease-in-out 300ms"
      {...buttonProps}
      ref={ref}
    />
  );
});

Button.displayName = 'Button';

export default Button;
