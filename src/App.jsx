import React, { Component } from 'react';
import './App.css';

import {
  createBulletList,
  addSibling,
  increaseHierarchy,
  decreaseHierarchy
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
      mousePosition: {x: 0, y: 0},
      shiftIsDown: false
    };

  }

  componentDidMount () {
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Shift') {
        this.setState({
          shiftIsDown: true
        });
      }
    });
    document.body.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        this.setState({
          shiftIsDown: false
        });
      }
    })
  }
  /**
   *  Given a list item, add a child element
   **/
  addSiblingListItem (sibling) {
    this.setState({
      tree: addSibling(this.state.tree, sibling)
    });
  }

  handleTabPressed (item) {
    if (this.state.shiftIsDown) {
      this.setState({
        tree: decreaseHierarchy(this.state.tree, item)
      });
    } else {
      this.setState({
        tree: increaseHierarchy(this.state.tree, item)
      });
    }
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
              handleTabPressed={this.handleTabPressed.bind(this)}
            />;
          })}
        </section>


      </div>
    );
  }
}

export default App;
