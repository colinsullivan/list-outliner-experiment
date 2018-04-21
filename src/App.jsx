import React, { Component } from 'react';
import './App.css';

import {
  createBulletList,
  addSibling,
  increaseHierarchy,
  decreaseHierarchy,
  selectItem,
  deselectItem
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
      shiftIsDown: false,
      selectionBox: {
        top: 0,
        left: 0,
        height: 0,
        width: 0
      }
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
    let newState = {
      mousePosition: {
        x: e.pageX,
        y: e.pageY
      },
      dragState: this.state.dragState
    };

    switch (this.state.dragState) {
      case DRAG_STATES.STARTING_NEW_SELECTION_BOX:
        // if we just started a selection, now we will continue it
        newState.dragState = DRAG_STATES.NEW_SELECTION_BOX;
        break;

      case DRAG_STATES.STARTING_MOVE_SELECTION:
        newState.dragState = DRAG_STATES.MOVE_SELECTION;
        break;

      case DRAG_STATES.NEW_SELECTION_BOX:
        newState.selectionBox = {
          top: Math.min(
            this.state.mousePosition.y,
            this.state.dragStart.y
          ),
          left: Math.min(
            this.state.mousePosition.x,
            this.state.dragStart.x
          ),
          height: Math.abs(
            this.state.mousePosition.y - this.state.dragStart.y
          ),
          width: Math.abs(
            this.state.mousePosition.x - this.state.dragStart.x
          )
        };
        break;
      
      default:
        break;
    }
    this.setState(newState);
  }

  // if this mousedown handler was called, it means the mouse
  // event didn't come from one of our list items and thus
  // we can assume it started on the outer canvas and the
  // user intent is to drag a selection box
  handleAppMouseDown (e) {
    this.setState({
      dragState: DRAG_STATES.STARTING_NEW_SELECTION_BOX,
      dragStart: {
        x: e.pageX,
        y: e.pageY
      }
    });
  }

  handleItemMouseMove (e, item) {
    if (this.state.dragState === DRAG_STATES.NEW_SELECTION_BOX) {
      // if we are dragging a selection box and passed over an item
      let bounds = e.currentTarget.getBoundingClientRect();

      console.log("bounds");
      console.log(bounds);
      console.log("this.state.selectionBox");
      console.log(this.state.selectionBox);

      // is list item inside selection box
      if (
        (bounds.top > this.state.selectionBox.top
          && bounds.top < (
            this.state.selectionBox.top
            + this.state.selectionBox.height
          ))
        || (
          bounds.bottom > this.state.selectionBox.top
          && bounds.bottom < (
            this.state.selectionBox.top
            + this.state.selectionBox.height
          )
        )
      ) {
        // mark item as selected
        this.setState({
          tree: selectItem(this.state.tree, item)
        });
      } else {
        // mark item as deselected
        this.setState({
          tree: deselectItem(this.state.tree, item)
        });
      }
    }
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
          top={this.state.selectionBox.top}
          left={this.state.selectionBox.left}
          height={this.state.selectionBox.height}
          width={this.state.selectionBox.width}
        />
        <section className="listEditor">
          {this.state.tree.map((bulletListItem, i) => {
            return <BulletListItemEditor
              key={i}
              item={bulletListItem}
              addSiblingListItem={this.addSiblingListItem.bind(this)}
              handleTabPressed={this.handleTabPressed.bind(this)}
              handleItemMouseDown={this.handleItemMouseDown.bind(this)}
              handleItemMouseMove={this.handleItemMouseMove.bind(this)}
            />;
          })}
        </section>


      </div>
    );
  }
}

export default App;
