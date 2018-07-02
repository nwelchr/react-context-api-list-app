import React, { Component } from 'react';
import { Consumer } from '../context';

export default class ItemList extends Component {
  renderListItems(items, toggleItem) {
    if (items)
      return items.map((item, key) => {
        const expanded = item.expanded ? 'expanded' : '';
        let title = item.title;
        if (!expanded && item.title.length > 24) {
          title = item.title.substring(0, 24) + '...';
        }
        return (
          <li
            key={key}
            className={`list-item ${expanded}`}
            onClick={() => toggleItem(key)}>
            <h2 className="title">{title}</h2>
            <p>{item.body}</p>
          </li>
        );
      });
  }

  render() {
    return (
      <main className="item-list">
        <Consumer>
          {({ state: { items }, actions: { toggleItem } }) =>
            this.renderListItems(items, toggleItem)
          }
        </Consumer>
      </main>
    );
  }
}
