/**
 *  @file       BulletListItemEditor.jsx
 *
 *
 *  @author     Colin Sullivan <colin [at] colin-sullivan.net>
 *
 *  @copyright  2018 Colin Sullivan
 *  @license    Licensed under the MIT license.
 **/

import React from 'react';

import { DRAG_STATES } from './constants';

class BulletListItemEditor extends React.Component {
  constructor (props) {
    super(props);

    // a reference to the DOM element used for displaying the list item
    // content.
    this.listContentElement = null;
  }
  handleKeyDown (e) {
    // handle return key differently
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.addSiblingListItem(this.props.item);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      this.props.handleTabPressed(this.props.item);
    }
  }
  handleMouseDown (e) {
    e.stopPropagation();
    this.props.handleItemMouseDown(this.props.item);
  }
  handleMouseMove (e) {
    this.props.handleItemMouseMove(e, this.props.item);
  }
  componentDidMount () {
    // could be considered a hack, since we are using contenteditable,
    // simply call focus on the list item DOM element when it is created
    // to put the cursor there
    this.listContentElement.focus();
  }
  render () {
    let containerStyle = {
      marginLeft: this.props.item.get('hierarchy') + 'em',
      paddingLeft: '3em',
      paddingRight: '3em'
    };
    let innerItemStyle = {
    };
    if (this.props.item.get('isSelected')) {
      innerItemStyle.backgroundColor = 'rgba(176, 196, 222, 0.5)';
    }
    let dropUnderIndicatorStyle = {
      height: '9px',
      backgroundColor: 'SteelBlue',
      opacity: '0.7',
      width: '100%',
      visibility: 'hidden',
      borderRadius: '9px'
    };
    if (
      this.props.dragState === DRAG_STATES.MOVE_SELECTION
      && this.props.dropTarget === true
    ) {
      dropUnderIndicatorStyle.visibility = 'visible';
    }
    return (
      <div
        style={containerStyle}
        onMouseDown={this.handleMouseDown.bind(this)}
        onMouseMove={this.handleMouseMove.bind(this)}
      >
        <div style={innerItemStyle}>
          <span>•</span>
          <span
            contentEditable="true"
            onKeyDown={this.handleKeyDown.bind(this)}
            ref={(el) => this.listContentElement = el }
          >
          </span>
        </div>
        <div style={dropUnderIndicatorStyle}></div>
      </div>
    );
  }
}

export default BulletListItemEditor;
