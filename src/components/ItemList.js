import React, { Component } from 'react';

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItemToAdjustQuantity: ''
    }
  }

  editThisQuantity(e) {
    this.setState({
      currentItemToAdjustQuantity: e.target.getAttribute('id')
    })
  }

  removeItem() {

  }

  renderItems () {
    if (this.props.items) {
      return this.props.items.map((item) => {
        return(
          <li className="collection-item" key={item.productid}>
            <div>Item: {item.description} <a className="waves-effect waves-light btn-small" onClick={this.removeItem.bind(this)}>Remove item</a></div>
            <div>Quantity: {item.quantity} <a id={item.productid} className="waves-effect waves-light btn-small">Change quantity</a></div>
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

export default ItemList;
