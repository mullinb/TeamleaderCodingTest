import React, { Component } from 'react';

import OrderDetail from './OrderDetail'

class IndividualOrder extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, customerid, total } = this.props.order;
    return (
      <li key={id} name={id} className="waves-effect waves-light btn"
        onClick={(e) => {
          this.props.showOrderDetail(e);
        }
      }>
        Order ID: {id} | Customer ID: {customerid} | Total: ${total}
      </li>
    )
  }
}

export default IndividualOrder;
