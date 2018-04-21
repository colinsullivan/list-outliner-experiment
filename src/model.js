import Immutable from 'immutable';

export function createBulletList() {
  return Immutable.List([
    createBulletListItem(0)
  ]);
}

export function createBulletListItem(hierarchy) {
  return Immutable.Map({
    hierarchy,
    isSelected: false
  });
}

export function addSibling (list, item) {
  var newItem,
    newItemIndex;
  
  newItemIndex = list.indexOf(item) + 1;
  newItem = createBulletListItem(item.get('hierarchy'));

  return list.insert(
    newItemIndex,
    newItem
  );
}
export function increaseHierarchy (list, item) {
  let itemIndex = list.findIndex(function (listItem) {
    return item === listItem;
  });
  
  return list.updateIn(
    [itemIndex, 'hierarchy'],
    hierarchy => hierarchy + 1
  );
}
