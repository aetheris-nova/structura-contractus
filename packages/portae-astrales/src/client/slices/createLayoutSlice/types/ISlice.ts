import { ColorMode } from '@chakra-ui/color-mode';

interface ISlice {
  // state
  colorMode: ColorMode;
  subtitle: string | null;
  title: string | null;
  // actions
  setColorModeAction: (colorMode: ColorMode) => void;
  setSubtitleAction: (subtitle: string | null) => void;
  setTitleAction: (title: string | null) => void;
}

export default ISlice;
