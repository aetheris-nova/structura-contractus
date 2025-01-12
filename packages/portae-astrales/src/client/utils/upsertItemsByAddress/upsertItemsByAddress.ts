import type { Address } from 'viem';

/**
 * Updates the items, if any exist, otherwise it adds the items and returns the updated items list. This function uses
 * the `address` as the index.
 * @param {Type extends Record<'address', Address>} items - A list of items to be added to/updated.
 * @param {Type extends Record<'address', Address>} upsertItems - The items to add or update.
 * @returns {Type extends Record<'address', Address>} A new list with the items updated or added.
 */
export default function upsertItemsByAddress<Type extends Record<'address', Address>>(
  items: Type[],
  upsertItems: Type[]
): Type[] {
  const itemsToAdd = upsertItems.filter((item) => !items.some((value) => value.address === item.address));
  const updatedItems = items.map((item) => upsertItems.find((value) => value.address === item.address) || item);

  return [...updatedItems, ...itemsToAdd];
}
