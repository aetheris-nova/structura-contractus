// selectors
import { useSelectColorMode } from '@client/selectors';

export default function useBackgroundColor(): string {
  const colorMode = useSelectColorMode();

  if (colorMode === 'dark') {
    return 'gray.800';
  }

  return 'beige.50';
}
