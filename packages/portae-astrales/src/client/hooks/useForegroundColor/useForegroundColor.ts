// selectors
import { useSelectColorMode } from '@client/selectors';

export default function useForegroundColor(): string {
  const colorMode = useSelectColorMode();

  if (colorMode === 'dark') {
    return 'beige.50';
  }

  return 'gray.800';
}
