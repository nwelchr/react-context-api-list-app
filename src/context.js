import React, { Component } from 'react';
import { getStore, setStore } from './utils';
import defaultData from './defaultData.json';

// create context, which has a Provider and Consumer
const AppContext = React.createContext();
export const Consumer = AppContext.Consumer;

export class Provider extends Component {
  constructor(props) {
    super(props);

    // bind functions to class to allow this.setState
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.toggleItem = this.toggleItem.bind(this);
    this.changeAll = this.changeAll.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // declare shape of application-level state
    this.state = {
      items: [],
      isModalOpen: false,
      searchQuery: '',
      addItemTitle: '',
      addItemDescription: ''
    };

    // declare actions (similar to Redux)
    this.actions = {
      addItem: this.addItem,
      removeItem: this.removeItem,
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
    let items = getStore(this.namespace);
    if (!items.length) {
      items = defaultData;
    }
    this.setState({ items });
  }

  inform(items) {
    // update store and application-level state
    setStore(this.namespace, items);
    this.setState({ items });
  }

  addItem() {
    const { addItemTitle: title, addItemDescription: description } = this.state;
    // if either title or description is empty, return
    if (!(title && description)) return;
    const item = {
      title: this.state.addItemTitle,
      description: this.state.addItemDescription,
      expanded: false
    };
    const items = this.state.items;
    const newItems = [item, ...items];
    this.inform(newItems);
    this.setState({ addItemTitle: '', addItemDescription: '' });
    this.toggleModal();
  }

  removeItem(key) {
    const newItems = this.state.items.filter((item, idx) => idx !== key);
    this.inform(newItems);
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

  // used for all inputs and textareas in app
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
