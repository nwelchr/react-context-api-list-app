import React, { Component, createRef } from 'react';
import { Consumer } from '../context';
import CloseButton from '../images/close.png';

export default class AddItemModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Consumer>
        {({
          state: { addItemTitle, addItemDescription },
          actions: { toggleModal, handleChange, addItem }
        }) => (
          <div
            className={`modal-background`}
            ref={modal => (this.modal = modal)}>
            <main className="add-item-modal">
              <div onClick={toggleModal} class="close-modal-button">
                <img src={CloseButton} />
              </div>
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
                onChange={e =>
                  handleChange('addItemDescription', e.target.value)
                }
                value={addItemDescription}
                placeholder="Enter your description here"
                className="add-item-description"
              />
              <button onClick={addItem}>+</button>
            </main>
          </div>
        )}
      </Consumer>
    );
  }
}
