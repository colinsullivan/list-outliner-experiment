import React, { Component } from 'react';
import './App.css';

import { createBulletListItem } from './model';
import BulletListItemEditor from './BulletListItemEditor.jsx';

const DRAG_STATES = {
  "NONE": "NONE"
};

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      children: [createBulletListItem(0)],
      dragState: DRAG_STATES.NONE,
      dragStart: {x: 0, y: 0},
      mousePosition: {x: 0, y: 0}
    };

    this.state.children[0].children.push(createBulletListItem(1));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">List Outliner</h1>
        </header>

        <section className="listEditor">
          {this.state.children.map((bulletListItem, i) => {
            return <BulletListItemEditor key={i} item={bulletListItem} />;
          })}
        </section>


      </div>
    );
  }
}

export default App;
