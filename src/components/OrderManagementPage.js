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
      currentOrderDetail: '',
      newOrderForm: false
    }
    this.toggleOrderForm = this.toggleOrderForm.bind(this);
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

  toggleOrderForm() {
    this.setState((prevState) => {
      return { newOrderForm: !prevState.newOrderForm }
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
        <a onClick={this.toggleOrderForm} className="waves-effect waves-light btn-small">
          {this.state.newOrderForm ? "Cancel" : "Create New Order"}
        </a>
        <CreateNewOrder show={this.state.newOrderForm} toggleOrderForm={this.toggleOrderForm} />
      </div>
    );
  }
}

export default graphql(query)(OrderManagementPage);
