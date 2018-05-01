import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import IndividualOrderListing from "./IndividualOrderListing";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.renderAllOrders = this.renderAllOrders.bind(this);
  }

  showOrderDetail(e) {
    this.props.showOrderDetail(e)
  }

  renderAllOrders() {
    return this.props.orders.map(order => {
      return (
        <IndividualOrderListing
          key={order.id}
          order={order}
          showOrderDetail={this.showOrderDetail.bind(this)} />
      )
    })
  }

  render() {
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h4>Orders</h4></li>
        {this.renderAllOrders()}
      </ul>
    )
  }
}


export default OrderList;
