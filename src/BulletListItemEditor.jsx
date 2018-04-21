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
  render () {
    return (
      <div>
        <div>
          <span>•</span><span>{this.props.item.content}</span>
        </div>
        <div>
          {this.props.item.children.map((bulletListItem) => {
            return <BulletListItemEditor item={bulletListItem} />;
          })}
        </div>
      </div>
    );
  }
}

export default BulletListItemEditor;
