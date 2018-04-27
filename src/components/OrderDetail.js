import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import ItemList from './ItemList';
import AddNewItem from './AddNewItem'

import { query, options } from '../queries/GetOrderDetail'

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAvailableItems: false
    }
  }

  showAvailableItems() {
    this.setState((prevState) => {
      return {
        showAvailableItems: !prevState.showAvailableItems
      }
    })
    console.log(this.state)
  }

  hideAvailableItems() {
    // this.setState({
    //   showAvailableItems: false
    // })
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading order detail</div>
    }
    const { id, total, items, customerid } = this.props.data.order
    return (
      <div className="card">
        <div className="card-stacked">
          <div className="card-content">
            <h4> Order ID: {id} </h4>
            <h5> Customer ID: {customerid} </h5>
              <ItemList items={items} />
              <div>
                <a className="waves-effect waves-light btn-small" onClick={this.showAvailableItems.bind(this)}>{this.state.showAvailableItems ? "Cancel" : "Add new item"}</a>
                <AddNewItem show={this.state.showAvailableItems} items={items} hideAvailableItems={this.hideAvailableItems.bind(this)} />
              </div>
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

export default graphql(query, options)(OrderDetail);
