import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';

import query from '../queries/GetAllProducts'

class AddNewItem extends Component {
  constructor(props) {
    super(props);
  }
  renderAllAvailableProducts() {
    if (this.props.data.loading) {
      return;
    }
    console.log(this.props.data.products);
    return this.props.data.products.map(({ id, description, category, price }) => {
      console.log(this.props.items, id);
      if (_.find(this.props.items, { productid: id })) {
        return;
      } else {
        return (
          <div key={id}>{id} {description} | Category: {category} | Price: ${price}
            <input id={id} type="number" placeholder="Enter Quantity" />
          </div>
        )
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
