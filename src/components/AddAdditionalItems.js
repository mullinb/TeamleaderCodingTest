import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import ItemOrderForm from './ItemOrderForm';

import mutation from '../mutations/AddItem';
import { query, options } from '../queries/GetOrderDetail'


class AddAdditionalItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsToSubmit: []
    }
  }

  updateShoppingCart(nextShoppingCart) => {
    this.setState({
      itemsToSubmit: nextShoppingCart
    })
  }

  submitNewItems(e) {
    e.preventDefault();
    var itemsToSubmit = [];
    for (var p in this.state.shoppingCart) {
      if (this.state.shoppingCart[p].quantity > 0) {
        itemsToSubmit.push({
          id: p,
          quantity: this.state.shoppingCart[p].quantity
        })
      }
    }
    this.props.mutate({
      variables: {
        orderid: this.props.orderid,
        items: itemsToSubmit
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
      <div className="card blue-grey darken-1">
        <div className="card-content white-text">
          <span className="card-title">Add New Items</span>
            <ItemOrderForm items={this.props.items} updateShoppingCart={this.updateShoppingCart.bind(this)} />
        </div>
        <div className="card-action">
          <a onClick={this.props.toggleAvailableItems}>Cancel</a>
          <a onClick={this.submitNewItems.bind(this)}>Add</a>
        </div>
      </div>
    )
  }
  }

export default graphql(mutation)(AddAdditionalItems);
