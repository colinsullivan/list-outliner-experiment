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
    let containerStyle = {
      border: '1px solid SteelBlue',
      backgroundColor: 'SteelBlue',
      position: 'absolute',
      top: this.props.top,
      left: this.props.left,
      height: this.props.height,
      width: this.props.width,
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
