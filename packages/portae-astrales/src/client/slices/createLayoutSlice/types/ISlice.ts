import { ColorMode } from '@chakra-ui/color-mode';

interface ISlice {
  colorMode: ColorMode;
  subtitle: string | null;
  title: string | null;
  // setters
  setColorMode: (colorMode: ColorMode) => void;
  setSubtitle: (subtitle: string | null) => void;
  setTitle: (title: string | null) => void;
}

export default ISlice;
