import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import ItemList from './components/ItemList';
import Buttons from './components/Buttons';
import Modal from './components/Modal';
import { Provider, Consumer } from './context';

export default class App extends Component {
  render() {
    return (
      <Provider>
        <div className="app">
          <Header />
          <Search />
          <ItemList />
          <Buttons />
        </div>
        <Consumer>
          {({ state: { isModalOpen }, actions: { addItem } }) => (
            <Modal isOpen={isModalOpen} addItem={addItem} />
          )}
        </Consumer>
      </Provider>
    );
  }
}
