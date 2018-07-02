import React, { Component } from 'react';
import { Consumer } from '../context';

export default class ItemList extends Component {
  renderListItems(items, searchQuery, toggleItem) {
    if (items)
      return items.map((item, key) => {
        // filters items by search query
        if (
          !(
            item.title.toLowerCase().includes(searchQuery) ||
            item.body.toLowerCase().includes(searchQuery)
          )
        )
          return;

        // CSS class variable that controls whether item is expanded
        const expanded = item.expanded ? 'expanded' : '';

        // truncates items if needed
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
          {({ state: { items, searchQuery }, actions: { toggleItem } }) =>
            this.renderListItems(items, searchQuery, toggleItem)
          }
        </Consumer>
      </main>
    );
  }
}
