import React, { Component } from 'react';

export default class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  handleChange = (e, type) => {
    this.setState({ [type]: e.target.value });
  };

  handleSubmit = () => {
    const { title, body } = this.state;

    // ensure that title and body are both filled out
    if (title && body) {
      const item = {
        title,
        body,
        expanded: false
      };
      this.props.addItem(item);
      this.setState({ title: '', body: '' });
    }
  };

  render() {
    if (!this.props.isOpen) {
      return null;
    }
    return (
      <div className="modal-background">
        <main className="add-item-modal">
          <h1>Add Item</h1>
          <input
            onChange={e => this.handleChange(e, 'title')}
            value={this.state.title}
            placeholder="Title"
            className="add-item-title"
          />
          <textarea
            width={100}
            height={100}
            onChange={e => this.handleChange(e, 'body')}
            value={this.state.body}
            placeholder="Enter your description here"
            className="add-item-body"
          />
          <button onClick={this.handleSubmit}>
            <p>+</p>
          </button>
        </main>
      </div>
    );
  }
}
