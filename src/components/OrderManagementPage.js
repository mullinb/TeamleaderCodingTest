import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import OrderList from "./OrderList";
import OrderDetail from "./OrderDetail";
import CreateNewOrder from './CreateNewOrder';

import query from "../queries/GetAllOrders"

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

  render() {
    if (this.state.currentOrderDetail) {
      return (
        <OrderDetail
          id={this.state.currentOrderDetail}
          hideOrderDetail={this.hideOrderDetail.bind(this)} />
      )
    }
    if (this.props.data.loading) {
      return (<div>Orders loading...</div>)
    }
    return (
      <div>
        <OrderList orders={this.props.data.orders} showOrderDetail={this.showOrderDetail.bind(this)}/>
        <CreateNewOrder />
      </div>
    );
  }
}

export default graphql(query)(OrderManagementPage);
