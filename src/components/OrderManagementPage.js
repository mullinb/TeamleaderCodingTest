import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Route } from 'react-router-dom';

import OrderList from './OrderList';
import OrderDetail from './OrderDetail';
import CreateNewOrder from './CreateNewOrder';
import ErrorHandler from './ErrorHandler';

class OrderManagementPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Route exact path="/" component={OrderList} />
        <Route path="/order/:id" component={OrderDetail} />
        <Route path="/createNew" component={CreateNewOrder} />
        <ErrorHandler />
      </div>
    )
  }
}

export default OrderManagementPage;
