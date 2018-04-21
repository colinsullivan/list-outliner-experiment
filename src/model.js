import Immutable from 'immutable';

export function createBulletListItem(hierarchy, parent) {
  return Immutable.Map({
    hierarchy,
    children: Immutable.List([]),
    isSelected: false,
    parent
  });
}
