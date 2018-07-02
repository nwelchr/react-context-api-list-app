import React, { Component } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import ItemList from './components/ItemList';
import Buttons from './components/Buttons';
import AddItemModal from './components/AddItemModal';
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
          {({ state: { isModalOpen } }) =>
            isModalOpen ? <AddItemModal /> : null
          }
        </Consumer>
      </Provider>
    );
  }
}
