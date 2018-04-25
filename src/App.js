import React, { Component } from 'react';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import OrderList from "./components/OrderList";

// const client = new ApolloClient({
//   dataIdFromObject: o => o.id
// })


class App extends Component {
  render() {
    return (
      <div className="App">
        "HEHEHE"
        <OrderList />
      </div>
    );
  }
}

export default App;
