import { ColorMode } from '@chakra-ui/color-mode';

interface ISlice {
  colorMode: ColorMode;
  // setters
  setColorMode: (value: ColorMode) => void;
}

export default ISlice;
