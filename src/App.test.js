import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createBulletList, addSibling, increaseHierarchy } from './model';

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


