import React, { Component } from 'react';
import { getStore, setStore } from './utils';

const AppContext = React.createContext();
export const Consumer = AppContext.Consumer;

export class Provider extends Component {
  constructor(props) {
    super(props);

    // bind functions to class to allow this.setState
    this.addItem = this.addItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.changeAll = this.changeAll.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      items: [],
      isModalOpen: false,
      searchQuery: '',
      addItemTitle: '',
      addItemBody: ''
    };

    this.actions = {
      addItem: this.addItem,
      toggleItem: this.toggleItem,
      changeAll: this.changeAll,
      toggleModal: this.toggleModal,
      handleChange: this.handleChange
    };

    // define namespace for setting values in localStorage
    this.namespace = 'verbling-items';
  }

  componentDidMount() {
    // fetch items from localStorage
    const items = getStore(this.namespace);
    this.setState({ items });
  }

  inform(items) {
    setStore(this.namespace, items);
    this.setState({ items });
  }

  addItem() {
    const { addItemTitle: title, addItemBody: body } = this.state;
    if (!(title && body)) return;
    const item = {
      title: this.state.addItemTitle,
      body: this.state.addItemBody,
      expanded: false
    };
    const items = this.state.items;
    const newItems = [...items, item];
    this.inform(newItems);
    this.setState({ addItemTitle: '', addItemBody: '' });
    this.toggleModal();
  }

  toggleItem(key) {
    const newItems = this.state.items.slice(0);
    newItems[key].expanded = !newItems[key].expanded;
    this.inform(newItems);
  }

  changeAll(type) {
    const items = this.state.items;
    const newItems = items.map(item => {
      switch (type) {
        case 'expand':
          return { ...item, expanded: true };
        case 'collapse':
          return { ...item, expanded: false };
        case 'toggle':
          return { ...item, expanded: !item.expanded };
      }
    });
    this.inform(newItems);
  }

  toggleModal() {
    this.setState({ isModalOpen: !this.state.isModalOpen });
  }

  handleChange(type, value) {
    this.setState({ [type]: value });
  }

  render() {
    return (
      <AppContext.Provider value={{ state: this.state, actions: this.actions }}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
