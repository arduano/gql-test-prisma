export function checkDefined<T>(item: T | null) {
  if (item === null) {
    throw new Error('Item not found');
  }
  return item;
}
