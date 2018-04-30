import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import ItemList from './ItemList';
import AddNewItem from './AddNewItem'

import getAllOrdersQuery from '../queries/GetAllOrders';
import { query, options } from '../queries/GetOrderDetail';
import mutation from '../mutations/PlaceOrder';

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
    this.props.mutate({
      variables: {
        orderid: this.props.data.order.id
      },
      refetchQueries: [{
        query: getAllOrdersQuery
      }]
    })
    .then((res) => {
      console.log(res);
      this.props.hideOrderDetail();
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
            <ItemList items={items} orderid={id} />
            <div>
              <a className="waves-effect waves-light btn-small" onClick={this.toggleAvailableItems}>
                {this.state.toggleAvailableItems ? "Cancel" : "Add new item"}
              </a>
              <AddNewItem
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
          </div>
        </div>
      </div>
    )
  }
}

export default graphql(mutation)(graphql(query, options)(OrderDetail));
