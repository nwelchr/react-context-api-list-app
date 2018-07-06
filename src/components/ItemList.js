import React, { Component } from 'react';
import { Consumer } from '../Context';

export default class ItemList extends Component {
  renderListItems(items, searchQuery, toggleItem, removeItem) {
    if (items)
      return items.map((item, key) => {
        // filters items by search query
        if (
          !(
            item.title.toLowerCase().includes(searchQuery) ||
            item.description.toLowerCase().includes(searchQuery)
          )
        )
          return;

        // CSS class variable that controls whether item is expanded
        const expanded = item.expanded ? 'expanded' : '';

        // truncates items if needed
        let title = item.title;
        if (!expanded && item.title.length > 33) {
          title = item.title.substring(0, 33) + '...';
        }
        return (
          <li
            key={key}
            className={`list-item ${expanded}`}
            onClick={() => toggleItem(key)}
            onContextMenu={e => {
              e.preventDefault();
              removeItem(key);
            }}>
            <h2 className="title">{title}</h2>
            <p>{item.description}</p>
          </li>
        );
      });
  }

  render() {
    return (
      <main className="item-list">
        <Consumer>
          {({
            state: { items, searchQuery },
            actions: { toggleItem, removeItem }
          }) =>
            this.renderListItems(items, searchQuery, toggleItem, removeItem)
          }
        </Consumer>
      </main>
    );
  }
}
