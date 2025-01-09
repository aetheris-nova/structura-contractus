import { Button as ChakraButton, type ButtonProps } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

const Button: ForwardRefExoticComponent<
  PropsWithoutRef<ButtonProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  // hooks

  return (
    <ChakraButton
      _hover={{
        bg: 'beige.50',
        color: 'gray.800',
      }}
      borderRadius={0}
      borderWidth={0}
      color="beige.50"
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
