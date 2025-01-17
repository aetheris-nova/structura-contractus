import { EmptyState as ChakraEmptyState, VStack } from '@chakra-ui/react';
import { forwardRef, type ForwardRefExoticComponent, type PropsWithoutRef, type RefAttributes } from 'react';

// types
import type { IProps } from './types';

const EmptyState: ForwardRefExoticComponent<
  PropsWithoutRef<IProps & ChakraEmptyState.RootProps> & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, IProps>(({ title, description, icon, children, ...otherProps }: IProps & ChakraEmptyState.RootProps, ref) => {
  return (
    <ChakraEmptyState.Root ref={ref} {...otherProps}>
      <ChakraEmptyState.Content>
        {icon && (
          <ChakraEmptyState.Indicator>
            {icon}
          </ChakraEmptyState.Indicator>
        )}

        {description ? (
          <VStack textAlign="center">
            <ChakraEmptyState.Title>
              {title.toUpperCase()}
            </ChakraEmptyState.Title>

            <ChakraEmptyState.Description>
              {description}
            </ChakraEmptyState.Description>
          </VStack>
        ) : (
          <ChakraEmptyState.Title>
            {title.toUpperCase()}
          </ChakraEmptyState.Title>
        )}

        {children}
      </ChakraEmptyState.Content>
    </ChakraEmptyState.Root>
  );
});

EmptyState.displayName = 'EmptyState';

export default EmptyState;
