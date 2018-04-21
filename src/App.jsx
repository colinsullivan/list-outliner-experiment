import React, { Component } from 'react';
import './App.css';

import {
  createBulletList,
  addSibling,
  increaseHierarchy,
  decreaseHierarchy
} from './model';
import { DRAG_STATES } from './constants'
import BulletListItemEditor from './BulletListItemEditor.jsx';
import NewSelectionBox from './NewSelectionBox.jsx';



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
    // track if shift is down or up globally
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Shift') {
        this.setState({
          shiftIsDown: true
        });
      }
    });
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Shift') {
        this.setState({
          shiftIsDown: false
        });
      }
    });

    // track mouseup and mousemove globally
    document.addEventListener('mouseup', (e) => {
      this.handleMouseUp();
    });
    document.addEventListener('mousemove', (e) => {
      if (this.state.dragState !== DRAG_STATES.NONE) {
        this.handleDrag(e);
      }
    });
  }
  /**
   *  Given a list item, add a child element
   **/
  addSiblingListItem (sibling) {
    this.setState({
      tree: addSibling(this.state.tree, sibling)
    });
  }

  /**
   *  When tab is pressed from an item
   **/
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

  /**
   *  When mouse is pressed down on an item
   **/
  handleItemMouseDown (item) {
    console.log("handleItemMouseDown");
  }

  /**
   *  When mouse is let go
   **/
  handleMouseUp () {
    console.log("handleMouseUp");
    this.setState({
      dragState: DRAG_STATES.NONE
    });
  }

  /**
   *  When mouse is moved while dragging
   **/
  handleDrag (e) {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY
      }
    });
  }

  // if this mousedown handler was called, it means the mouse
  // event didn't come from one of our list items and thus
  // we can assume it started on the outer canvas and the
  // user intent is to drag a selection box
  handleAppMouseDown (e) {
    console.log("app mousedown");
    this.setState({
      dragState: DRAG_STATES.NEW_SELECTION_BOX,
      dragStart: {
        x: e.pageX,
        y: e.pageY
      }
    });
  }

  render() {
    // TODO: probably shouldn't do so many binds
    return (
      <div
        className="App"
        onMouseDown={this.handleAppMouseDown.bind(this)}
      >
        <header className="App-header">
          <h1 className="App-title">List Outliner</h1>
        </header>
        <NewSelectionBox
          dragState={this.state.dragState}
          dragStart={this.state.dragStart}
          mousePosition={this.state.mousePosition}
        />
        <section className="listEditor">
          {this.state.tree.map((bulletListItem, i) => {
            return <BulletListItemEditor
              key={i}
              item={bulletListItem}
              addSiblingListItem={this.addSiblingListItem.bind(this)}
              handleTabPressed={this.handleTabPressed.bind(this)}
              handleItemMouseDown={this.handleItemMouseDown.bind(this)}
            />;
          })}
        </section>


      </div>
    );
  }
}

export default App;
