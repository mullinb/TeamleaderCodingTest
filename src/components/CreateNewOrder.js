import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

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
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="card teal darken-2">
        <div className="card-content white-text">
          <span className="card-title">Create New Order</span>
          <div className="input-field">
                  <p>Customer ID</p>
                 <input id="customer_id" style={{"width": "200px"}} type="text" value={this.state.customerid} placeholder="Enter Customer ID" onChange={this.handleChangeOnCustomerID.bind(this)} />
          </div>
            <ItemOrderForm items={null} total={"0.00"} shoppingCart={this.state.shoppingCart} updateShoppingCart={this.updateShoppingCart.bind(this)} />
        </div>
        <div className="card-action">
          <Link to="/">Cancel</Link>
          <a className="btn teal darken-4" onClick={this.submitNewOrder.bind(this)}>Create</a>
        </div>
      </div>
    )
  }
}


export default graphql(mutation)(CreateNewOrder);
