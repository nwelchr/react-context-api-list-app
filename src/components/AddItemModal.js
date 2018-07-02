import React, { Component, createRef } from 'react';
import { Consumer } from '../context';

export default class AddItemModal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('hi');
    // window.addEventListener('click', e => {
    //   if (!this.modal.contains(e.target)) {
    //     this.props.toggleModal();
    //   }
    // });
  }

  render() {
    return (
      <Consumer>
        {({
          state: { addItemTitle, addItemBody },
          actions: { handleChange, addItem }
        }) => (
          <div
            className={`modal-background`}
            ref={modal => (this.modal = modal)}>
            <main className="add-item-modal">
              <h1>Add Item</h1>
              <input
                onChange={e => handleChange('addItemTitle', e.target.value)}
                value={addItemTitle}
                placeholder="Title"
                className="add-item-title"
              />
              <textarea
                width={100}
                height={100}
                onChange={e => handleChange('addItemBody', e.target.value)}
                value={addItemBody}
                placeholder="Enter your description here"
                className="add-item-body"
              />
              <button onClick={addItem}>+</button>
            </main>
          </div>
        )}
      </Consumer>
    );
  }
}
