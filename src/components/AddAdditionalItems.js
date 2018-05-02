import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import ItemOrderForm from './ItemOrderForm';

import mutation from '../mutations/AddItem';
import { query, options } from '../queries/GetOrderDetail';
import convertCartObjectToArray from '../helpers/shoppingCartHelper';


class AddAdditionalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: [{}]
    }
  }

  updateShoppingCart(nextShoppingCart) {
    this.setState({
      shoppingCart: nextShoppingCart
    })
  }

  submitNewItems(e) {
    e.preventDefault();
    var items = convertCartObjectToArray(this.state.shoppingCart);
    this.props.mutate({
      variables: {
        orderid: this.props.orderid,
        items: items
      },
      refetchQueries: [{
        query,
        variables: {
          id: this.props.orderid
        }
      }]
    })
    .then(() => {
      this.props.toggleAvailableItems();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    if(!this.props.show) {
      return null;
    }
    return(
      <div className="card blue-grey">
        <div className="card-content white-text">
          <span className="card-title">Add New Items</span>
            <ItemOrderForm items={this.props.items} total={this.props.total} shoppingCart={this.state.shoppingCart} updateShoppingCart={this.updateShoppingCart.bind(this)} />
        </div>
        <div className="card-action">
          <a className="btn-small " onClick={this.props.toggleAvailableItems}>Cancel</a>
          <a className="btn blue-grey darken-2" onClick={this.submitNewItems.bind(this)}>Add</a>
        </div>
      </div>
    )
  }
  }

export default graphql(mutation)(AddAdditionalItems);
