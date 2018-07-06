import React, { Component } from 'react';
import { Consumer } from '../Context';

export default class Search extends Component {
  render() {
    return (
      <Consumer>
        {({ state: { searchQuery }, actions: { handleChange } }) => (
          <input
            className="search"
            value={searchQuery}
            placeholder="Search"
            onChange={e => handleChange('searchQuery', e.target.value)}
          />
        )}
      </Consumer>
    );
  }
}
