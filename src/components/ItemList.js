import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import QuantityAdjuster from './QuantityAdjuster';

import mutation from '../mutations/RemoveItem';
import { query, options } from '../queries/GetOrderDetail'


class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemToAdjustQuantity: ''
    }
    this.showQuantityAdjuster = this.showQuantityAdjuster.bind(this);
  }

  showQuantityAdjuster(e) {
    if (e.target.getAttribute('id') === this.state.currentItemToAdjustQuantity) {
      this.setState({
        currentItemToAdjustQuantity: ''
      })
    } else {
      this.setState({
        currentItemToAdjustQuantity: e.target.getAttribute('id')
      })
    }
  }

  hideQuantityAdjuster() {
    this.setState({
      currentItemToAdjustQuantity: ''
    })
  }

  removeItem(e) {
    this.props.mutate({
      variables: {
        orderid: this.props.orderid,
        itemid: e.target.getAttribute('id')
      },
      refetchQueries: [{
        query,
        variables: {
          id: this.props.orderid
        }
      }]
    })
    .catch((err) => {
      console.log(err);
    })
  }

  renderItems () {
    if (this.props.items) {
      return this.props.items.map((item) => {
        return(
          <li className="collection-item" key={item.productid}>
            <div>Item: {item.description} <a id={item.productid} className="waves-effect waves-light btn-small" onClick={this.removeItem.bind(this)}>Remove item</a></div>
            <div>Quantity: {item.quantity} <a id={item.productid} onClick={this.showQuantityAdjuster} className="waves-effect waves-light btn-small">
              {this.state.currentItemToAdjustQuantity === item.productid ? "Cancel" : "Change quantity"}
            </a>
              <QuantityAdjuster currentItem={this.state.currentItemToAdjustQuantity} hideQuantityAdjuster={this.hideQuantityAdjuster.bind(this)} orderid={this.props.orderid} item={item}/>
            </div>
            <div>Unit price: {item.unitprice}</div>
            <div>Subtotal: {item.total}</div>
          </li>
        )
      })
    }
  }

  render() {
    return(
      <div>
        <ul className="collection with-header">
          {this.renderItems()}
        </ul>
      </div>
    )
  }
}

export default graphql(mutation)(ItemList);
