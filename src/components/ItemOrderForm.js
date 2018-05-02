import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import AvailableItemsList from './AvailableItemsList'

import query from '../queries/GetAllProducts';


class ItemOrderForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shoppingCart: [{}],
      subtotal: '',
      newTotal: '',
      currentTotal: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
        subtotal: "0.00",
        newTotal: nextProps.total,
        currentTotal: nextProps.total
      }
  }

  renderTotalLine() {
    console.log(this.state);
    if (this.props.total !== "0.00") {
      return <div> Subtotal: ${this.state.subtotal}  New Total: ${this.state.newTotal}</div>
    } else return <div> Total: ${this.state.newTotal}</div>
  }

  updateQuantity(e) {
    let target = e.target;
    var nextShoppingCart;
    this.setState((prevState) => {
      nextShoppingCart = prevState.shoppingCart;
      nextShoppingCart[target.name] = {
        id: target.name,
        quantity: target.value
      };
      console.log(nextShoppingCart);
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
    if (this.props.data.loading) {
      return null;
    }
    return (
      <div>
        <AvailableItemsList updateQuantity={this.updateQuantity.bind(this)} shoppingCart={this.state.shoppingCart} products={this.props.data.products} items={this.props.items}/>
          {this.renderTotalLine()}
      </div>
    )
  }
}

export default graphql(query)(ItemOrderForm);
