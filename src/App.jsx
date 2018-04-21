import React, { Component } from 'react';
import './App.css';

import {
  createBulletList,
  addSibling,
  increaseHierarchy
} from './model';
import BulletListItemEditor from './BulletListItemEditor.jsx';


const DRAG_STATES = {
  "NONE": "NONE"
};

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      tree: createBulletList(),
      dragState: DRAG_STATES.NONE,
      dragStart: {x: 0, y: 0},
      mousePosition: {x: 0, y: 0}
    };

  }
  /**
   *  Given a list item, add a child element
   **/
  addSiblingListItem (sibling) {
    this.setState({
      tree: addSibling(this.state.tree, sibling)
    });
  }

  increaseHierarchy (item) {
    this.setState({
      tree: increaseHierarchy(this.state.tree, item)
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List Outliner</h1>
        </header>

        <section className="listEditor">
          {this.state.tree.map((bulletListItem, i) => {
            return <BulletListItemEditor
              key={i}
              item={bulletListItem}
              addSiblingListItem={this.addSiblingListItem.bind(this)}
              increaseHierarchy={this.increaseHierarchy.bind(this)}
            />;
          })}
        </section>


      </div>
    );
  }
}

export default App;
