import { upsertItemsByKey } from '@aetherisnova/utils';

// constants
import { FETCH_ITEM_TIMEOUT } from '@client/constants';

// types
import type { IItem, IItemWithExtendedProps, TActionCreator } from '@client/types';

// utils
import fetchItemByID from '@client/utils/fetchItemByID';

const fetchItemAction: TActionCreator<string, Promise<IItemWithExtendedProps | null>> =
  ({ getState, setState }) =>
  async (id) => {
    const __function = 'fetchItemAction';
    const fetchingItems = getState().fetchingItems;
    const items = getState().items;
    const item = items.find((value) => value.id === id) || null;
    const logger = getState().logger;
    const now = new Date();
    let _item: IItemWithExtendedProps;
    let result: IItem;

    // if we are already fetching the item or the was recently updated, skip
    if (
      !!fetchingItems.find((value) => value === id) ||
      (item && now.getTime() > item.lastUpdatedAt + FETCH_ITEM_TIMEOUT)
    ) {
      return item;
    }

    setState((state) => ({
      ...state,
      fetchingItems: [...state.fetchingItems, id],
    }));

    try {
      result = await fetchItemByID(id);

      if (result.metadata.attributes.length <= 0) {
        return null;
      }

      _item = {
        ...result,
        id,
        lastUpdatedAt: now.getTime(),
      };

      setState((state) => ({
        ...state,
        fetchingItems: fetchingItems.filter((value) => value !== id),
        items: upsertItemsByKey<IItemWithExtendedProps>(state.items, [_item], 'id'),
      }));

      return _item;
    } catch (error) {
      logger.error(`${__function}:`, error);

      setState((state) => ({
        ...state,
        fetchingItems: fetchingItems.filter((value) => value !== id),
      }));

      return null;
    }
  };

export default fetchItemAction;
