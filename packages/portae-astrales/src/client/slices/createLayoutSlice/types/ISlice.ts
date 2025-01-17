import { ColorMode } from '@chakra-ui/color-mode';

// errors
import BaseError from '@client/errors/BaseError';

// types
import type ILoadingModalDetails from './ILoadingModalDetails';

interface ISlice {
  // state
  colorMode: ColorMode;
  error: BaseError | null;
  loadingModalDetails: ILoadingModalDetails | null;
  subtitle: string | null;
  title: string | null;
  // actions
  setColorModeAction: (colorMode: ColorMode) => void;
  setErrorAction: (error: BaseError | null) => void;
  setLoadingModalDetailsAction: (details: ILoadingModalDetails | null) => void;
  setSubtitleAction: (subtitle: string | null) => void;
  setTitleAction: (title: string | null) => void;
}

export default ISlice;
