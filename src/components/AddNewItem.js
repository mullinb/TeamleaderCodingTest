import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import allProductsQuery from '../queries/GetAllProducts';
import mutation from '../mutations/AddItem';
import { query, options } from '../queries/GetOrderDetail'


class AddNewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoppingCart: [{
      }],
      subtotal: 0,
      newTotal: 0
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data.loading) {
      var nextShoppingCart = {}
      nextProps.data.products.forEach((p) => {
        if (_.find(nextProps.items, { productid: p.id })) {
          return;
        }
        nextShoppingCart[p.id] = { id: p.id, quantity: 0 };
      })
      return {
        shoppingCart: nextShoppingCart,
        newTotal: nextProps.total
      }
    } else {
      return prevState;
    }
  }

  renderAllAvailableProducts() {
    if (this.props.data.loading) {
      return;
    }
    return this.props.data.products.map(({ id, description, category, price }) => {
      if (_.find(this.props.items, { productid: id })) {
        return;
      }
      return (
        <div key={id}>{id} {description} | Category: {category} | Price: ${price}
          <input name={id} type="number" min="0" value={this.state.shoppingCart[id].quantity} placeholder="Enter Quantity" onChange={this.updateQuantity.bind(this)} />
        </div>
      )
    })
  }

  updateQuantity(e) {
    let target = e.target;
    this.setState((prevState) => {
      var nextShoppingCart = prevState.shoppingCart;
      nextShoppingCart[target.name] = {
        id: target.name,
        quantity: target.value
      };
      return {
        shoppingCart: nextShoppingCart
      }
    })
    this.updateSubtotal();
  }

  updateSubtotal() {
    this.setState((prevState) => {
      var subtotal = 0;
      var quantities = prevState.shoppingCart;
      for (var p in quantities) {
        var product = _.find(this.props.data.products, { id: p })
        if (parseInt(quantities[p].quantity) > 0) {
          subtotal += parseInt(quantities[p].quantity) * product.price;
        }
      }
      return({
        subtotal: subtotal.toFixed(2),
        newTotal: (parseInt(prevState.newTotal) + subtotal).toFixed(2)
      })
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
    console.log("This console.log is immediately before the call to mutate");
    this.props.mutate({
      variables: {
        orderid: this.props.orderid,
        items: itemsToSubmit
      }
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
            {this.renderAllAvailableProducts()}
            <div> Subtotal: ${this.state.subtotal}  New Total: ${this.state.newTotal}</div>
        </div>
        <div className="card-action">
          <a onClick={this.close}>Cancel</a>
          <a onClick={this.submitNewItems.bind(this)}>Add</a>
        </div>
      </div>
    )
  }
  }

export default graphql(mutation, {

})(graphql(allProductsQuery)(AddNewItem));