import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import ItemOrderForm from './ItemOrderForm';

import query from '../queries/GetAllOrders'
import mutation from '../mutations/CreateOrder';
import convertCartObjectToArray from '../helpers/shoppingCartHelper';

class CreateNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerid: '',
      shoppingCart: []
    }
    this.toggleOrderForm = this.toggleOrderForm.bind(this);
  }

  toggleOrderForm() {
    this.props.toggleOrderForm();
  }

  updateShoppingCart(nextShoppingCart) {
    this.setState({
      shoppingCart: nextShoppingCart
    })
  }

  handleChangeOnCustomerID(e) {
    let target = e.target;
    this.setState({
      customerid: target.value
    })
  }

  submitNewOrder() {
    var items = convertCartObjectToArray(this.state.shoppingCart);
    this.props.mutate({
      variables: {
        customerid: this.state.customerid,
        items: items
      },
      refetchQueries: [{
        query
      }]
    })
    .then((res) => {
      this.toggleOrderForm();
      this.setState({
        customerid: '',
        shoppingCart: []
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }

  renderNewOrderForm() {
    return (
      <div className="card green darken-3">
        <div className="card-content white-text">
          <span className="card-title">Create New Order</span>
          <div className="input-field">
                 <input id="customer_id" type="text" value={this.state.customerid} placeholder="Enter Customer ID" onChange={this.handleChangeOnCustomerID.bind(this)} />
          </div>
            <ItemOrderForm items={null} total={"0.00"} shoppingCart={this.state.shoppingCart} updateShoppingCart={this.updateShoppingCart.bind(this)} />
        </div>
        <div className="card-action">
          <a onClick={this.toggleOrderForm}>Cancel</a>
          <a onClick={this.submitNewOrder.bind(this)}>Create</a>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div>
        {this.props.show ? this.renderNewOrderForm() : null}
      </div>
    )
  }
}


export default graphql(mutation)(CreateNewOrder);
