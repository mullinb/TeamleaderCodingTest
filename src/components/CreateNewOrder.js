import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AddAdditionalItems from './AddAdditionalItems';

import mutation from '../mutations/CreateOrder';

class CreateNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOrderForm: false,
      customerid: '',
      shoppingCart: [{}]
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

  updateShoppingCart(nextShoppingCart) => {
    this.setState({
      shoppingCart: nextShoppingCart
    })
  }

  handleChangeOnCustomerID(e) {
    let target = e.target;
    this.setState({
      customerid: target.value;
    })
  }

  submitNewOrder() {
    this.props.mutate({
      variables: {
        items:this.state.shoppingCart
      }
    })
  }

  renderNewOrderForm() {
    return (
      <div className="card green darken-3">
        <div className="card-content white-text">
          <span className="card-title">Create New Order</span>
            <label>Customer ID
              <input type="text" value={this.state.customerid} onChange={this.handleChangeOnCustomerID.bind(this)} />
            </label>
            <ItemOrderForm items={null} updateShoppingCart={this.updateShoppingCart.bind(this)} />
        </div>
        <div className="card-action">
          <a onClick={this.props.toggleOrderForm}>Cancel</a>
          <a onClick={this.submitNewOrder.bind(this)}>Create</a>
        </div>
      </div>
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

export default graphql(mutation)(CreateNewOrder);
