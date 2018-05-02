import React, { Component } from 'react';


class AvailableItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemsList: [{}]
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.products) {
      var nextItemsList = {};
      nextProps.products.forEach((p) => {
        if (_.find(nextProps.items, { productid: p.id })) {
          return;
        }
        nextItemsList[p.id] = { id: p.id, quantity: 0 };
      })
      return {
        itemsList: nextItemsList
      }
    } else return prevState;
  }

  renderAvailableItems() {
    return this.props.products.map(({ id, description, category, price }) => {
      if (_.find(this.props.items, { productid: id })) {
        return null;
      }
      return (
        <div key={id}>{id} {description} | Category: {category} | Price: ${price}
          <input name={id} type="number" min="0" value={this.props.shoppingCart[id] ? this.props.shoppingCart[id].quantity : 0} placeholder="Enter Quantity" onChange={this.updateQuantity.bind(this)} />
        </div>
      )
    })
  }

  updateQuantity(e) {
    this.props.updateQuantity(e);
  }

  render() {
    return (
      <div>
        {this.renderAvailableItems()}
      </div>
    )
  }
}

export default AvailableItemsList;
