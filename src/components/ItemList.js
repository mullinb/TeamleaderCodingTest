import React, { Component } from 'react';

class ItemList extends Component {
  constructor(props) {
    super(props);
  }

  editQuantity() {

  }

  removeItem() {

  }

  renderItems () {
    if (this.props.items) {
      return this.props.items.map((item) => {
        console.log(this.props.items);
        return(
          <li className="collection-item" key={item.productid}>
            <div>Item: {item.description} <a className="waves-effect waves-light btn-small">Remove item</a></div> 
            <div>Quantity: {item.quantity} <a className="waves-effect waves-light btn-small">Change quantity</a></div>
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
        <div> Add new item </div>
      </div>
    )
  }
}

export default ItemList;
