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
        shoppingCart: nextShoppingCart,
        subtotal: 0,
        newTotal: nextProps.total,
        currentTotal: nextProps.total
      }
    } else {
      return prevState;
    }
  }

  renderAllAvailableProducts() {
    if (this.props.data.loading) {
      return null;
    }
    return this.props.data.products.map(({ id, description, category, price }) => {
      if (_.find(this.props.items, { productid: id })) {
        return null;
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
          subtotal += parseFloat((quantities[p].quantity * product.price).toFixed(2));
        }
      }
      return({
        subtotal: subtotal.toFixed(2),
        newTotal: (parseFloat(prevState.currentTotal) + subtotal).toFixed(2)
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
            {this.renderAllAvailableProducts()}
            <div> Subtotal: ${this.state.subtotal}  New Total: ${this.state.newTotal}</div>
        </div>
        <div className="card-action">
          <a onClick={this.props.toggleAvailableItems}>Cancel</a>
          <a onClick={this.submitNewItems.bind(this)}>Add</a>
        </div>
      </div>
    )
  }
  }

export default graphql(mutation)(graphql(allProductsQuery)(AddNewItem));
