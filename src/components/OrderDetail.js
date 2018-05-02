import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';

import OrderItemsList from './OrderItemsList';
import AddAdditionalItems from './AddAdditionalItems';

import getAllOrdersQuery from '../queries/GetAllOrders';
import { query, options } from '../queries/GetOrderDetail';
import placeOrderMutation from '../mutations/PlaceOrder';
import deleteOrderMutation from '../mutations/DeleteOrder';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAvailableItems: false
    }
    this.toggleAvailableItems = this.toggleAvailableItems.bind(this);
  }

  toggleAvailableItems() {
    this.setState((prevState) => {
      return {
        showAvailableItems: !prevState.showAvailableItems
      }
    })
  }

  placeOrder() {
    if (this.props.data.order.items.length === 0) {
      console.log("cannot place empty order");
      return;
    }
    this.props.placeOrder({
      variables: {
        orderid: this.props.data.order.id
      },
      refetchQueries: [{
        query: getAllOrdersQuery
      }]
    })
    .then((res) => {
      const order = res.data.placeOrder;
      console.log("The following order has been dispatched!\n" + `order ID: ${order.id} | Customer: ${order.customername} | total: ${order.total}`);
      this.props.hideOrderDetail();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  deleteOrder() {
    this.props.deleteOrder({
      variables: {
        orderid: this.props.data.order.id
      },
      refetchQueries: [{
        query: getAllOrdersQuery
      }]
    })
    .then((res) => {
      console.log("The following order has been deleted!\n" + `order ID: ${res.data.deleteOrder.id}`);
      this.props.hideOrderDetail();
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    if (this.props.data.loading || !this.props.data.order) {
      return <div>Loading order detail</div>
    }
    const { id, total, items, customerid, customername } = this.props.data.order
    return (
      <div className="card">
        <div className="card-stacked">
          <div className="card-content">
            <h4> Order ID: {id} </h4>
            <h5> Customer ID: {customerid} | Customer Name: {customername} </h5>
            <OrderItemsList items={items} orderid={id} />
            <div>
              <a className="waves-effect waves-light btn-small" onClick={this.toggleAvailableItems}>
                {this.state.toggleAvailableItems ? "Cancel" : "Add new item"}
              </a>
              <AddAdditionalItems
                show={this.state.showAvailableItems}
                orderid={id}
                total={total}
                items={items}
                toggleAvailableItems={this.toggleAvailableItems} />
            </div>
            <h5> Total: ${total} </h5>
          </div>
          <div className="card-action">
            <a onClick={this.props.hideOrderDetail}>BACK</a>
            <a id={id} onClick={this.placeOrder.bind(this)}>PLACE ORDER</a>
            <a id={id} onClick={this.deleteOrder.bind(this)}>DELETE ORDER</a>
          </div>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(placeOrderMutation, {
    name: 'placeOrder'
  }),
  graphql(deleteOrderMutation, {
    name: 'deleteOrder'
  }),
  graphql(query, options))
  (OrderDetail);
