import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ItemList from './ItemList';

class OrderDetail extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading order detail</div>
    }
    const { id, total, items, customerid } = this.props.data.order
    return (
      <div className="card large">
        <div className="card-stacked">
          <div className="card-content">
            <h4> Order ID: {id} </h4>
            <h5> Customer ID: {customerid} </h5>
              <ItemList items={items} />
            <h5> Total: ${total} </h5>
          </div>
          <div className="card-action">
            <a onClick={this.props.hideOrderDetail}>BACK</a>
            <a id={id} onClick={this.props.placeOrder}>PLACE ORDER</a>
          </div>
        </div>
      </div>
    )
  }
}


const query = gql`
  query order($id: String!) {
    order(id: $id) {
      id,
      customerid,
      items {
        productid
        description,
        quantity,
        unitprice,
        total
      }
      total
    }
  }
`
export default graphql(query, {
  options: (ownProps) => {
    return ({
      variables: {
        id: ownProps.id
      }
    })
  }
})(OrderDetail);
