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

class BulletListItemEditor extends React.Component {
  handleKeyDown (e) {
    // handle return key differently
    if (e.key === 'Enter') {
      e.preventDefault();
      this.props.addSiblingListItem(this.props.item);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      console.log("this.props.item");
      console.log(this.props.item.toJSON());
      this.props.increaseHierarchy(this.props.item);
    }
  }
  render () {
    let containerStyle = {
      marginLeft: this.props.item.get('hierarchy') + 'em'
    };
    return (
      <div style={containerStyle}>
        <div>
          <span>•</span>
          <span
            contentEditable="true"
            onKeyDown={this.handleKeyDown.bind(this)}
          >
          </span>
        </div>
      </div>
    );
  }
}

export default BulletListItemEditor;
