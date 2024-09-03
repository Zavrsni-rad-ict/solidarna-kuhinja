export const groupItems = (items: any, keySelector: string) =>
  Object.groupBy(items, (item) => item.controllerName);
