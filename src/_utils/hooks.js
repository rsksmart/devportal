export const getSideBarRootItemIndex = (items, item) => {
  const index = items.findIndex((sidebarItem) => sidebarItem.label === item.label)
  return index === -1 ? 0 : index;
}
export const findSidebarItemIndex = (items, item, path = []) => {

  if (!items?.length) return null;

  for (let i = 0; i < items.length; i++) {
    if ((item.type == 'category' && items[i].label === item.label) || (item.type == 'link' && items[i].href === item.href)){
      return path.length === 0 ? `${i + 1}.0` : [...path, i + 1].join('.');
    }
    if (items[i].items) {
      const found = findSidebarItemIndex(items[i].items, item, [...path, i + 1]);
      if (found) return found;
    }
  }
  return null;
}
