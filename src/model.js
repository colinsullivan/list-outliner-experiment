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
function findItemIndex (list, item) {
  return list.findIndex(function (listItem) {
    return item === listItem;
  });
}
export function increaseHierarchy (list, item) {
  let itemIndex = findItemIndex(list, item);
  
  return list.updateIn(
    [itemIndex, 'hierarchy'],
    hierarchy => hierarchy + 1
  );
}
export function decreaseHierarchy (list, item) {
  let itemIndex = findItemIndex(list, item);
  
  return list.updateIn(
    [itemIndex, 'hierarchy'],
    hierarchy => Math.max(0, hierarchy - 1)
  );
}

export function selectItem (list, item) {
  let itemIndex = findItemIndex(list, item);
  return list.updateIn(
    [itemIndex, 'isSelected'],
    selected => true
  );
}

export function deselectItem (list, item) {
  let itemIndex = findItemIndex(list, item);
  return list.updateIn(
    [itemIndex, 'isSelected'],
    selected => false
  );
}

export function deselectAll (list) {
  return list.map(function (item) {
    return item.update('isSelected', isSelected => false);
  });
}

// dest item needs not be a selected item
export function moveSelectedTo (list, destItem) {
  let selectedItems = list.filter((listItem) => {
    return listItem.get('isSelected') === true;
  });
  let notSelectedItems = list.filter((listItem) => {
    return listItem.get('isSelected') === false;
  });

  let destIndex = findItemIndex(notSelectedItems, destItem);
  let left = notSelectedItems.slice(0, destIndex + 1);
  let right = notSelectedItems.slice(destIndex + 1);
  return left.concat(selectedItems, right);

}
