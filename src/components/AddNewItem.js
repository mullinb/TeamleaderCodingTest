import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import query from '../queries/GetAllProducts'

class AddNewItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuantity: {
      },
      subtotal: 0
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (!nextProps.data.loading) {
      var nextCurrentQuantity = {}
      nextProps.data.products.forEach((p) => {
        if (_.find(nextProps.items, { productid: p.id })) {
          return;
        }
        nextCurrentQuantity[p.id] = { id: p.id, quantity: 0 };
      })
      return {
        currentQuantity: nextCurrentQuantity
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
          <input name={id} type="number" min="0" value={this.state.currentQuantity[id].quantity} placeholder="Enter Quantity" onChange={this.updateQuantity.bind(this)} />
        </div>
      )
    })
  }

  updateQuantity(e) {
    let target = e.target;
    this.setState((prevState) => {
      var nextCurrentQuantity = prevState.currentQuantity;
      nextCurrentQuantity[target.name] = {
        id: target.name,
        quantity: target.value
      };
      return {
        currentQuantity: nextCurrentQuantity
      }
    })
    console.log("HERE IS STATE BEFORE CALL,", this.state);
    this.updateSubtotal();
  }

  updateSubtotal() {
    this.setState((prevState) => {
      var subtotal = 0;
      var quantities = prevState.currentQuantity;
      for (var p in quantities) {
        var product = _.find(this.props.data.products, { id: p })
        console.log(quantities[p], product.price);
        if (parseInt(quantities[p].quantity) > 0) {
          subtotal += parseInt(quantities[p].quantity) * product.price;
        }
      }
      return({
        subtotal: subtotal.toFixed(2)
      })
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
            <div> Subtotal: ${this.state.subtotal}</div>
        </div>
        <div className="card-action">
          <a onClick={this.close}>Cancel</a>
          <a href="#">Add</a>
        </div>
      </div>
    )
  }
  }

export default graphql(query)(AddNewItem);
