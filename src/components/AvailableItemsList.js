import React, { Component } from 'react';
import graphql from 'graphql';

import query from '../queries/GetAllProducts';

class AvailableItemsList extends Component {
  constructor(props) {
    super(props);
  }

  updateQuantity(e) {
    this.props.updateQuantity(e);
  }

  render() {
    return (
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
    )
  }
}

export default graphql(query)(AvailableItemsList);
