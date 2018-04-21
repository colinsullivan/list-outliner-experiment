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
      this.props.createChildListItem(this.props.item.get('parent'));
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
        <div>
          {this.props.item.get('children').map((bulletListItem, i) => {
            return <BulletListItemEditor
              key={i}
              item={bulletListItem}
              createChildListItem={this.props.createChildListItem}
            />;
          })}
        </div>
      </div>
    );
  }
}

export default BulletListItemEditor;
