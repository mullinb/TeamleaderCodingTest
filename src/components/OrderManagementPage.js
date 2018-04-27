import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";

class OrderManagementPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOrderDetail: ''
    }
  }

  showOrderDetail(e) {
    this.setState({
      currentOrderDetail: e.target.getAttribute('id')
    })
  }

  hideOrderDetail() {
    this.setState({
      currentOrderDetail: ''
    })
  }

  placeOrder(e) {
    this.props.mutate({
      id: e.target.getAttribute('id')
    })
    console.log("You placed the order with id ", e.target.getAttribute('id'));
  }

  render() {
    if (this.state.currentOrderDetail) {
      return (
        <OrderDetail
          id={this.state.currentOrderDetail}
          placeOrder={this.placeOrder.bind(this)}
          hideOrderDetail={this.hideOrderDetail.bind(this)} />
      )
    }
    if (this.props.data.loading) {
      return (<div>Orders loading...</div>)
    }
    return (
      <OrderList orders={this.props.data.orders} showOrderDetail={this.showOrderDetail.bind(this)}/>
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

export default graphql(query)(OrderManagementPage);
