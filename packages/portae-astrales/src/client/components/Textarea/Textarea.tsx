import { Textarea as ChakraTextarea, TextareaProps } from '@chakra-ui/react';
import {
  type PropsWithoutRef,
  type ForwardRefExoticComponent,
  forwardRef,
  type RefAttributes,
} from 'react';

// hooks
import useForegroundColor from '@client/hooks/useForegroundColor';

const Textarea: ForwardRefExoticComponent<
  PropsWithoutRef<TextareaProps> & RefAttributes<HTMLTextAreaElement>
> = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  // hooks
  const foregroundColor = useForegroundColor();

  return (
    <ChakraTextarea
      borderColor={foregroundColor}
      borderRadius={0}
      colorPalette="gray"
      size="xl"
      {...props}
      ref={ref}
    />
  );
});

Textarea.displayName = 'Textarea';

export default Textarea;
