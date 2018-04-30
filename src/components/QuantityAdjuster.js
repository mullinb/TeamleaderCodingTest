import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import mutation from '../mutations/UpdateItemQuantity';
import { query, options } from '../queries/GetOrderDetail';

class QuantityAdjuster extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newQuantity: ''
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.item) {
      return {
        newQuantity: nextProps.item.quantity
      }
    } else {
      return prevState
    }
  }

  renderDropdown() {
    var options = new Array(100);
    for (var i=0; i<options.length; i++) {
      options[i] = <option key={i+1} value={i+1}>{i+1}</option>
    }
    return(
      <form onSubmit={this.adjustQuantity.bind(this)}>
        <label>Select New Quantity
          <select
            style={{display: "block", width: "40%"}}
            value={this.state.newQuantity}
            onChange={this.handleChange.bind(this)} >
            {options.map(option => option)}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }

  handleChange(e) {
    this.setState({
      newQuantity: e.target.value
    })
  }

  adjustQuantity(e) {
    e.preventDefault();
    this.props.mutate({
      variables: {
        orderid: this.props.orderid,
        itemid: this.props.item.productid,
        quantity: this.state.newQuantity
      },
      options: {
        refetchQueries: [{
          query,
          variables: {
            id: this.props.orderid
          }
        }]
      }
    })
    .then((res) => {
      this.props.hideQuantityAdjuster();
    })
  }

  render () {
    if (this.props.currentItem !== this.props.item.productid) {
      return null;
    }
    return (this.renderDropdown())
  }
}

export default graphql(mutation)(QuantityAdjuster);
