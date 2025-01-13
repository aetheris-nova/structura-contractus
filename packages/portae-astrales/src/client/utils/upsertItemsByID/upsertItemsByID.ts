import type { Address } from 'viem';

/**
 * Updates the items, if any exist, otherwise it adds the items and returns the updated items list. This function uses
 * the `id` as the index.
 * @param {Type extends Record<'id', string>} items - A list of items to be added to/updated.
 * @param {Type extends Record<'id', string>} upsertItems - The items to add or update.
 * @returns {Type extends Record<'id', string>} A new list with the items updated or added.
 */
export default function upsertItemsByID<Type extends Record<'id', string>>(items: Type[], upsertItems: Type[]): Type[] {
  const itemsToAdd = upsertItems.filter((item) => !items.some((value) => value.id === item.id));
  const updatedItems = items.map((item) => upsertItems.find((value) => value.id === item.id) || item);

  return [...updatedItems, ...itemsToAdd];
}
