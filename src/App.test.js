import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {
  createBulletList,
  addSibling,
  increaseHierarchy,
  decreaseHierarchy,
  selectItem,
  deselectItem
} from './model';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("should append a sibling properly", function () {
  var list = createBulletList();

  list = addSibling(list, list.get(0));

  expect(list.size).toEqual(2);
  expect(list.getIn([0, 'hierarchy'])).toEqual(0);
  expect(list.getIn([1, 'hierarchy'])).toEqual(0);
});

it("should indent an item properly", function () {
  var list = createBulletList();

  list = addSibling(list, list.get(0));

  list = increaseHierarchy(list, list.get(1));
  expect(list.getIn([1, 'hierarchy'])).toEqual(1);
});

it("should deindent an item properly", function () {
  var list = createBulletList();

  list = addSibling(list, list.get(0));

  list = decreaseHierarchy(list, list.get(1));
  expect(list.getIn([1, 'hierarchy'])).toEqual(0);
 
  // shouldn't deindent past 0
  list = decreaseHierarchy(list, list.get(1));
  expect(list.getIn([1, 'hierarchy'])).toEqual(0);
});

it("should select and deselect items properly", function () {
  var list = createBulletList();

  list = addSibling(list, list.get(0));

  list = selectItem(list, list.get(1));
  expect(list.getIn([1, 'isSelected'])).toEqual(true);
  list = deselectItem(list, list.get(1));
  expect(list.getIn([1, 'isSelected'])).toEqual(false);
});
