import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AddNewItem from './AddNewItem';

class CreateNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrderForm: false,
      newOrderID: '',
    }
    this.toggleOrderForm = this.toggleOrderForm.bind(this);
  }

  toggleOrderForm() {
    this.setState((prevState) => {
      return {
        showOrderForm: !prevState.showOrderForm
      }
    })
  }

  renderNewOrderForm() {
    return (
      <AddNewItem
        show={this.state.showOrderForm}
        orderid={null}
        total={0}
        items={null}
        toggleAvailableItems={this.toggleOrderForm} />
    )
  }

  render() {
    return (
      <div>
        <a onClick={this.toggleOrderForm} className="waves-effect waves-light btn-small">
          {this.state.showOrderForm ? "Cancel" : "Create New Order"}
        </a>
        {this.state.showOrderForm ? this.renderNewOrderForm() : null}
      </div>
    )
  }
}

export default CreateNewOrder;
