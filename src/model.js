export function createBulletListItem(hierarchy) {
  return {
    hierarchy,
    children: [],
    isSelected: false,
  };
}
