import React, { Component } from 'react';
import { Consumer } from '../Context';

export default class Button extends Component {
  render() {
    return (
      <Consumer>
        {({ state: { isModalOpen }, actions: { changeAll, toggleModal } }) => (
          <footer className="buttons">
            <nav className="toggle-buttons">
              <button onClick={() => changeAll('expand')}>Open All</button>
              <button onClick={() => changeAll('collapse')}>Close All</button>
              <button onClick={() => changeAll('toggle')}>Toggle All</button>
            </nav>
            <nav className="add-button">
              {/* only opens modal if not already open */}
              <button onClick={() => !isModalOpen && toggleModal()}>+</button>
            </nav>
          </footer>
        )}
      </Consumer>
    );
  }
}
