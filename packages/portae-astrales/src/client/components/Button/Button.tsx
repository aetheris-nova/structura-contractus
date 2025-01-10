import { Button as ChakraButton, type ButtonProps } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// hooks
import useBackgroundColor from '@client/hooks/useBackgroundColor';
import useForegroundColor from '@client/hooks/useForegroundColor';

const Button: ForwardRefExoticComponent<
  PropsWithoutRef<ButtonProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  // hooks
  const backgroundColor = useBackgroundColor();
  const foregroundColor = useForegroundColor();

  return (
    <ChakraButton
      _hover={{
        bg: props.variant === 'outline' ? foregroundColor : backgroundColor,
        color: props.variant === 'outline' ? backgroundColor : foregroundColor,
      }}
      borderRadius={0}
      borderWidth={0}
      color={props.variant === 'outline' ? foregroundColor : backgroundColor}
      colorPalette="gray"
      fontFamily="{fonts.mono}"
      h="full"
      textTransform="uppercase"
      transition="ease-in-out 300ms"
      {...props}
      ref={ref}
    />
  );
});

Button.displayName = 'Button';

export default Button;
