import { IconButton as ChakraIconButton, type IconButtonProps } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

const IconButton: ForwardRefExoticComponent<
  PropsWithoutRef<IconButtonProps> & RefAttributes<HTMLButtonElement>
> = forwardRef<HTMLButtonElement, IconButtonProps>((props: IconButtonProps, ref) => {
  return (
    <ChakraIconButton
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

IconButton.displayName = 'IconButton';

export default IconButton;
