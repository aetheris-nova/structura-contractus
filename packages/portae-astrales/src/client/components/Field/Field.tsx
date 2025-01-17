import {  Field as ChakraField } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

// types
import type { IProps } from './types';

const Field: ForwardRefExoticComponent<
  PropsWithoutRef<IProps> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, IProps>(({
  children,
  errorText,
  helperText,
  label,
  optionalText,
  ...otherProps
}, ref) => {
  // hooks
  const foregroundColor = useForegroundColor();

  return (
    <ChakraField.Root ref={ref} {...otherProps}>
      {label && (
        <ChakraField.Label>
          {label}
          <ChakraField.RequiredIndicator color={foregroundColor} fallback={optionalText} />
        </ChakraField.Label>
      )}
      {children}
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && (
        <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>
      )}
    </ChakraField.Root>
  );
});

Field.displayName = 'Field';

export default Field;
