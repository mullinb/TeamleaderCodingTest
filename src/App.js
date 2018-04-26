import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import OrderList from "./components/OrderList";

const client = new ApolloClient({
  
})


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <OrderList />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
