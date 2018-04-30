import React, { Component } from 'react';

import OrderDetail from './OrderDetail';

class IndividualOrder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, customerid, total } = this.props.order;
    return (
      <li key={id} id={id} className="waves-effect waves-light btn"
        onClick={this.props.showOrderDetail}
      >
        Order ID: {id} | Customer ID: {customerid} | Total: ${total}
      </li>
    )
  }
}

export default IndividualOrder;
