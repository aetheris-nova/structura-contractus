// selectors
import { useSelectColorMode } from '@client/selectors';

export default function useBorderColor(): string {
  const colorMode = useSelectColorMode();

  if (colorMode === 'dark') {
    return 'gray.100';
  }

  return 'gray.800';
}
