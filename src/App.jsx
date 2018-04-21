import React, { Component } from 'react';
import './App.css';
import Immutable from 'immutable';

import { createBulletListItem } from './model';
import BulletListItemEditor from './BulletListItemEditor.jsx';


const DRAG_STATES = {
  "NONE": "NONE"
};

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tree: Immutable.Map({
        hierarchy: -1,
        children: Immutable.List([]),
        parent: null
      }),
      dragState: DRAG_STATES.NONE,
      dragStart: {x: 0, y: 0},
      mousePosition: {x: 0, y: 0}
    };

  }
  /**
   *  On init, create a first list item.
   **/
  componentDidMount () {
    this.createChildListItem(this.state.tree);
  }
  /**
   *  Given a list item in our tree, return the key path for it.
   **/
  getKeyPath (bulletListItem) {
    var keyPath = ['children'];
    var item = bulletListItem;
    var parent = bulletListItem.get('parent');
    while (parent) {
      keyPath = [parent.get('children').keyOf(item)] + keyPath;
      item = parent;
      parent = item.get('parent');
    }
    return keyPath;
  }

  /**
   *  Given a list item, add a child element
   **/
  createChildListItem (parent) {
    let newItem = createBulletListItem(parent.get('hierarchy') + 1, parent);
    let parentKeyPath = this.getKeyPath(parent);

    this.setState({
      tree: this.state.tree.updateIn(
        parentKeyPath,
        children => children.push(newItem)
      )
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List Outliner</h1>
        </header>

        <section className="listEditor">
          {this.state.tree.get('children').map((bulletListItem, i) => {
            return <BulletListItemEditor
              key={i}
              item={bulletListItem}
              createChildListItem={this.createChildListItem.bind(this)}
            />;
          })}
        </section>


      </div>
    );
  }
}

export default App;
