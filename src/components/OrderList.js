import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import IndividualOrderListing from "./IndividualOrderListing";

import query from '../queries/GetAllOrders';

class OrderList extends Component {
  constructor(props) {
    super(props);
    this.renderAllOrders = this.renderAllOrders.bind(this);
  }

  renderAllOrders() {
    return this.props.data.orders.map(order => {
      return (
        <Link key={order.id} to={"/order/" + order.id}>
          <IndividualOrderListing order={order} />
        </Link>
      )
    })
  }

  render() {
    if (this.props.data.loading) {
      return (<div>Orders loading...</div>)
    }
    return (
      <div>
        <ul className="collection with-header">
          <li className="collection-header"><h4>Orders</h4></li>
          {this.renderAllOrders()}
        </ul>
        <Link to="/createNew" className="waves-effect waves-light btn-large teal darken-4">
          {"Create New Order"}
        </Link>
      </div>
    )
  }
}

export default graphql(query)(OrderList);
