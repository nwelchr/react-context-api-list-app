import React, { Component } from 'react';
import { Consumer } from '../context';

export default class Button extends Component {
  render() {
    return (
      <Consumer>
        {({ actions: { changeAll, toggleModal } }) => (
          <footer className="buttons">
            <nav className="toggle-buttons">
              <button onClick={() => changeAll('expand')}>Open All</button>
              <button onClick={() => changeAll('collapse')}>Close All</button>
              <button onClick={() => changeAll('toggle')}>Toggle All</button>
            </nav>
            <nav className="add-button">
              <button onClick={toggleModal}>+</button>
            </nav>
          </footer>
        )}
      </Consumer>
    );
  }
}
