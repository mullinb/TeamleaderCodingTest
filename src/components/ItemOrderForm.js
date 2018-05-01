import React, { Component } from 'react';
import graphql from 'graphql';

import AvailableItemsList from './AvailableItemsList';

class ItemOrderSheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingCart: [{}],
      subtotal: 0,
      newTotal: 0,
      currentTotal: 0
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data.loading) {
      var nextShoppingCart = {};
      nextProps.data.products.forEach((p) => {
        if (_.find(nextProps.items, { productid: p.id })) {
          return;
        }
        nextShoppingCart[p.id] = { id: p.id, quantity: 0 };
      })
      return {
        subtotal: 0,
        newTotal: nextProps.total,
        currentTotal: nextProps.total
      }
    } else {
      return prevState;
    }
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
    this.props.updateShoppingCart(nextShoppingCart)
    this.updateSubtotal();
  }

  updateSubtotal() {
    this.setState((prevState) => {
      var subtotal = 0;
      var quantities = prevState.shoppingCart;
      for (var p in quantities) {
        var product = _.find(this.props.data.products, { id: p })
        if (parseInt(quantities[p].quantity) > 0) {
          subtotal += parseFloat((quantities[p].quantity * product.price).toFixed(2));
        }
      }
      return({
        subtotal: subtotal.toFixed(2),
        newTotal: (parseFloat(prevState.currentTotal) + subtotal).toFixed(2)
      })
    })
  }

  render() {
    return (
      <AvailableItemsList updateQuantity={this.updateQuantity.bind(this)} items={this.props.items}/>
      <div> Subtotal: ${this.state.subtotal}  New Total: ${this.state.newTotal}</div>
    )

  }
}

export default ItemOrderSheet;
