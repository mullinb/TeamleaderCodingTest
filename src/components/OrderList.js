import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import IndividualOrder from "./IndividualOrder";
import OrderDetail from "./OrderDetail";

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderDetail: ''
    }
    this.renderAllOrders = this.renderAllOrders.bind(this);
    this.showOrderDetail = this.showOrderDetail.bind(this);
    this.hideOrderDetail = this.hideOrderDetail.bind(this);
  }

  renderAllOrders() {
    if (!this.props.data.loading) {
      return this.props.data.orders.map(order => {
        return (
          <IndividualOrder
            key={order.id}
            order={order}
            showOrderDetail={this.showOrderDetail} />
        )
      })
    } else {
      return (<div>Orders loading...</div>)
    }
  }

  showOrderDetail(e) {
    this.setState({
      currentOrderDetail: e.target.getAttribute('name')
    })
  }

  renderOrderDetail() {
    return (
      <OrderDetail
        id={this.state.currentOrderDetail}
        dispatchOrder={this.dispatchOrder}
        hideOrderDetail={this.hideOrderDetail} />
    )
  }

  hideOrderDetail() {
    this.setState({
      currentOrderDetail: ''
    })
  }

  dispatchOrder(e) {

  }

  render() {
    if (this.state.currentOrderDetail) {
      return this.renderOrderDetail();
    }
    return (
      <ul className="collection with-header">
        <li className="collection-header"><h4>Orders</h4></li>
        {this.renderAllOrders()}
      </ul>
    );
  }
}

const query = gql`
  {
    orders {
      id,
      customerid,
      items {
        productid
        description
        quantity
        unitprice
      }
      total
    }
  }
`;

export default graphql(query)(OrderList);
