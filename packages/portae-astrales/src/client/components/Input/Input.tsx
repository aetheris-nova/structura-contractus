import { Input as ChakraInput, InputProps } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

const Input: ForwardRefExoticComponent<
  PropsWithoutRef<InputProps> & RefAttributes<HTMLInputElement>
> = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  // hooks
  const foregroundColor = useForegroundColor();

  return (
    <ChakraInput
      borderColor={foregroundColor}
      borderRadius={0}
      colorPalette="gray"
      size="xl"
      {...props}
      ref={ref}
    />
  );
});

Input.displayName = 'Input';

export default Input;
