// actions
import setColorModeAction from './actions/setColorModeAction';
import setSubtitleAction from './actions/setSubtitleAction';
import setTitleAction from './actions/setTitleAction';

// types
import type { TStateCreator } from '@client/types';
import type { ISlice } from './types';

const createLayoutSlice: TStateCreator<ISlice> = (setState, getState) => {
  const api = { getState, setState };

  return {
    // state
    colorMode: 'light',
    subtitle: null,
    title: null,
    // actions
    setColorModeAction: setColorModeAction(api),
    setSubtitleAction: setSubtitleAction(api),
    setTitleAction: setTitleAction(api),
  };
};

export default createLayoutSlice;
