/**
 *  @file       NewSelectionBox.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import React from 'react';
import { DRAG_STATES } from './constants'

class NewSelectionBox extends React.Component {
  render () {
    let top = Math.min(
      this.props.mousePosition.y,
      this.props.dragStart.y
    ), left = Math.min(
      this.props.mousePosition.x,
      this.props.dragStart.x
    ), height = Math.abs(
      this.props.mousePosition.y - this.props.dragStart.y
    ), width = Math.abs(
      this.props.mousePosition.x - this.props.dragStart.x
    );
    let containerStyle = {
      border: '1px solid SteelBlue',
      backgroundColor: 'SteelBlue',
      position: 'absolute',
      top: top,
      left: left,
      height: `${height}px`,
      width: `${width}px`,
      opacity: '0.2'
    };
    if (this.props.dragState !== DRAG_STATES.NEW_SELECTION_BOX) {
      containerStyle.display = 'none';
    }
    return (
      <div style={containerStyle}></div>
    );
  }
}

export default NewSelectionBox;
