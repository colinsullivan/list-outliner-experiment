export function createBulletListItem(hierarchy, content = "") {
  return {
    hierarchy,
    content,
    children: [],
    isSelected: false,
  };
}
